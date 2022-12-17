import {Router} from "express";
import bcrypt from "bcryptjs";
import User from "../model/User.js";

// validation
import {createHash} from "crypto";
import {sendMail} from "../util/sendMail.js";

const router = Router();

router.post("/recover", async (req, res) => {
    const user = await User.findOne({email: req.body.email});

    const token = createHash('sha256').update(user.password).digest('hex');

    const resetLink = `http://localhost:5173/reset-password?email=${user.email}&token=${token}`;

    const from = `"${process.env.EMAIL_NAME}" <${process.env.EMAIL_ACCOUNT}>`;
    // TODO send mail
    sendMail(from, user.email, "Reset password", resetLink)
        .then((mail) => {
            res.status(200).send({data: {mail}});

        })
        .catch((error) => {
            res.status(404).send({data: {error}});

        });

    //res.send({});
    /*
        res.send({
            data: {
                resetLink
            }
        })*/
});

// TODO put.
router.post("/reset", async (req, res) => {
    const user = await User.findOne({email: req.body.email});

    const token = createHash('sha256').update(user.password).digest('hex');

    if (req.body.token !== token) {
        res.status(400).send({
            error: "The token is invalid"
        })
        return;
    }

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    console.log("PASS", password)

    const doc = await User.findOneAndUpdate(
        {email: user.email},
        {password: password},
        {new: true}
    )

    res.send({"data": doc});
});



export default router;
