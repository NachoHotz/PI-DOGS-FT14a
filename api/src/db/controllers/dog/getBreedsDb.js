const { Dog } = require('../../index');

module.exports = {
  getBreedsDb: async (req, res, next) => {
    try {
      res.json(Dog.findAll());
    } catch (e) {
      next(e);
    }
  },
};
