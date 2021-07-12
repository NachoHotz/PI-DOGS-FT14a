/* eslint-disable consistent-return */
const axios = require('axios').default;
const { Dog, Temperament } = require('../../index');
const { API_SEARCH_URL } = require('../../../constants');

const { API_KEY } = process.env;

module.exports = {
  createBreed: async (req, res, next) => {
    try {
      const newBreed = req.body;
      const createdBreed = await Dog.create({
        name: newBreed.name,
        height: newBreed.height,
        weight: newBreed.weight,
        lifespan: newBreed.lifespan,
      });
      if (createdBreed) {
        res.send('Breed created succesfully.');
      } else {
        res.send('There was an error, please try again.');
      }
    } catch (e) {
      next(e);
    }
  },
};
