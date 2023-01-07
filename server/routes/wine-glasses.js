import { Router } from 'express';
import WineGlass from '../model/WineGlass.js';

const router = Router();

router.get('/', (req, res) => {
  WineGlass.find()
    .exec()
    .then((wineGlass) => {
      res.send({ data: wineGlass });
    });
});

router.get('/:grape', (req, res) => {
  const { grape } = req.params;

  if (grape) {
    WineGlass.find({ grapes: grape })
      .exec()
      .then((wineGlass) => {
        res.send({ data: wineGlass });
      });
  }
});

export default router;
