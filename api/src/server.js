import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import v1Routes from './v1/routes/index.routes.js';
import errorMiddleware from './v1/middlewares/error.middleware.js';
import NotFoundException from './v1/exceptions/NotFoundException.js';
import { corsOptions, envConfig } from './config/index.js';

const server = express();

Sentry.init({
  dsn: envConfig.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ server }),
  ],

  tracesSampleRate: 1.0,
});

server.use(Sentry.Handlers.requestHandler());
server.use(Sentry.Handlers.tracingHandler());

server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));
server.use(helmet({ hidePoweredBy: true }));
server.use(cors(corsOptions));

server.use('/api/v1', v1Routes);

server.use('*', (_req, _res, next) => next(new NotFoundException('This route does not exist')));

server.use(Sentry.Handlers.errorHandler());

server.use(errorMiddleware);

export default server;
