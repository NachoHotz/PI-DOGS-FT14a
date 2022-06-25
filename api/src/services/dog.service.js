import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import { API_URL } from '../constants/endpoints.js';
import DogModel from '../db/models/Dog.js';
import TemperamentModel from '../db/models/Temperament.js';
import BadRequestException from '../exceptions/BadRequestException.js';
import InternalServerException from '../exceptions/InternalServerException.js';

export async function GetAllBreeds(next) {
  try {
    const dogsApi = await axios.get(API_URL);
    const dogsDb = await DogModel.findAll({
      include: { model: TemperamentModel },
    });

    const promisesResponse = await Promise.all([dogsApi, dogsDb]);
    const [dogsApiResponse, dogsDbResponse] = promisesResponse;

    return dogsDbResponse.concat(dogsApiResponse.data);
  } catch (e) {
    return next(new InternalServerException(e.message));
  }
}

export async function GetAllBreedsByName(name, next) {
  try {
    const dogsApi = await axios.get(API_URL);
    const dogsDb = await DogModel.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: { model: TemperamentModel },
    });
    const promisesResponse = await Promise.all([dogsApi, dogsDb]);
    const [dogsApiResponse, dogsDbResponse] = promisesResponse;

    const result = dogsDbResponse.concat(dogsApiResponse.data);
    const finalResults = result.filter((breed) =>
      breed.name.toLowerCase().includes(name.toLowerCase()),
    );

    return finalResults;
  } catch (e) {
    return next(new InternalServerException(e.message));
  }
}

export async function GetBreedById(id, next) {
  try {
    if (id.length < 4) {
      const breedId = Number(id);

      const { data } = await axios.get(API_URL);

      const detail = data.find((breed) => breed.id === breedId);

      return detail;
    }

    const breedDbId = await DogModel.findByPk(id, {
      include: { model: TemperamentModel },
    });

    return breedDbId;
  } catch (e) {
    return next(new InternalServerException(e.message));
  }
}

export async function GetBreedsByTemp(temp, next) {
  try {
    const dogsApi = await axios.get(API_URL);
    const dogsDb = await DogModel.findAll({
      where: {
        temperament: {
          [Op.iLike]: `%${temp}%`,
        },
      },
      include: { model: TemperamentModel },
    });

    const promisesResponse = await Promise.all([dogsApi, dogsDb]);
    const [dogsApiResponse, dogsDbResponse] = promisesResponse;

    const result = dogsDbResponse.concat(dogsApiResponse.data);

    return result;
  } catch (e) {
    return next(new InternalServerException(e.message));
  }
}

export async function CreateBreed(breedInfo, next) {
  try {
    const dogExists = await DogModel.findOne({
      where: { name: breedInfo.name },
    });

    if (dogExists) {
      return next(
        new BadRequestException(
          `There is already a dog breed with the name ${breedInfo.name}`,
        ),
      );
    }

    const createdBreed = await DogModel.create({
      id: uuidv4(),
      name: breedInfo.name,
      height: { metric: breedInfo.height },
      weight: { metric: breedInfo.weight },
      life_span: breedInfo.life_span,
      image: { url: breedInfo.image },
    });
    await createdBreed.addTemperament(breedInfo.temperament);

    return createdBreed;
  } catch (e) {
    return next(new InternalServerException(e.message));
  }
}

export async function DeleteBreed(id, next) {
  try {
    const breed = await DogModel.findByPk(id);
    console.log('breed', breed);

    if (!breed) {
      return next(
        new BadRequestException('Breed not found. Probably already deleted'),
      );
    }

    await breed.destroy();
  } catch (e) {
    return next(new InternalServerException(e.message));
  }
}
