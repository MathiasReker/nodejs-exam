import {Router} from "express";
import User from "../model/User.js";
import WineGlass from "../model/WineGlass.js";

const router = Router();

router.post("/", async (req, res) => {
    const email = req.body.email;
    const grape = req.body.grape;

    const user = await User.findOne({email});
    if (!user) {
        return;
    }

    const wineGlass = await WineGlass.find({grapes: grape}).exec();
    if (!wineGlass) {
        return;
    }

    const message = `<strong>${user.name}</strong> looked up the <strong>${grape}</strong> grape`;

    req.io.emit("foo", {data: message});

    res.send({});
})

export default router;