const { Router } = require('express');
const { getBreeds } = require('../controllers/getBreeds');
const { getBreedById } = require('../controllers/getBreedById');
const { createBreed } = require('../db/controllers/dog/createBreed');
const { deleteBreed } = require('../db/controllers/dog/deleteDog');

const router = Router();

router.get('/', getBreeds);
router.get('/:id', getBreedById);
router.post('/', createBreed);
router.delete('/:id', deleteBreed);

module.exports = router;
