// eslint-disable consistent-return
// eslint-disable max-len
const axios = require('axios').default;
const { API_URL } = require('../../constants');
const { getBreedsDb } = require('../../db/controllers/dog/getBreedsDb');

const { API_KEY } = process.env;

module.exports = {
  getBreeds: async (req, res, next) => {
    try {
      let { name } = req.query;

      if (name) {
        name = name.split(' ');
        name = name.map((char) => (char.charAt(0).toLowerCase() ? char.charAt(0).toUpperCase() : char));
        name = name.join(' ');

        const breedsApiUnique = await axios.get(`${API_URL}/search?q=${name}&api_key=${API_KEY}`);
        if (breedsApiUnique) res.json(breedsApiUnique);

        const breedsDb = getBreedsDb();

        if (breedsDb) {
          const breedDbUnique = breedsDb.find((breed) => breed.name === name);
          if (breedDbUnique) res.json(breedDbUnique);
        }

        res.status(404).send('Breed not found.');
      }
      const breedsApi = await axios.get(`${API_URL}?api_key=${API_KEY}`);
      const breedsDb = getBreedsDb();
      res.json(breedsApi.data.concat(breedsDb));
    } catch (e) {
      next(e);
    }
  },
};
