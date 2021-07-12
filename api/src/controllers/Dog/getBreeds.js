/* eslint-disable consistent-return */
/* eslint-disable max-len */
const axios = require('axios').default;
const { API_URL } = require('../../constants');
const { getBreedsDb } = require('../../db/controllers/dog/getBreedsDb');
const { getBreedByNameDb } = require('../../db/controllers/dog/getBreedByNameDb');
const { sortByName } = require('./sortByName');

const { API_KEY } = process.env;

module.exports = {
  getBreeds: async (req, res, next) => {
    try {
      const { sort, name, creator } = req.query;

      if (name) {
        const breedUniqueApi = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${API_KEY}`);
        if (breedUniqueApi) res.json(breedUniqueApi.data);

        const breedUniqueDb = getBreedByNameDb(name);
        if (breedUniqueDb) res.json(breedUniqueDb);
        res.send('Breed not found');
      }

      if (!creator || creator === 'all') {
        const breedsApi = await axios.get(`${API_URL}?api_key=${API_KEY}`);
        const breedsDb = getBreedsDb();
        res.json(breedsDb.concat(breedsApi));
      } else if (creator === 'user') {
        res.json(getBreedsDb());
      } else if (creator === 'genuine') {
        const breedsApi = await axios.get(`${API_URL}?api_key=${API_KEY}`);
        res.json(breedsApi.data);
      }

      if (sort) {
        const breedsApi = await axios.get(`${API_URL}?api_key=${API_KEY}`);
        const breedsDb = getBreedsDb();
        const breedsList = breedsDb.concat(breedsApi.data);

        return res.json(sortByName(breedsList, sort));
      }
    } catch (e) {
      next(e);
    }
  },
};
