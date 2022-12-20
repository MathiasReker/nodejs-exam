import { Router } from 'express';
import User from "../model/User.js";
import WineGlass from "../model/WineGlass.js";

const router = Router();

router.post('/', async (req, res) => {

    req.io.on("connection", (socket) => {
        socket.on("client choose a new color", async (data) => {
            const email = data.data.email;
            const grape = data.data.grape;

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
        });
    });

});

export default router;