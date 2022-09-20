import { envConfig } from './env.js';

const { NODE_ENV, CLIENT_DEV_URL, CLIENT_PROD_URL } = envConfig;

export const corsOptions = {
  origin: `${NODE_ENV === 'development' ? CLIENT_DEV_URL : CLIENT_PROD_URL}`,
  allowedHeaders: ['Content-Type'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
};
