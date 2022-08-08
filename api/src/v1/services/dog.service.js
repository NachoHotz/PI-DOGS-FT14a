import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import { API_URL } from '../constants/endpoints.js';
import DogModel from '../../db/models/DogModel.js';
import TemperamentModel from '../../db/models/TemperamentModel.js';
import BadRequestException from '../exceptions/BadRequestException.js';
import InternalServerException from '../exceptions/InternalServerException.js';

export async function GetAllBreeds(next, name) {
  try {
    const dogsApi = await axios.get(API_URL);

    let dogsDb;
    let promisesResponse;

    if (!name) {
      dogsDb = await DogModel.findAll({
        include: { model: TemperamentModel },
      });
      promisesResponse = await Promise.all([dogsApi, dogsDb]);
      const [dogsApiResponse, dogsDbResponse] = promisesResponse;

      return dogsDbResponse.concat(dogsApiResponse.data);
    } else {
      dogsDb = await DogModel.findAll({ include: { model: TemperamentModel } });
      promisesResponse = await Promise.all([dogsApi, dogsDb]);
      const [dogsApiResponse, dogsDbResponse] = promisesResponse;

      const result = dogsDbResponse.concat(dogsApiResponse.data);
      return result.filter((breed) =>
        breed.name.toLowerCase().includes(name.toLowerCase()),
      );
    }
  } catch (e) {
    return next(new InternalServerException(e.message));
  }
}

export async function GetBreedById(id, next) {
  try {
    if (id.length < 4) {
      const breedId = Number(id);

      const { data } = await axios.get(API_URL);

      return data.find((breed) => breed.id === breedId);
    }

    return await DogModel.findByPk(id, {
      include: { model: TemperamentModel },
    });
  } catch (e) {
    return next(new InternalServerException(e.message));
  }
}

export async function CreateBreed(breedInfo, next) {
  try {
    const { name, height, weight, life_span, image, temperaments } = breedInfo;

    const dogExists = await DogModel.findOne({
      where: { name: name },
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
      name: name,
      height: { metric: height },
      weight: { metric: weight },
      life_span: life_span,
      image: { url: image ? image : null },
    });
    await createdBreed.addTemperament(temperaments);

    return DogModel.findByPk(createdBreed.id, { include: { model: TemperamentModel } });
  } catch (e) {
    return next(new InternalServerException(e.message));
  }
}

export async function DeleteBreed(id, next) {
  try {
    const breed = await DogModel.findByPk(id);

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
