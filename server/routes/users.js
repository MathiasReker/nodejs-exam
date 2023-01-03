import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { createHash } from 'crypto';
import User from '../model/User.js';

// validation
import sendMail from '../util/sendMail.js';

const router = Router();

router.get('/:email/statistics', async (req, res) => {
  const { email } = req.params;

  const user = await User.findOne({ email });

  const { lookups } = user.statistics;

  res.send({
    data: {
      lookups,
    },
  });
});

router.delete('/:email/statistics', async (req, res) => {
  const { email } = req.params;

  const statistics = req.body;

  let result = {};

  if (statistics.lookup) {
    result = await User.findOneAndUpdate(
      { email },
      { 'statistics.lookups': 0 },
      { new: true },
    );
  }

  res.send({
    data: {
      lookups: result.statistics.lookups,
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

router.put('/:email/wineGlasses', async (req, res) => {
  const { email } = req.params;
  const glasses = req.body.wineGlasses;

  const doc = await User.findOneAndUpdate(
    { email },
    { 'settings.wineGlasses': glasses },
    { new: true },
  );

  res.send(doc);
});

router.put('/:email', async (req, res) => {
  const { email } = req.params;
  const { name } = req.body;
  console.log(name);
  const doc = await User.findOneAndUpdate(
    { email },
    { name },
    { new: true },
  );

  res.send({ data: { user: doc } });
});

router.put('/:email/statistics', async (req, res) => {
  const { email } = req.params;

  const statistics = req.body;

  let result = {};

  if (statistics.lookup) {
    result = await User.findOneAndUpdate(
      { email },
      { $inc: { 'statistics.lookups': 1 } },
      { new: true },
    );
  }

  res.send(result);
});

router.put('/:email/settings/language', async (req, res) => {
  const { email } = req.params;

  const settings = req.body;

  let result = {};
  // TODO validate!

  if (settings.language) {
    result = await User.findOneAndUpdate(
      { email },
      { 'settings.language': settings.language },
      { new: true },
    );
  }

  res.send(
    {
      data: {
        language: result.settings.language,
      },
    },
  );
});

export default router;
