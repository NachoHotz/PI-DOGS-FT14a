/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable no-plusplus */
const axios = require('axios').default;
const { Op } = require('sequelize');
const { API_URL } = require('../../constants');
const { getBreedsDb } = require('../../db/controllers/dog/getBreedsDb');
const { Dog, Temperament } = require('../../db/index');

const { API_KEY } = process.env;

module.exports = {
  getBreeds: async (req, res, next) => {
    try {
      const { name, creator } = req.query;

      if (creator === 'all') {
        const dogsApi = await axios.get(`${API_URL}?api_key=${API_KEY}`);
        const dogsDb = getBreedsDb();

        Promise.all([dogsApi, dogsDb])
          .then((response) => {
            const [dogsApiResponse, dogsDbResponse] = response;
            return res.json(dogsDbResponse.concat(dogsApiResponse.data));
          });
      } else if (creator === 'created') {
        const dogsDb = getBreedsDb();
        Promise.all([dogsDb])
          .then((response) => {
            const [dogsDbResponse] = response;
            return res.json(dogsDbResponse);
          })
          .catch((e) => next(e));
      }

      if (!name) {
        const dogsApi = await axios.get(`${API_URL}?api_key=${API_KEY}`);
        const dogsDb = getBreedsDb();

        Promise.all([dogsApi, dogsDb])
          .then((response) => {
            const [dogsApiResponse, dogsDbResponse] = response;
            return res.json(dogsDbResponse.concat(dogsApiResponse.data));
          });
      } else {
        const dogsApi = await axios.get(`${API_URL}?api_key=${API_KEY}`);
        const dogsDb = await Dog.findAll({
          where: {
            name: {
              [Op.iLike]: `%${name}%`,
            },
          },
          include: { model: Temperament },
        });
        Promise.all([dogsApi, dogsDb])
          .then((response) => {
            const [dogsApiResponse, dogsDbResponse] = response;
            const result = dogsDbResponse.concat(dogsApiResponse.data);

            const finalResults = [];

            for (let i = 0; i < result.length; i++) {
              if (result[i].name.toLowerCase().includes(name.toLowerCase())) {
                finalResults.push(result[i]);
              }
            }
            res.json(finalResults);
          });
      }
    } catch (e) {
      res.status(500).send('There was an error, please try again.');
    }
  },
};
