/* eslint-disable consistent-return */
const axios = require('axios').default;
const { API_URL } = require('../../constants');
const { getBreedByIdDb } = require('../../db/controllers/dog/getBreedsByIdDb');

module.exports = {
  getBreedById: async (req, res, next) => {
    try {
      const breedId = req.params.id;
      const breedApi = await axios.get(`${API_URL}`);

      const breedApiId = breedApi.data.find((breed) => breed.id === breedId);
      const breedDbId = getBreedByIdDb(breedId);

      if (breedApiId) {
        res.json(breedApiId);
      } else if (breedDbId) {
        res.json(breedDbId);
      } else {
        res.send('Breed not found.');
      }
    } catch (e) {
      next(e);
    }
  },
};
