import config from '../lib/config.js';

const { API_KEY } = config;

export const API_URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

