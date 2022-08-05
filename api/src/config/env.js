import dotenv from 'dotenv';

dotenv.config();

export const envConfig = {
  API_KEY: process.env.API_KEY,
  API_PORT: process.env.API_PORT,
  CLIENT_DEV_URL: process.env.CLIENT_DEV_URL,
  CLIENT_PROD_URL: process.env.CLIENT_PROD_URL,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT,
  NODE_ENV: process.env.NODE_ENV,
};
