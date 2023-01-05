import { Router } from 'express';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { createHash } from 'crypto';
import User from '../model/User.js';

// validation
import { signinValidation, signupValidation } from '../validation.js';
import sendMail from '../util/sendMail.js';

const router = Router();

// register route
// TODO: signup
router.post('/signup', async (req, res) => {
  // validate the user
  const { error } = signupValidation(req.body);

  // throw validation errors
  if (error) {
    // TODO validate front and back username password, email..
    return res.status(400).json({ error: error.details[0].message });
  }

  const isEmailExist = await User.findOne({ email: req.body.email });
  // throw error when email already registered
  if (isEmailExist) {
    return res.status(400).json({ error: 'Email already exists' });
  }

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password,
  });
  try {
    const savedUser = await user.save();
    res.json({ error: null, data: { userId: savedUser._id } });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post('/signin', async (req, res) => {
  // validate the user
  const { error } = signinValidation(req.body);

  // throw validation errors
  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
    });
  }

  const user = await User.findOne({
    email: req.body.email,
  });

  const signInError = 'A user with this combination of credentials was not found.';
  // throw error when email is wrong
  if (!user) {
    return res.status(400).json({
      error: signInError,
    });
  }

  // check for password correctness
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).json({
      error: signInError,
    });
  }

  // create token
  const token = jwt.sign(
    {
      name: user.name,
      id: user._id,
    },
    process.env.TOKEN_SECRET,
  );

  res.header('auth-token', token).json({
    data: {
      user: {
        name: user.name,
        email: user.email,
        settings: {
          wineGlasses: user.settings.wineGlasses,
          language: user.settings.language,
        },
        token,
      },
    },
  });
});

router.post('/:email/recover', async (req, res) => {
  const user = await User.findOne({ email: req.params.email });

  const token = createHash('sha256').update(user.password).digest('hex');

  const resetLink = `http://localhost:5173/set-new-password?email=${user.email}&token=${token}`;

  const email = `You have just requested a password reset for the Wine glasses guide account associated with this email address.\n\nReset password using the following link: \n${resetLink}`;

  const from = `"${process.env.EMAIL_NAME}" <${process.env.EMAIL_ACCOUNT}>`;

  sendMail(from, user.email, 'Reset password', email)
    .then((mail) => {
      res.status(200).send({ data: { mail } });
    })
    .catch((error) => {
      res.status(404).send({ data: { error } });
    });

  // res.send({});
  /*
            res.send({
                data: {
                    resetLink
                }
            }) */
});

// TODO put.
router.post('/:email/reset', async (req, res) => {
  const user = await User.findOne({ email: req.params.email });

  const token = createHash('sha256').update(user.password).digest('hex');

  if (req.body.token !== token) {
    res.status(400).send({
      error: 'The token is invalid',
    });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  const doc = await User.findOneAndUpdate(
    { email: user.email },
    { password },
    { new: true },
  );

  res.send({ data: doc });
});

export default router;
