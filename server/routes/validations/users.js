import { body } from 'express-validator';

export const userRules = [
  body('name').isLength({ min: 4, max: 255 }).exists(),
];

export const wineGlassRules = [
  body('wineGlasses').isArray().exists(),
];

export const userStatisticsLookupsRules = [
  body('lookups').isBoolean().exists(),
];

export const userSettingsLanguageRules = [
  body('language').isLength({ min: 2, max: 2 }).exists(),
];
