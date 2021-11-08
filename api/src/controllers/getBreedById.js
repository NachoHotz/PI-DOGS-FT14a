/* eslint-disable consistent-return */
const axios = require('axios').default;
const { API_URL } = require('../../endpoints');
const { Dog, Temperament } = require('../../db/index');
const config = require('../../lib/config');

const { API_KEY } = config;

module.exports = {
  getBreedById: async (req, res, next) => {
    try {
      let breedId = req.params.id;
      if (req.params.id.length < 4) {
        breedId = Number(breedId);
        const { data } = await axios.get(`${API_URL}?api_key=${API_KEY}`);

        const detail = data.find((breed) => breed.id === breedId);

        if (detail) {
          return res.json(detail);
        }
      }
      const breedDbId = await Dog.findByPk(breedId, {
        include: { model: Temperament },
      });
      return res.json(breedDbId);
    } catch (e) {
      next(e);
    }
  },
};
