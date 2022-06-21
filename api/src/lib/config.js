import dotenv from 'dotenv';

dotenv.config();

const config = {
  API_KEY: process.env.API_KEY,
  API_PORT: process.env.API_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT,
  NODE_ENV: process.env.NODE_ENV,
};

export default config;
