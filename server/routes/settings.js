import { Router } from 'express';
import { Parser } from '@json2csv/plainjs';
import User from '../model/User.js';

const router = Router();

router.get('/csv', (req, res) => {
  const user = User.findOne({ user: req.params.email });

  const myData = { user: user.name, email: user.email, collection: user.collection };

  try {
    const parser = new Parser();
    const csv = parser.parse(myData);

    res.attachment('gdpr.csv');
    res.status(200).send(csv);
  } catch (err) {
    console.error(err);
  }
});

export default router;
