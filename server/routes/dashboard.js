import {Router} from "express";
import WineGlass from "../model/WineGlass.js";

const router = Router();

// dashboard route
router.get("/", (req, res) => {
    res.json({
        error: null,
        data: {
            title: "My dashboard",
            content: "dashboard content",
            user: req.user,
        },
    });
});

router.get("/wineGlasses", async (req, res) => {
    let param = req.query.grape;
    let wineGlass;

    if (param) {
        wineGlass = await WineGlass.find({grapes: param}).exec();
    } else {
        wineGlass = await WineGlass.find().exec();
    }

    res.send({
        data: wineGlass
    });
})

router.get("/grapes", async (req, res) => {
    let wineGlass = await WineGlass.find({grapes: param}).exec();

    res.send({
        data: wineGlass
    });
})

export default router;
