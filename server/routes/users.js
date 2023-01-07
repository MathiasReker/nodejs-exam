import { Router } from 'express';
import User from '../model/User.js';

const router = Router();

router.get('/:id/statistics/lookups', (req, res) => {
  const uuid = req.params.id;

  User.findOne({ uuid })
    .exec()
    .then((user) => {
      const { lookups } = user.statistics;

      res.send({ data: { lookups } });
    });
});

router.put('/:id', (req, res) => {
  const uuid = req.params.id;
  const { name } = req.body;

  User.findOneAndUpdate(
    { uuid },
    { name },
    { new: true },
  )
    .exec()
    .then((user) => {
      res.send({ data: { user } }); // TODO remove _id
    });
});

router.put('/:id/wineGlasses', (req, res) => {
  const uuid = req.params.id;
  const { wineGlasses } = req.body;

  User.findOneAndUpdate(
    { uuid },
    { 'settings.wineGlasses': wineGlasses },
    { new: true },
  )
    .exec()
    .then((user) => {
      // eslint-disable-next-line no-shadow
      const { wineGlasses } = user.settings;

      res.send({ data: { wineGlasses } });
    });
});

router.put('/:id/statistics/lookups', (req, res) => {
  const uuid = req.params.id;
  const { lookups } = req.body;

  if (lookups) {
    User.findOneAndUpdate(
      { uuid },
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

router.put('/:id/settings/language', (req, res) => {
  const uuid = req.params.id;
  const settings = req.body;

  // TODO validate!

  if (settings.language) {
    User.findOneAndUpdate(
      { uuid },
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

router.delete('/:id/statistics/lookups', (req, res) => {
  const uuid = req.params.id;

  const { lookups } = req.body;

  if (lookups) {
    User.findOneAndUpdate(
      { uuid },
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
