import axios from 'axios';
import TemperamentModel from '../db/models/Temperament.js';
import InternalServerException from '../exceptions/InternalServerException.js';
import { API_URL } from '../constants/endpoints.js';

export async function GetAllTemperaments(next) {
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

      return TemperamentModel.findAll();
    } else {
      return temperamentInDb;
    }
  } catch (e) {
    return next(new InternalServerException(e.message));
  }
}
