/* eslint-disable consistent-return */
const axios = require('axios').default;
const { API_URL } = require('../../constants');
const { Dog, Temperament } = require('../../db/index');

const { API_KEY } = process.env;

module.exports = {
  getBreedById: async (req, res, next) => {
    try {
      if (req.params.id.length < 4) {
        const breedId = Number(req.params.id);
        const breedApi = await axios.get(`${API_URL}?api_key=${API_KEY}`);

        const detail = breedApi.data.find((breed) => breed.id === breedId);

        if (detail) {
          return res.json(detail);
        }
      }
      const breedId = req.params.id;
      const breedDbId = await Dog.findByPk(breedId, { include: { model: Temperament } });
      return res.json(breedDbId);
    } catch (e) {
      next(e);
    }
  },
};
