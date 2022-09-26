import { Sequelize } from 'sequelize';
import { envConfig } from '../config/env.js';

const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT,
} = envConfig;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false,
    native: false,
  },
);

export default sequelize;
