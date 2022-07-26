/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import v1Routes from './v1/routes/index.js';
import errorMiddleware from './v1/middlewares/error.middleware.js';
import { corsOptions } from './config/index.js';

const server = express();

server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(helmet({ hidePoweredBy: true }));
server.use(cors(corsOptions));

server.use('/api/v1', v1Routes);
server.use(errorMiddleware);

export default server;
