/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable no-plusplus */
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import { API_URL } from '../endpoints.js';
import { Dog, Temperament } from '../db/index.js';
import config from '../lib/config.js';

const { API_KEY } = config;

export async function getBreeds(req, res) {
  try {
    const { name } = req.query;

    if (!name) {
      const dogsApi = await axios.get(`${API_URL}?api_key=${API_KEY}`);
      const dogsDb = await Dog.findAll({ include: { model: Temperament } });

      const promisesResponse = await Promise.all([dogsApi, dogsDb]);
      const [dogsApiResponse, dogsDbResponse] = promisesResponse;

      return res.json(dogsDbResponse.concat(dogsApiResponse.data));
    } else {
      const dogsApi = await axios.get(`${API_URL}?api_key=${API_KEY}`);
      const dogsDb = await Dog.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
        include: { model: Temperament },
      });

      const promisesResponse = await Promise.all([dogsApi, dogsDb]);
      const [dogsApiResponse, dogsDbResponse] = promisesResponse;

      const result = dogsDbResponse.concat(dogsApiResponse.data);
      const finalResults = result.filter((breed) =>
        breed.name.toLowerCase().includes(name.toLowerCase()),
      );

      if (finalResults === [] || finalResults.length === 0) {
        return res.status(404).send({
          success: false,
          error: 404,
          message: 'No dogs found with that name.',
        });
      }
      return res.status(200).json(finalResults);
    }
  } catch (e) {
    return res.status(500).send({
      success: false,
      error: 500,
      message: 'There was an error. Please try again.',
    });
  }
}

export async function getBreedById(req, res, next) {
  try {
    let breedId = req.params.id;
    if (req.params.id.length < 4) {
      breedId = Number(breedId);
      const { data } = await axios.get(`${API_URL}?api_key=${API_KEY}`);

      const detail = data.find((breed) => breed.id === breedId);

      if (detail) {
        return res.status(200).json(detail);
      }
    }
    const breedDbId = await Dog.findByPk(breedId, {
      include: { model: Temperament },
    });

    if (!breedDbId || breedDbId === {}) {
      return res.status(404).send({
        success: false,
        error: 404,
        message: 'No dog found with that id.',
      });
    }

    return res.status(200).json(breedDbId);
  } catch (e) {
    next(e);
  }
}

/* eslint-disable consistent-return */
/* eslint-disable camelcase */
export async function createBreed(req, res, next) {
  try {
    const { name, height, weight, life_span, image, temperament } = req.body;

    const dogExist = await Dog.findOne({ where: { name } });

    if (dogExist) {
      return res.status(400).send({
        success: false,
        error: 400,
        message: 'There already exists a dog with the given name.',
      });
    }

    const createdBreed = await Dog.create({
      id: uuidv4(),
      name,
      height: { metric: height },
      weight: { metric: weight },
      life_span,
      image: { url: image },
    });
    await createdBreed.addTemperament(temperament);
    return res.status(200).json(createdBreed);
  } catch (e) {
    next(e);
  }
}

export async function deleteBreed(req, res, next) {
  try {
    const { id } = req.params;

    await Dog.destroy({ where: { id } });

    return res.status(200).send('Breed deleted successfully!');
  } catch (e) {
    next(e);
  }
}
