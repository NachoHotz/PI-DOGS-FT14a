import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import v1Routes from './v1/routes/index.routes.js';
import errorMiddleware from './v1/middlewares/error.middleware.js';
import NotFoundException from './v1/exceptions/NotFoundException.js';
import { corsOptions } from './config/index.js';

const server = express();

server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(helmet({ hidePoweredBy: true }));
server.use(cors(corsOptions));

server.use('/api/v1', v1Routes);
server.use('*', (_req, _res, next) => {
  return next(new NotFoundException('This route does not exist'));
});

server.use(errorMiddleware);

export default server;
