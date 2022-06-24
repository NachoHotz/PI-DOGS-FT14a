/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable no-plusplus */
import NotFoundException from '../exceptions/NotFoundException.js';
import InternalServerException from '../exceptions/InternalServerException.js';
import * as DogService from '../services/dog.service.js';

export async function getBreeds(req, res, next) {
  try {
    const { name } = req.query;

    if (!name) {
      const allDogs = await DogService.GetAllBreeds(next);

      if (!allDogs || allDogs.length === 0) {
        return next(new NotFoundException('No dogs found'));
      }

      return res.status(200).send(allDogs);
    } else {
      const allDogs = await DogService.GetAllBreedsByName(name, next);

      if (!allDogs || allDogs.length === 0) {
        return next(
          new NotFoundException('No dogs were found with the provided name'),
        );
      }
    }
  } catch (e) {
    return next(new InternalServerException(e));
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
    return next(new InternalServerException(e));
  }
}

export async function getBreedsByTemp(req, res, next) {
  try {
    const { temp } = req.query;

    const breedsFiltered = await DogService.GetBreedsByTemp(temp, next);

    if (!breedsFiltered || breedsFiltered.length === 0) {
      return next(
        new NotFoundException('No breeds found with the provided filters'),
      );
    }

    return res.status(200).send(breedsFiltered);
  } catch (e) {
    return next(new InternalServerException(e));
  }
}

/* eslint-disable consistent-return */
/* eslint-disable camelcase */
export async function createBreed(req, res, next) {
  try {
    const createdBreed = await DogService.CreateBreed(req.body, next);

    return res.status(201).send(createdBreed);
  } catch (e) {
    return next(new InternalServerException(e));
  }
}

export async function deleteBreed(req, res, next) {
  try {
    const { id } = req.params;

    await DogService.DeleteBreed(id, next);

    return res.status(200).send('Breed deleted successfully!');
  } catch (e) {
    return next(new InternalServerException(e));
  }
}
