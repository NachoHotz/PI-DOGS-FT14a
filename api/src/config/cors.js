import { envConfig } from './env.js';

const { NODE_ENV, CLIENT_DEV_URL, CLIENT_PROD_URL } = envConfig;

console.log(envConfig)

export const corsOptions = {
  origin: NODE_ENV === 'development' ? CLIENT_DEV_URL : 'https://dogspedia.vercel.app/',
};
