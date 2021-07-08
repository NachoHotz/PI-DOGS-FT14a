/* eslint-disable consistent-return */
const axios = require('axios').default;
const { API_URL } = require('../../constants');
const { getBreedByIdDb } = require('../../db/controllers/dog/getBreedsByIdDb');

module.exports = {
  getBreedById: async (req, res, next) => {
    try {
      const breedId = Number(req.params.id);
      const breedApi = await axios.get(`${API_URL}`);

      const breedApiId = breedApi.data.find((breed) => breed.id === breedId);
      if (breedApiId) return res.json(breedApiId);

      const breedIdDb = getBreedByIdDb(breedId);
      if (breedIdDb) return res.json(breedIdDb);

      return res.send('Breed not found');
    } catch (e) {
      next(e);
    }
  },
};
