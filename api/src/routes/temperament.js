const { Router } = require('express');
const { getTemperaments } = require('../db/controllers/temperament/getTemperaments');

const router = Router();

router.get('/', getTemperaments);

module.exports = router;
