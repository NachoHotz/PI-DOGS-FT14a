/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import InternalServerException from '../exceptions/InternalServerException.js';
import * as TemperamentService from '../services/temperament.service.js';

export async function getTemperaments(_req, res, next) {
  try {
    const allTemperaments = await TemperamentService.GetAllTemperaments(next);

    return res.status(200).send(allTemperaments);
  } catch (e) {
    return next(new InternalServerException(e));
  }
}
