import { Router } from 'express';
import WineGlass from '../model/WineGlass.js';

const router = Router();

router.get('/', (req, res) => {
  WineGlass.find().exec().then((wineGlasses) => {
    const grapes = [];

    wineGlasses.forEach((wineGlass) => {
      grapes.push(...wineGlass.grapes);
    });

    res.send({ data: { grapes } });
  });
});

export default router;
