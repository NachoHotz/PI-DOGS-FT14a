import { envConfig } from '../../config/index.js';

const { API_KEY } = envConfig;

export const API_URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;
