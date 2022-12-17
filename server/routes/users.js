import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { createHash } from 'crypto';
import User from '../model/User.js';

// validation
import { sendMail } from '../util/sendMail.js';

const router = Router();

router.post('/:email/recover', async (req, res) => {
  const user = await User.findOne({ email: req.params.email });

  const token = createHash('sha256').update(user.password).digest('hex');

  const resetLink = `http://localhost:5173/reset-password?email=${user.email}&token=${token}`;

  const from = `"${process.env.EMAIL_NAME}" <${process.env.EMAIL_ACCOUNT}>`;
  // TODO send mail
  sendMail(from, user.email, 'Reset password', resetLink)
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

  console.log('PASS', password);

  const doc = await User.findOneAndUpdate(
    { email: user.email },
    { password },
    { new: true },
  );

  res.send({ data: doc });
});

router.put('/:email/wineGlasses', async (req, res) => {
  const { email } = req.params;
  const glasses = req.body.myCollection;

  const doc = await User.findOneAndUpdate(
    { email },
    { 'settings.myCollection': glasses },
    { new: true },
  );

  res.send(doc);
});

router.put('/:email/statistics', async (req, res) => {
  const { email } = req.params;

  const result = await User.findOneAndUpdate(
    { email },
    { $inc: { 'statistics.lookups': 1 } },
    { new: true },
  );

  res.send(result);
});

router.get('/:email/statistics', async (req, res) => {
  const { email } = req.params;

  const user = await User.findOne({ email });

  const { lookups } = user.statistics;
  console.log(user);
  res.send({
    data: {
      lookups,
    },
  });
});

export default router;
