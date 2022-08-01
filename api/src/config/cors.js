import dotenv from 'dotenv';
import { envConfig } from './env';

dotenv.config();

const { NODE_ENV } = envConfig;

export const corsOptions = {
  origin: `${
    NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://cors-anywhere.herokuapp.com'
  }`,
};
