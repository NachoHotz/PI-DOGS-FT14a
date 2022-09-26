import NotFoundException from '../exceptions/NotFoundException.js';
import InternalServerException from '../exceptions/InternalServerException.js';
import * as DogService from '../services/dog.service.js';

export async function getBreeds(req, res, next) {
  try {
    const { name } = req.query;
    let allDogs;

    if (!name) {
      allDogs = await DogService.GetAllBreeds(next, name);

      if (!allDogs || allDogs.length === 0) {
        return next(new NotFoundException('No dogs were found'));
      }

      return res.status(200).send(allDogs);
    }
    allDogs = await DogService.GetAllBreeds(next, name);

    if (!allDogs || allDogs.length === 0) {
      return next(
        new NotFoundException('No dogs were found with the provided name'),
      );
    }

    return res.status(200).send(allDogs);
  } catch (e) {
    return next(new InternalServerException(e.message));
  }
}

export async function getBreedById(req, res, next) {
  try {
    const breedDetail = await DogService.GetBreedById(req.params.id, next);

    if (!breedDetail) {
      return next(new NotFoundException('No breed found with the provided id'));
    }

    return res.status(200).send(breedDetail);
  } catch (e) {
    return next(new InternalServerException(e.message));
  }
}

export async function createBreed(req, res, next) {
  try {
    const createdBreed = await DogService.CreateBreed(req.body, next);

    return res.status(201).send(createdBreed);
  } catch (e) {
    return next(new InternalServerException(e.message));
  }
}

export async function deleteBreed(req, res, next) {
  try {
    const { id } = req.params;

    await DogService.DeleteBreed(id, next);

    return res.status(200).send('Breed deleted successfully!');
  } catch (e) {
    return next(new InternalServerException(e.message));
  }
}
