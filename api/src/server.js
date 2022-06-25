/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import express, { urlencoded, json } from 'express';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import setHeaders from './middlewares/setHeaders.js';
import errorMiddleware from './middlewares/error.middleware.js';

const server = express();

server.use(urlencoded({ extended: true, limit: '50mb' }));
server.use(json({ limit: '50mb' }));
server.use(cookieParser());
server.use(setHeaders);

server.use('/', routes);
server.use(errorMiddleware);

export default server;
