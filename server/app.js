'use strict';

'strict mode';

import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import http from 'http';
import { Server } from 'socket.io';
import compression from 'compression';
import connection from './database/connection.js';
import verifyToken from './middleware/validate-token.js';
import auth from './routes/auth.js';
import grapes from './routes/grapes.js';
import wineGlasses from './routes/wine-glasses.js';
import mail from './routes/mail.js';
import users from './routes/users.js';
import messages from './routes/messages.js';
import pageNotFound from './middleware/page-not-found.js';
import images from './routes/images.js';
import {error} from "@hapi/joi/lib/annotate.js";

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

// app.use('/api/static', express.static('public'));
app.use(compression());
app.use(helmet());
app.use(express.urlencoded({ extended: true, limit: "1kb" })); // TODO do we need this?
app.use(express.json({ limit: "1kb" })); // for body parser
app.use('/api/auth', auth); // TODO add bruteforce protection
app.use('/api/mail', mail); // TODO add bruteforce protection
app.use('/api/images', images);
app.use('/api/messages', verifyToken, messages);
app.use('/api/grapes', verifyToken, grapes);
app.use('/api/wineGlasses', verifyToken, wineGlasses);
app.use('/api/users', verifyToken, users);
app.use(pageNotFound);
app.use(error)
server.listen(process.env.PORT);
