/* eslint-disable consistent-return */
/* eslint-disable max-len */
const axios = require('axios').default;
const { API_URL } = require('../../constants');
const { getBreedsDb } = require('../../db/controllers/dog/getBreedsDb');
const { sortByName } = require('./sortByName');

const { API_KEY } = process.env;

module.exports = {
  getBreeds: async (req, res, next) => {
    try {
      const { nameSort } = req.query;

      if (!nameSort || nameSort === 'all') {
        const breedsApi = await axios.get(`${API_URL}?api_key=${API_KEY}`);
        const breedsDb = getBreedsDb();
        res.json(breedsApi.data.concat(breedsDb));
      }
      const breedsApi = await axios.get(`${API_URL}?api_key=${API_KEY}`);
      const breedsDb = getBreedsDb();

      const breeds = breedsApi.data.concat(breedsDb);
      return res.json(sortByName(breeds, nameSort));
    } catch (e) {
      next(e);
    }
  },
};
