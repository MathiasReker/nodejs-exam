import { Router } from 'express';
import User from '../model/User.js';

const router = Router();

router.get('/:email/statistics/lookups', (req, res) => {
  const { email } = req.params;

  User.findOne({ email })
    .exec()
    .then((user) => {
      const { lookups } = user.statistics;

      res.send({ data: { lookups } });
    });
});

router.put('/:email', (req, res) => {
  const { email } = req.params;
  const { name } = req.body;

  User.findOneAndUpdate(
    { email },
    { name },
    { new: true },
  )
    .exec()
    .then((user) => {
      res.send({ data: { user } }); // TODO remove _id
    });
});

router.put('/:email/wineGlasses', (req, res) => {
  const { email } = req.params;
  const glasses = req.body.wineGlasses;

  User.findOneAndUpdate(
    { email },
    { 'settings.wineGlasses': glasses },
    { new: true },
  )
    .exec()
    .then((user) => {
      const { wineGlasses } = user.settings;

      res.send({ data: { wineGlasses } });
    });
});

router.put('/:email/statistics/lookups', (req, res) => {
  const { email } = req.params;
  const { lookups } = req.body;

  if (lookups) {
    User.findOneAndUpdate(
      { email },
      { $inc: { 'statistics.lookups': 1 } },
      { new: true },
    )
      .exec()
      .then((user) => {
        // eslint-disable-next-line no-shadow
        const { lookups } = user.statistics;
        res.send({ data: { lookups } });
      });
  }
});

router.put('/:email/settings/language', (req, res) => {
  const { email } = req.params;
  const settings = req.body;

  // TODO validate!

  if (settings.language) {
    User.findOneAndUpdate(
      { email },
      { 'settings.language': settings.language },
      { new: true },
    )
      .exec()
      .then((user) => {
        const { language } = user.settings;

        res.send({ data: { language } });
      });
  }
});

router.delete('/:email/statistics/lookups', (req, res) => {
  const { email } = req.params;

  const { lookups } = req.body;

  if (lookups) {
    User.findOneAndUpdate(
      { email },
      { 'statistics.lookups': 0 },
      { new: true },
    )
      .exec()
      .then((user) => {
        // eslint-disable-next-line no-shadow
        const { lookups } = user.statistics;

        res.send({ data: { lookups } });
      });
  }
});

export default router;
