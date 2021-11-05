/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const axios = require('axios').default;
const { Temperament } = require('../../index');
const { API_URL } = require('../../../endpoints');

const { API_KEY } = process.env;

module.exports = {
  getTemperaments: async (req, res, next) => {
    try {
      const temperamentInDb = await Temperament.findAll();

      if (temperamentInDb.length === 0) {
        const { data } = await axios.get(`${API_URL}?api_key=${API_KEY}`);

        let temperamentsList = data.map((breed) => breed.temperament?.split(', '));

        temperamentsList = [...new Set(temperamentsList.flat(Infinity))].filter((temp) => temp !== undefined);

        temperamentsList.forEach(async (temp) => await Temperament.findOrCreate({ where: { name: temp } }))

        res.status(200).json(temperamentInDb);
      } else {
        res.status(200).json(temperamentInDb);
      }
    } catch (e) {
      next(e);
    }
  },
};
