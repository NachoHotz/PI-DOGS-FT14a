const { Router } = require('express');
const { getBreeds } = require('../controllers/Dog/getBreeds');
const { getBreedById } = require('../controllers/Dog/getBreedById');
const { createBreed } = require('../db/controllers/dog/createBreed');

const router = Router();

router.get('/', getBreeds);
router.get('/:id', getBreedById);
//router.post('/', createBreed);

module.exports = router;
