import { Router } from 'express';
import WineGlass from '../model/WineGlass.js';

const router = Router();

router.get('/', (req, res) => {
  WineGlass.find()
    .exec()
    .then((wineGlass) => {
      res.send({ data: wineGlass }); // TODO
    });
});

router.get('/:grape', (req, res) => {
  const { grape } = req.params;

  if (grape) {
    WineGlass.findOne({ grapes: grape })
      .exec()
      .then((wineGlass) => {
        res.send({
          message: 'Success',
          data: {
            series: wineGlass.series,
            name: wineGlass.name,
            grapes: wineGlass.grapes,
            image: `${process.env.BASE_URL}${wineGlass.image}`,
          },
        });
      });
  }
});

export default router;
