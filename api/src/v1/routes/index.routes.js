import { Router } from 'express';

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
import dogRoutes from './dog.routes.js';
import temperamentRoutes from './temperament.routes.js';

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', dogRoutes);
router.use('/temperaments', temperamentRoutes);

export default router;
