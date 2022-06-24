/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import axios from 'axios';
import InternalServerException from '../exceptions/InternalServerException.js';
import TemperamentModel from '../db/models/Temperament.js';
import { API_URL } from '../constants/endpoints.js';

export async function getTemperaments(_req, res, next) {
  try {
    const temperamentInDb = await TemperamentModel.findAll();

    if (temperamentInDb.length === 0) {
      const { data } = await axios.get(API_URL);

      let temperamentsList = data.map((breed) =>
        breed.temperament?.split(', '),
      );

      temperamentsList = [...new Set(temperamentsList.flat(2))].filter(
        (temp) => temp !== undefined,
      );

      temperamentsList.forEach(
        async (temp) =>
          await TemperamentModel.findOrCreate({ where: { name: temp } }),
      );

      res.status(200).json(temperamentInDb);
    } else {
      res.status(200).json(temperamentInDb);
    }
  } catch (e) {
    return next(new InternalServerException(e));
  }
}
