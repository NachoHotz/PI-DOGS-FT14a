import { envConfig } from './env.js';

const { NODE_ENV, CLIENT_DEV_URL, CLIENT_PROD_URL } = envConfig;

export const corsOptions = {
  origin: '*',
  allowedHeaders: ['Content-Type'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
};
