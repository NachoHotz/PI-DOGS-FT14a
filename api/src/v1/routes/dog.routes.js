import { Router } from 'express';
import * as DogController from '../controllers/dog.controller.js';

const router = Router();

router.get('/', DogController.getBreeds);
router.get('/:id', DogController.getBreedById);
router.get('/temp/:temp', DogController.getBreedsByTemp);
router.post('/', DogController.createBreed);
router.delete('/:id', DogController.deleteBreed);

export default router;
