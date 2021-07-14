/* eslint-disable consistent-return */
/* eslint-disable max-len */
const axios = require('axios').default;
const { API_URL } = require('../../constants');
const { getBreedsDb } = require('../../db/controllers/dog/getBreedsDb');
const { getBreedByNameDb } = require('../../db/controllers/dog/getBreedByNameDb');

const { API_KEY } = process.env;

module.exports = {
  getBreeds: async (req, res, next) => {
    try {
      const { sort, name, creator } = req.query;

      if (sort === 'asc') {
        const breedsApi = await axios.get(`${API_URL}?api_key=${API_KEY}`);
        const breedsDb = getBreedsDb();

        Promise.all([breedsApi, breedsDb])
          .then((response) => {
            const [breedsApiResponse, breedsDbResponse] = response;
            const breedsList = breedsDbResponse.concat(breedsApiResponse.data);
            return res.json(breedsList.sort((a, b) => {
              if (a.name < b.name) return -1;
              if (a.name > b.name) return 1;
              return 0;
            }));
          })
          .catch((error) => console.log(error));
      }

      if (sort === 'desc') {
        const breedsApi = await axios.get(`${API_URL}?api_key=${API_KEY}`);
        const breedsDb = getBreedsDb();

        Promise.all([breedsApi, breedsDb])
          .then((response) => {
            const [breedsApiResponse, breedsDbResponse] = response;
            const breedsList = breedsDbResponse.concat(breedsApiResponse.data);
            return res.json(breedsList.sort((a, b) => {
              if (a.name < b.name) return 1;
              if (a.name > b.name) return -1;
              return 0;
            }));
          })
          .catch((error) => console.log(error));
      }

      if (name) {
        const breedUniqueApi = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${API_KEY}`);
        if (breedUniqueApi) {
          return res.json(breedUniqueApi.data);
        }

        const breedUniqueDb = getBreedByNameDb(name);
        if (breedUniqueDb) {
          return res.json(breedUniqueDb);
        }

        return res.send('Breed not found');
      }

      if (!creator || creator === 'all') {
        const breedsApi = await axios.get(`${API_URL}?api_key=${API_KEY}`);
        const breedsDb = getBreedsDb();

        Promise.all([breedsApi, breedsDb])
          .then((response) => {
            const [breedsApiResponse, breedsDbResponse] = response;
            return res.json(breedsDbResponse.concat(breedsApiResponse.data));
          });
      } else if (creator === 'user') {
        return res.json(getBreedsDb());
      } else if (creator === 'genuine') {
        const breedsApi = await axios.get(`${API_URL}?api_key=${API_KEY}`);
        return res.json(breedsApi.data);
      }
    } catch (e) {
      next(e);
    }
  },
};
