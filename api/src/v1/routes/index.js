import { Router } from 'express';

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
import dogRoutes from './dog.js';
import temperamentRoutes from './temperament.js';

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', dogRoutes);
router.use('/temperaments', temperamentRoutes);

export default router;
