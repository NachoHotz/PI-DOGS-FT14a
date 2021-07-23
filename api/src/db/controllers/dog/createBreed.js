/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const { v4: uuidv4 } = require('uuid');
const { Dog, Temperament } = require('../../index');

module.exports = {
  createBreed: async (req, res, next) => {
    try {
      const {
        name, height, weight, life_span, image, temperament,
      } = req.body;
      const dogExist = await Dog.findOne({ where: { name } });

      if (dogExist) {
        return res.send('There already exists a dog breed with the sama name. Please choose another one.');
      }

      const createdBreed = await Dog.create({
        id: uuidv4(),
        name,
        height: { metric: height },
        weight: { metric: weight },
        life_span,
        image: { url: image },
      });
      await createdBreed.addTemperament(temperament);
      return res.json(createdBreed);
    } catch (e) {
      next(e);
    }
  },
};
