require('dotenv').config();

const config = {
  API_KEY = process.env.API_KEY,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT,
  API_PORT: process.env.API_PORT,
}

module.exports = config;
