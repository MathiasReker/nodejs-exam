import {Router} from "express";
import User from "../model/User.js";

const router = Router();
router.put("/glasses", async (req, res) => {
    const email = req.body.email
    const glasses = req.body.myCollection

    const doc = await User.findOneAndUpdate(
        {email: email},
        {myCollection: glasses},
        {new: true}
    );

    res.send(doc)
});

export default router;
