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
        const temperaments = await axios.get(`${API_URL}?api_key=${API_KEY}`);
        const temperamentsList = temperaments.data;

        for (let i = 0; i < temperamentsList.length; i++) {
          const temperamentsListSplitted = temperamentsList[i].temperament?.split(', ');

          for (let j = 0; j < temperamentsListSplitted?.length; j++) {
            await Temperament.findOrCreate({ where: { name: temperamentsListSplitted[j] } });
          }
        }
        res.json(temperamentInDb);
      } else {
        res.json(temperamentInDb);
      }
    } catch (e) {
      next(e);
    }
  },
};
