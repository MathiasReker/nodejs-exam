import { Router } from 'express';
import WineGlass from '../model/WineGlass.js';

const router = Router();

router.get('/', async (req, res) => {
  const wineGlasses = await WineGlass.find().exec();

  res.json({ data: wineGlasses });
});

router.get('/:grape', async (req, res) => {
  const { grape } = req.params;

  if (grape) {
    const wineGlass = await WineGlass.findOne({ grapes: grape }).exec();

    res.json({
      data: {
        series: wineGlass.series,
        name: wineGlass.name,
        grapes: wineGlass.grapes,
        image: `${process.env.BASE_URL}${wineGlass.image}`,
      },
    });
  }
});

export default router;
