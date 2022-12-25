import { Router } from 'express';
import WineGlass from '../model/WineGlass.js';

const router = Router();

router.get('/', async (req, res) => {
  const param = req.query.grape;
  let wineGlass;

  if (param) {
    wineGlass = await WineGlass.find({ grapes: param }).exec();
  } else {
    wineGlass = await WineGlass.find().exec();
  }

  res.send({
    data: wineGlass,
  });
});

export default router;
