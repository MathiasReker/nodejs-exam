import { Router } from 'express';
import WineGlass from '../model/WineGlass.js';

const router = Router();

router.get('/', async (req, res) => {
  const wineGlasses = await WineGlass.find().exec();
  const grapes = [];

  wineGlasses.forEach((wineGlass) => {
    grapes.push(...wineGlass.grapes);
  });

  res.send({ data: { grapes } });
});

export default router;
