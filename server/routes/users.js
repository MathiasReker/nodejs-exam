import { Router } from 'express';
import User from '../model/User.js';

const router = Router();

router.get('/:id/statistics/lookups', (req, res) => {
  const { id } = req.params;

  User.findOne({ uuid: id })
    .exec()
    .then((user) => {
      const { lookups } = user.statistics;

      res.send({ data: { lookups } });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  User.findOneAndUpdate(
    { uuid: id },
    { name },
    { new: true },
  )
    .exec()
    .then((user) => {
      res.send({ data: { name: user.name } });
    });
});

router.put('/:id/wine-glasses', (req, res) => {
  const { id } = req.params;
  const { wineGlasses } = req.body;

  User.findOneAndUpdate(
    { uuid: id},
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
  const { id } = req.params;
  const { lookups } = req.body;

  if (lookups) {
    User.findOneAndUpdate(
      { uuid: id },
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
  const { id } = req.params;
  const { language } = req.body;

  // TODO validate!
  User.findOneAndUpdate(
    { uuid: id },
    { 'settings.language': language },
    { new: true },
  )
    .exec()
    .then((user) => {
      // eslint-disable-next-line no-shadow
      const { language } = user.settings;

      res.send({ data: { language } });
    });
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
