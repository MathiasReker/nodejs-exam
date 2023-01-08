import { Router } from 'express';
import sendMail from '../util/mail.js';
import validate from '../middleware/validate.js';
import { mailRules } from './validations/mails.js';

const router = Router();

router.post('/', validate(mailRules), async (req, res) => {
  const from = req.body.mail; // TODO `${req.body.name} <${req.body.mail}>`;

  const to = 'contact@demo.com'; // TODO ENV: ADMIN_MAIL

  const text = req.body.message;

  await sendMail(from, to, 'Question', text);

  res.send({
    message: 'Mail sent!',
  });
});

export default router;
