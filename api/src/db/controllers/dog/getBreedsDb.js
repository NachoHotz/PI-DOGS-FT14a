/* eslint-disable consistent-return */
/* eslint-disable no-console */
const { Dog, Temperament } = require('../../index');

module.exports = {
  getBreedsDb: async () => {
    try {
      const breeds = await Dog.findAll({ include: { model: Temperament } });
      return breeds;
    } catch (e) {
      console.log(e);
    }
  },
};
