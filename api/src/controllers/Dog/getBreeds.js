/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable no-plusplus */
const axios = require('axios').default;
const { Op } = require('sequelize');
const { API_URL } = require('../../endpoints');
const { getBreedsDb } = require('../../db/controllers/dog/getBreedsDb');
const { Dog, Temperament } = require('../../db/index');

const { API_KEY } = process.env;

module.exports = {
  getBreeds: async (req, res) => {
    try {
      const { name } = req.query;

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
            if (finalResults === []) {
              res.status(404).send('No dogs found, please try again.');
            }
            res.status(200).json(finalResults);
          });
      }
    } catch (e) {
      res.status(500).send('There was an error, please try again.');
    }
  },
};
