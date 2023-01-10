import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import http from 'http';
import { Server } from 'socket.io';
import compress from 'compression';
import Ddos from 'ddos';
import connection from './database/connection.js';
import verifyToken from './middleware/validate-token.js';
import auth from './routes/auth.js';
import grapes from './routes/grapes.js';
import wineGlasses from './routes/wine-glasses.js';
import mail from './routes/mails.js';
import users from './routes/users.js';
import messages from './routes/messages.js';
import images from './routes/images.js';
import { handler, notFound } from './middleware/error.js';
import { corsOptions, ioCorsOptions } from './config/cors-config.js';
import { ddosConfig } from './config/ddos-config.js';

dotenv.config();
connection();

const app = express();
const server = http.createServer(app);
const io = new Server(server, ioCorsOptions);
const ddos = new Ddos(ddosConfig);
app.use((req, res, next) => {
  req.io = io;
  return next();
});
app.use(ddos.express);
app.use(compress());
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true, limit: '1kb' }));
app.use(express.json({ limit: '1kb' })); // for body parser
app.use('/api/auth', auth);
app.use('/api/mail', mail);
app.use('/api/images', images);
app.use('/api/messages', verifyToken, messages);
app.use('/api/users', verifyToken, users);
app.use('/api/grapes', verifyToken, grapes);
app.use('/api/wineGlasses', verifyToken, wineGlasses);
app.use(notFound);
app.use(handler);
server.listen(process.env.PORT);
