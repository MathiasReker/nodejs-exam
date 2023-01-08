import dotenv from 'dotenv';

dotenv.config();

const defaultCors = {
  origin: process.env.NODE_ENV !== 'dev' ? process.env.CORS_ALLOWED_ORIGIN : true,
  credentials: true,
};

export const corsOptions = {
  ...defaultCors,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
};

export const ioCorsOptions = {
  cors: {
    ...defaultCors,
    methods: ['GET', 'POST'],
  },
};
