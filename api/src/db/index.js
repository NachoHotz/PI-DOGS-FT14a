/* eslint-disable max-len */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import { Sequelize } from 'sequelize';
import DogModel from './models/Dog.js';
import TemperamentModel from './models/Temperament.js';

import config from '../lib/config.js';

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = config;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  },
);

export { DogModel, TemperamentModel, sequelize }; // para importart la conexión { conn } = require('./db.js');
