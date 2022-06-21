import { Router } from 'express';

import * as TemperamentController from '../controllers/temperaments.controller.js';

const router = Router();

router.get('/', TemperamentController.getTemperaments);

export default router;
