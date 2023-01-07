import { body } from 'express-validator';

export const signupRules = [
  body('email').isEmail(),
  body('name').isLength({ min: 4, max: 255 }).exists(),
  body('password').isLength({ min: 8, max: 255 }).exists(),
];

export const signInRules = [
  body('email').isEmail(),
  body('password').isLength({ min: 8, max: 255 }).exists(),
];

export const recoverRules = [
  body('email').isEmail(),
];

export const resetRules = [
  body('email').isEmail(),
];
