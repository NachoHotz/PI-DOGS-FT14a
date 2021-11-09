const router = require('express').Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogRoutes = require('./dog');
const temperamentRoutes = require('./temperament');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', dogRoutes);
router.use('/temperaments', temperamentRoutes);

module.exports = router;
