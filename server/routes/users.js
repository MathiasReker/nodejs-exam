import { Router } from 'express';
import User from '../model/User.js';
import validate from '../middleware/validate.js';
import {
  userRules,
  userSettingsLanguageRules,
  userStatistiscsLookupsRules,
  wineGlassRules,
} from './validations/users.js';

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

router.put('/:id', validate(userRules), (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  // TODO ... user endpoint and only possible to update name??
  // TODO parse whole user object?
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

router.put('/:id/wine-glasses', validate(wineGlassRules), (req, res) => {
  const { id } = req.params;
  const { wineGlasses } = req.body;

  User.findOneAndUpdate(
    { uuid: id },
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

router.put('/:id/statistics/lookups', validate(userStatistiscsLookupsRules), (req, res) => {
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

router.put('/:id/settings/language', validate(userSettingsLanguageRules), (req, res) => {
  const { id } = req.params;
  const { language } = req.body;

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

router.delete('/:id/statistics/lookups', validate(userStatistiscsLookupsRules), (req, res) => {
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
