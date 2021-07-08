const axios = require('axios').default;
const { Temperament } = require('../../index');
const { API_URL } = require('../../../constants');

const { API_KEY } = process.env;

module.exports = {
  getTemperaments: async (req, res, next) => {
    try {
      const temperaments = await axios.get(`${API_URL}?api_key=${API_KEY}`);
      const temperamentsList = temperaments.data.map((breed) => breed.temperament);
      const temperamentsInDb = await temperamentsList.forEach((temp) => Temperament.create({ name: temp }));
      res.json(temperamentsInDb);
    } catch (e) {
      next(e);
    }
  },
};
