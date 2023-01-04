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
