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

dotenv.config();

connection();

const app = express();

app.use(cors({
  origin: process.env.ENV === 'prod' ? process.env.FRONT_END_DOMAIN : true,
  credentials: true,
}));
app.use(helmet());
app.use(express.json()); // for body parser

app.use('/api/auth', auth);
app.use('/api/mail', mail);
app.use('/api/settings', settings);
app.use('/api/grapes', verifyToken, grapes);
app.use('/api/wineGlasses', verifyToken, wineGlasses);
app.use('/api/users', verifyToken, users);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server is running on port:', PORT));
