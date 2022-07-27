import { Router } from 'express';

import dogRoutes from './dog.routes.js';
import temperamentRoutes from './temperament.routes.js';

const router = Router();

router.use('/dogs', dogRoutes);
router.use('/temperaments', temperamentRoutes);

export default router;
