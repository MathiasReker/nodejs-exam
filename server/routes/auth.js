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
    res.status(400).json({ errors: ['Email already exists'] });
    return;
  }

  // hash the password
  const salt = await bcrypt.genSalt(+process.env.BCRYPT_SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.json({ data: { userId: savedUser.uuid } });
  } catch (err) {
    res.status(400).json({ errors: [err] });
  }
});

router.post('/signin', validate(signInRules), async (req, res) => { // TODO: rename /login
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  });

  const signInError = 'A user with this combination of credentials was not found.';
  // throw exception when email is wrong
  if (!user) {
    res.status(400).json({
      errors: [signInError],
    });
    return;
  }

  // check for password correctness
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    res.status(400).json({
      errors: [signInError],
    });
    return;
  }

  // create token
  const token = jwt.sign(
    {
      id: user.uuid,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRATION_INTERVAL },
  );

  res.header('auth-token', token).json({
    data: {
      name: user.name,
      email: user.email,
      settings: {
        wineGlasses: user.settings.wineGlasses,
        language: user.settings.language,
      },
      uuid: user.uuid,
      token,
      createdAt: user._id.getTimestamp(),
    },
  });
});

router.post('/recover', validate(recoverRules), async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400).json({ errors: ['Email does not exists'] });
    return;
  }

  const token = createHash('sha256').update(user.password).digest('hex');

  const resetLink = `${process.env.CORS_ALLOWED_ORIGIN}/set-new-password?email=${user.email}&token=${token}`;

  const text = `You have just requested a password reset for the Wine Glass Guide account associated with this email address.\n\n
  Reset password using the following link: \n${resetLink}\n\nIf you continue to have issues signing in, please
contact support. Thank you for using Wine Glass Guide!`;

  const from = `"${process.env.DEFAULT_MAIL_SENDER}"`;

  try {
    // eslint-disable-next-line no-shadow
    const mail = await sendMail(from, user.email, 'Reset password', text);
    res.status(200).json({
      data: {
        message: 'Success',
        mail,
      },
    });
  } catch (err) {
    res.status(404).json({ errors: [err] });
  }
});

router.put('/reset', validate(resetRules), async (req, res) => {
  const { email, token, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400).json({ errors: ['Email does not exists'] });
    return;
  }

  const hashedToken = createHash('sha256').update(user.password).digest('hex');

  if (token !== hashedToken) {
    res.status(400).json({
      errors: ['The token is invalid'],
    });
    return;
  }

  const salt = await bcrypt.genSalt(+process.env.BCRYPT_SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);

  const result = await User.findOneAndUpdate(
    { email: user.email },
    { password: hashedPassword },
    { new: true },
  );

  res.json({ data: result });
});

export default router;
