/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const cookieParser = require('cookie-parser');
const routes = require('./routes/index');
const setHeaders = require('./middlewares/setHeaders');
const config = require('./lib/config');

require('./db/index');

const server = express();

server.name = 'API';

if (config.NODE_ENV === 'development') {
  const morgan = require('morgan');
  server.use(morgan('dev'));
}

server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));
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

module.exports = server;
