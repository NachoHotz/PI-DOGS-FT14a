const router = require('express').Router();

const {
  getTemperaments,
} = require('../db/controllers/temperament/getTemperaments');

router.get('/', getTemperaments);

module.exports = router;
