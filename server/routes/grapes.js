import {Router} from "express";
import WineGlass from "../model/WineGlass.js";

const router = Router();

router.get("/", async (req, res) => {
    const wineGlass = await WineGlass.find({grapes: param}).exec();

    res.send({
        data: wineGlass
    });
})

export default router;
