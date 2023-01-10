import { Router } from 'express';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { createHash } from 'crypto';
import User from '../model/User.js';
import {
  recoverRules, resetRules, signInRules, signupRules,
} from './validations/auth.js';
import validate from '../middleware/validate.js';
import sendMail from '../util/mail.js';

const router = Router();

router.post('/signup', validate(signupRules), async (req, res) => {
  // validate the user
  const { email, name, password } = req.body;

  const isEmailExist = await User.findOne({ email });
  if (isEmailExist) {
    res.status(400).json({ error: 'Email already exists' });
    return;
  }

  // hash the password
  const salt = await bcrypt.genSalt(10); // TODO env 12-14
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    // eslint-disable-next-line no-underscore-dangle
    res.json({ data: { userId: savedUser._id } });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.post('/signin', validate(signInRules), async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  });

  const signInError = 'A user with this combination of credentials was not found.';
  // throw exception when email is wrong
  if (!user) {
    res.status(400).json({
      error: signInError,
    });
    return;
  }

  // check for password correctness
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    res.status(400).json({
      error: signInError,
    });
    return;
  }

  // create token
  const token = jwt.sign(
    {
      name: user.name, // TODO remove?
      // eslint-disable-next-line no-underscore-dangle
      id: user._id,
    },
    process.env.JWT_SECRET_KEY,
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
        uuid: user.uuid,
        token, // TODO save in cookie
      },
    },
  });
});

router.post('/recover', validate(recoverRules), async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  const token = createHash('sha256').update(user.password).digest('hex');

  const resetLink = `http://localhost:5173/set-new-password?email=${user.email}&token=${token}`; // TODO

  const text = `You have just requested a password reset for the Wine Glass Guide account associated with this email address.\n\n
  Reset password using the following link: \n${resetLink}\n\nIf you continue to have issues signing in, please
contact support. Thank you for using Wine Glass Guide!`;

  const from = `"${process.env.DEFAULT_MAIL_SENDER}"`;

  try {
    // eslint-disable-next-line no-shadow
    const mail = await sendMail(from, user.email, 'Reset password', text);
    res.status(200).send({
      data: {
        message: 'Success',
        mail,
      },
    });
  } catch (err) {
    res.status(404).send({ data: { errors: [err] } });
  }
});

router.put('/reset', validate(resetRules), async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  const token = createHash('sha256').update(user.password).digest('hex');

  if (req.body.token !== token) {
    res.status(400).send({
      error: 'The token is invalid',
    });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  const result = await User.findOneAndUpdate(
    { email: user.email },
    { password },
    { new: true },
  );

  res.send({ data: result });
});

export default router;
