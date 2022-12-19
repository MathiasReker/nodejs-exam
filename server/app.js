import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import connection from './util/connection.js';
import verifyToken from './routes/validate-token.js';
import auth from './routes/auth.js';
import grapes from './routes/grapes.js';
import settings from './routes/settings.js';
import wineGlasses from './routes/wineGlasses.js';
import mail from './routes/mail.js';
import users from './routes/users.js';

import http from "http";
import {Server} from "socket.io";

dotenv.config();

connection();

const app = express();

app.use(cors({
    origin: process.env.ENV === 'prod' ? process.env.FRONT_END_DOMAIN : true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}));

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.ENV === 'prod' ? process.env.FRONT_END_DOMAIN : true,
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    socket.on("client choose a new color", (data) => {
        io.emit("foo", data);
    });
});

console.log(3)

app.use(helmet());
app.use(express.json()); // for body parser
app.use('/api/auth', auth);
app.use('/api/mail', mail);
app.use('/api/settings', settings);
app.use('/api/grapes', verifyToken, grapes);
app.use('/api/wineGlasses', verifyToken, wineGlasses);
app.use('/api/users', verifyToken, users);
server.listen(process.env.PORT);

