/* eslint-disable consistent-return */
const { Dog, Temperament } = require('../../index');

module.exports = {
  getBreedsDb: async () => {
    try {
      const breeds = await Dog.findAll({ include: Temperament });
      return breeds;
    } catch (e) {
      console.log(e);
    }
  },
};
