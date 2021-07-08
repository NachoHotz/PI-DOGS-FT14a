const { Dog, Temperament } = require('../../index');

module.exports = {
  createBreed: async (req, res, next) => {
    try {
      const { breed } = req.body;
      if (!breed.name) res.status(500).send('The name is required.');

      const createdBreed = await Dog.create({
        name: breed.name,
        height: breed.height,
        weight: breed.weight,
        lifespan: breed.lifespan,
      }, {
        include: Temperament,
      });
      res.json(createdBreed);
    } catch (e) {
      next(e);
    }
  },
};
