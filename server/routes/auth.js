import {Router} from "express";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../model/User.js";

// validation
import {loginValidation, registerValidation} from "../validation.js";

const router = Router();

// register route
// TODO: signup
router.post("/register", async (req, res) => {
    // validate the user
    const {error} = registerValidation(req.body);

    // throw validation errors
    if (error) {
        // TODO validate front and back username password, email..
        return res.status(400).json({error: error.details[0].message});
    }

    const isEmailExist = await User.findOne({email: req.body.email});
    // throw error when email already registered
    if (isEmailExist) {
        return res.status(400).json({error: "Email already exists"});
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password,
    });
    try {
        const savedUser = await user.save();
        res.json({error: null, data: {userId: savedUser._id}});
    } catch (error) {
        res.status(400).json({error});
    }
});
// TODO : signin
// login route
router.post("/login", async (req, res) => {
    // validate the user
    const {error} = loginValidation(req.body);

    // throw validation errors
    if (error) {
        return res.status(400).json({
            error: error.details[0].message
        });
    }

    const user = await User.findOne({
        email: req.body.email
    });

    const loginError = "A user with this combination of credentials was not found.";
    // throw error when email is wrong
    if (!user) {
        return res.status(400).json({
            error: loginError
        });
    }

    // check for password correctness
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).json({
            error: loginError
        });
    }

    // create token
    const token = jwt.sign(
        {
            name: user.name,
            id: user._id,
        },
        process.env.TOKEN_SECRET
    );

    res.header("auth-token", token).json({
        data: {
            user: {
                name: user.name,
                email: user.email,
                token: token,
                myCollection: user.myCollection
            }
        }
    });
})

export default router;
