'use strict';

import { Router } from 'express';
import { createHash } from 'crypto';
import bcrypt from 'bcryptjs';
import User from '../model/User.js';

const router = Router();

router.post('/recover', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  const token = createHash('sha256').update(user.password).digest('hex');

  const resetLink = `http://localhost:5173/reset?email=${user.email}&token=${token}`;

  // TODO send mail

  res.send({
    data: {
      resetLink,
    },
  });
});

router.post('/reset', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  const token = createHash('sha256').update(user.password).digest('hex');

  if (req.body.token !== token) {
    res.send({
      error: 'Wrong token',
    });
  }

  const salt = bcrypt.genSalt(10);
  const password = bcrypt.hash(req.body.password, salt);

  const doc = User.findOneAndUpdate(
    { email: user.email },
    { password },
    { new: true },
  );

  res.send(doc);
});

export default router;
