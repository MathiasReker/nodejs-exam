import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import auth from "./routes/auth.js";
import grapes from "./routes/grapes.js";
import verifyToken from "./routes/validate-token.js";
import settings from "./routes/settings.js";
import profile from "./routes/profile.js";
import wineGlasses from "./routes/wineGlasses.js";
import connection from "./util/connection.js";

connection();

const app = express();
dotenv.config();
app.use(cors({
    origin: process.env.ENV === "prod" ? process.env.FRONT_END_DOMAIN : true,
    credentials: true
}));
app.use(helmet());
app.use(express.json()); // for body parser

app.use("/api/auth", auth);
app.use("/api/profile", verifyToken, profile);
app.use("/api/settings", verifyToken, settings);
app.use("/api/grapes", verifyToken, grapes);
app.use("/api/wineGlasses", verifyToken, wineGlasses);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server is running on port:", PORT));
