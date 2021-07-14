/* eslint-disable consistent-return */
const { v4: uuidv4 } = require('uuid');
const { Dog, Temperament } = require('../../index');

module.exports = {
  createBreed: async (req, res, next) => {
    try {
      const newBreed = req.body;

      if (!newBreed.name || newBreed.height || newBreed.weight) {
        return res.send('Name, height and weight fields are required. Please make sure that all fields are completed.');
      }

      const dogExist = await Dog.findOne({ where: { name: newBreed.name } });
      if (dogExist) {
        return res.send('There already exists a dog breed with the sama name. Please choose another one.');
      }
      const createdBreed = await Dog.create({
        id: uuidv4(),
        name: newBreed.name,
        height: newBreed.height,
        weight: newBreed.weight,
        lifespan: newBreed.lifespan,
        img: newBreed.img,
      });

      return res.json(createdBreed);
    } catch (e) {
      next(e);
    }
  },
};
