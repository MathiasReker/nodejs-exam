import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import http from 'http';
import {Server} from 'socket.io';
import connection from './util/connection.js';
import verifyToken from './routes/validate-token.js';
import auth from './routes/auth.js';
import grapes from './routes/grapes.js';
import settings from './routes/settings.js';
import wineGlasses from './routes/wineGlasses.js';
import mail from './routes/mail.js';
import users from './routes/users.js';
import messages from './routes/messages.js';

dotenv.config();

connection();

const app = express();

app.use(cors({
    origin: process.env.ENV === 'prod' ? process.env.FRONT_END_DOMAIN : true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
}));

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.ENV === 'prod' ? process.env.FRONT_END_DOMAIN : true,
        credentials: true,
        methods: ['GET', 'POST'],
    },
});

app.use((req, res, next) => {
    req.io = io;
    return next();
});

app.use('/api/static', express.static('public'))
app.use(helmet());
app.use(express.json()); // for body parser
app.use('/api/auth', auth);
app.use('/api/mail', mail);
app.use('/api/messages', verifyToken, messages);
app.use('/api/settings', verifyToken, settings);
app.use('/api/grapes', verifyToken, grapes);
app.use('/api/wineGlasses', verifyToken, wineGlasses);
app.use('/api/users', verifyToken, users);
server.listen(process.env.PORT);
