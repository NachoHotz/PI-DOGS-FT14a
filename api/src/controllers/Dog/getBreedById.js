/* eslint-disable consistent-return */
const axios = require('axios').default;
const { API_URL } = require('../../constants');
const { getBreedByIdDb } = require('../../db/controllers/dog/getBreedsByIdDb');

module.exports = {
  getBreedById: async (req, res, next) => {
    try {
      const { id } = req.params;

      const breedApi = await axios.get(`${API_URL}`);
      const breedApiId = breedApi.data.find((breed) => breed.id === id);
      const breedDb = getBreedByIdDb();

      return breedApiId
        ? res.json(breedApiId)
        : breedDb || res.send('Breed not found.');
    } catch (e) {
      next(e);
    }
  },
};
