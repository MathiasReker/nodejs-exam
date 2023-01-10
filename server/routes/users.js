import { Router } from 'express';
import User from '../model/User.js';
import validate from '../middleware/validate.js';
import {
  userRules,
  userSettingsLanguageRules,
  userStatisticsLookupsRules,
  wineGlassRules,
} from './validations/users.js';

const router = Router();

router.get('/:id/statistics/lookups', async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ uuid: id }).exec();

  const { lookups } = user.statistics;
  res.send({ data: { lookups } });
});

router.put('/:id', validate(userRules), async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  // TODO ... user endpoint and only possible to update name??
  // TODO parse whole user object?
  const user = await User.findOneAndUpdate(
    { uuid: id },
    { name },
    { new: true },
  ).exec();

  res.send({ data: { name: user.name } });
});

router.put('/:id/wine-glasses', validate(wineGlassRules), async (req, res) => {
  const { id } = req.params;
  const { wineGlasses } = req.body;

  const user = await User.findOneAndUpdate(
    { uuid: id },
    { 'settings.wineGlasses': wineGlasses },
    { new: true },
  ).exec();

  res.send({ data: { wineGlasses: user.settings.wineGlasses } });
});

router.put('/:id/statistics/lookups', validate(userStatisticsLookupsRules), async (req, res) => {
  const { id } = req.params;
  const { lookups } = req.body;

  if (lookups) {
    const user = await User.findOneAndUpdate(
      { uuid: id },
      { $inc: { 'statistics.lookups': 1 } },
      { new: true },
    ).exec();

    res.send({ data: { lookups: user.statistics.lookups } });
  }
});

router.put('/:id/settings/language', validate(userSettingsLanguageRules), async (req, res) => {
  const { id } = req.params;
  const { language } = req.body;

  const user = await User.findOneAndUpdate(
    { uuid: id },
    { 'settings.language': language },
    { new: true },
  ).exec();

  res.send({ data: { language: user.settings.language } });
});

router.delete('/:id/statistics/lookups', validate(userStatisticsLookupsRules), async (req, res) => {
  const uuid = req.params.id;
  const { lookups } = req.body;

  if (lookups) {
    const user = await User.findOneAndUpdate(
      { uuid },
      { 'statistics.lookups': 0 },
      { new: true },
    ).exec();

    res.send({ data: { lookups: user.statistics.lookups } });
  }
});

export default router;
