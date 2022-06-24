import { Router } from 'express';
import NotFoundException from '../exceptions/NotFoundException.js';

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
import dogRoutes from './dog.js';
import temperamentRoutes from './temperament.js';

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', dogRoutes);
router.use('/temperaments', temperamentRoutes);

router.use('*', (_req, _res, next) => {
  return next(new NotFoundException('This route does not exist'));
});

export default router;
