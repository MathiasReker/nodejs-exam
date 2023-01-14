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

router.get('/me/statistics/lookups', async (req, res) => {
  const user = await User.findOne({ uuid: req.id }).exec();

  const { lookups } = user.statistics;
  res.json({ data: { lookups } });
});

router.put('/me', validate(userRules), async (req, res) => {
  const { name } = req.body;

  // TODO ... user endpoint and only possible to update name??
  // TODO parse whole user object?
  const user = await User.findOneAndUpdate(
    { uuid: req.id },
    { name },
    { new: true },
  ).exec();

  res.json({ data: { name: user.name } });
});

router.put('/me/wine-glasses', validate(wineGlassRules), async (req, res) => {
  const { wineGlasses } = req.body;

  const user = await User.findOneAndUpdate(
    { uuid: req.id },
    { 'settings.wineGlasses': wineGlasses },
    { new: true },
  ).exec();

  res.json({ data: { wineGlasses: user.settings.wineGlasses } });
});

router.put('/me/statistics/lookups', validate(userStatisticsLookupsRules), async (req, res) => {
  const { lookups } = req.body;

  if (lookups) {
    const user = await User.findOneAndUpdate(
      { uuid: req.id },
      { $inc: { 'statistics.lookups': 1 } },
      { new: true },
    ).exec();

    res.json({ data: { lookups: user.statistics.lookups } });
  }
});

router.put('/me/settings/language', validate(userSettingsLanguageRules), async (req, res) => {
  const { language } = req.body;

  const user = await User.findOneAndUpdate(
    { uuid: req.id },
    { 'settings.language': language },
    { new: true },
  ).exec();

  res.json({ data: { language: user.settings.language } });
});

router.delete('/me/statistics/lookups', validate(userStatisticsLookupsRules), async (req, res) => {
  const { lookups } = req.body;

  if (lookups) {
    const user = await User.findOneAndUpdate(
      { uuid: req.id },
      { 'statistics.lookups': 0 },
      { new: true },
    ).exec();

    res.json({ data: { lookups: user.statistics.lookups } });
  }
});

// TODO delete user
export default router;
