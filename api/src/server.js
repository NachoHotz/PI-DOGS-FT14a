/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes/index.js';
import errorMiddleware from './middlewares/error.middleware.js';
import { corsOptions } from './config/index.js';

const server = express();

server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(helmet({ hidePoweredBy: true }));
server.use(cors(corsOptions));

server.use('/', routes);
server.use(errorMiddleware);

export default server;
