/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable no-plusplus */
const axios = require('axios').default;
const { Op } = require('sequelize');
const { API_URL } = require('../endpoints');
const { getBreedsDb } = require('../db/controllers/dog/getBreedsDb');
const { Dog, Temperament } = require('../db/index');
const config = require('../lib/config');

const { API_KEY } = config;

module.exports = {
  getBreeds: async (req, res) => {
    try {
      const { name } = req.query;

      if (!name) {
        const dogsApi = await axios.get(`${API_URL}?api_key=${API_KEY}`);
        const dogsDb = getBreedsDb();

        const promisesResponse = await Promise.all([dogsApi, dogsDb]);
        const [dogsApiResponse, dogsDbResponse] = promisesResponse;

        return res.json(dogsDbResponse.concat(dogsApiResponse.data));
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

        const promisesResponse = await Promise.all([dogsApi, dogsDb]);
        const [dogsApiResponse, dogsDbResponse] = promisesResponse;

        const result = dogsDbResponse.concat(dogsApiResponse.data);
        const finalResults = result.filter((breed) => breed.name.toLowerCase().includes(name.toLowerCase()));

        if (finalResults === [] || finalResults.length === 0) {
          return res.status(404).send({
            success: false,
            error: 404,
            message: 'No dogs found with that name.',
          });
        }
        return res.status(200).json(finalResults);
      }
    } catch (e) {
      return res.status(500).send({
        success: false,
        error: 500,
        message: 'There was an error. Please try again.'
      });
    }
  },
};
