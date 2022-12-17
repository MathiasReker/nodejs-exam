import {Router} from 'express';
import WineGlass from '../model/WineGlass.js';

const router = Router();

router.get('/', async (req, res) => {
    let wineGlasses = await WineGlass.find().exec();

    let grapes = [];

    wineGlasses.forEach(wineGlass => {
        grapes.push(...wineGlass.grapes);
    })

    grapes.sort()

    res.send({
        data: {
            grapes
        },
    });
});

export default router;
