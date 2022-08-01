/* eslint-disable max-len */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import { Sequelize } from 'sequelize';

import { envConfig } from '../config/env.js';

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = envConfig;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false,
    native: false,
  },
);

export default sequelize;
