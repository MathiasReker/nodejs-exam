import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import helmet from "helmet";
import auth from "./routes/auth.js";
import grapes from "./routes/grapes.js";
import verifyToken from "./routes/validate-token.js";
import settings from "./routes/settings.js";
import profile from "./routes/profile.js";
import wineGlasses from "./routes/wineGlasses.js";

const app = express();
dotenv.config();

mongoose.connect(
    process.env.DB_CONNECT,
    {
        autoIndex: false, // Don't build indexes
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4 // Use IPv4, skip trying IPv6
    },
    () => console.log("Connected to db")
);

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
