import {Router} from "express";
import {sendMail} from "../util/sendMail.js";

const router = Router()

router.post("/", async (req, res) => {

    const from = req.body.mail;//`${req.body.name} <${req.body.mail}>`;

    const to = "contact@demo.com"; // TODO ENV

    const text = req.body.message;

    await sendMail(from, to, "Question", text);

    res.send({});
})

export default router;