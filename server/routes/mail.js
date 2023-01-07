import { Router } from 'express';
import sendMail from '../util/mail.js';

const router = Router();

router.post('/', (req, res) => {
  const from = req.body.mail; // TODO `${req.body.name} <${req.body.mail}>`;

  const to = 'contact@demo.com'; // TODO ENV: ADMIN_MAIL

  const text = req.body.message;

  sendMail(from, to, 'Question', text).then(() => {
    res.send({
      message: 'Mail sent!',
    });
  });
});

export default router;
