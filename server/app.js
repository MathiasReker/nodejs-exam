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
import mail from './routes/mail.js';
import users from './routes/users.js';
import messages from './routes/messages.js';
import images from './routes/images.js';
import { notFound, handler } from './middleware/error.js';

dotenv.config();

connection();

const app = express();

const corsOptions = {
  origin: process.env.NODE_ENV !== 'dev' ? process.env.CORS_ALLOWED_ORIGIN : true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
};

const server = http.createServer(app);

const ioCorsOptions = {
  cors: {
    origin: process.env.NODE_ENV !== 'dev' ? process.env.CORS_ALLOWED_ORIGIN : true,
    credentials: true,
    methods: ['GET', 'POST'],
  },
};

const io = new Server(server, ioCorsOptions);

app.use((req, res, next) => {
  req.io = io;
  return next();
});

const ddosConfig = {
  burst: process.env.DDOS_BRUST,
  limit: process.env.DDOS_LIMIT,
};

const ddos = new Ddos(ddosConfig);
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
