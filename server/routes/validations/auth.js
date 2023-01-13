import { body } from 'express-validator';

export const signupRules = [
  body('email').isEmail().exists(),
  body('name').isLength({ min: 4, max: 255 }).exists(),
  body('password').isLength({ min: 8, max: 255 }).exists(),
];

export const loginRules = [
  body('email').isEmail().exists(),
  body('password').isLength({ min: 8, max: 255 }).exists(),
];

export const recoverRules = [
  body('email').isEmail().exists(),
];

export const resetRules = [
  body('email').isEmail().exists(),
  body('password').isLength({ min: 8, max: 255 }).exists(),
  body('token').isLength({ min: 59, max: 59 }).exists(),
];
