/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import express, { urlencoded, json } from 'express';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import setHeaders from './middlewares/setHeaders.js';
import config from './lib/config.js';

import './db/index.js';

const server = express();

const { NODE_ENV } = config;

server.name = 'API';

if (NODE_ENV === 'development') {
  const morgan = require('morgan');
  server.use(morgan('dev'));
}

server.use(urlencoded({ extended: true, limit: '50mb' }));
server.use(json({ limit: '50mb' }));
server.use(cookieParser());
server.use(setHeaders);

server.use('/', routes);

// Error catching endware.
server.use((err, _req, res, _next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

export default server;
