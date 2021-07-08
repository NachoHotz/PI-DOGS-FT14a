/* eslint-disable consistent-return */
/* eslint-disable max-len */
const axios = require('axios').default;
const { API_URL } = require('../../constants');
const { API_SEARCH_URL } = require('../../constants');
const { getBreedsDb } = require('../../db/controllers/dog/getBreedsDb');
const { getBreedByNameDb } = require('../../db/controllers/dog/getBreedByNameDb');
const { sortByName } = require('./sortByName');

const { API_KEY } = process.env;

module.exports = {
  getBreeds: async (req, res, next) => {
    try {
      const { sortName, breedName } = req.query;

      if (breedName) {
        const breedUniqueApi = await axios.get(`${API_SEARCH_URL}${breedName}&api_key=${API_KEY}`);
        const breedUniqueDb = getBreedByNameDb(breedName);

        Promise.all([breedUniqueApi, breedUniqueDb])
          .then((response) => {
            if (!response) return res.status(404).send('Breed not found.');
            const [breedUniqueApiResponse, breedUniqueDbResponse] = response;
            return res.json(breedUniqueApiResponse.data.concat(breedUniqueDbResponse));
          })
          .catch((e) => next(e));
      }

      if (!sortName || sortName === 'all') {
        const breedsApi = await axios.get(`${API_URL}?api_key=${API_KEY}`);
        const breedsDb = getBreedsDb();
        return res.json(breedsApi.data.concat(breedsDb));
      }

      const breedsApi = await axios.get(`${API_URL}?api_key=${API_KEY}`);
      const breedsDb = getBreedsDb();
      const breedsList = breedsApi.data.concat(breedsDb);

      return res.json(sortByName(breedsList, sortName));
    } catch (e) {
      next(e);
    }
  },
};
