/* eslint-disable consistent-return */
const { Dog, Temperament } = require('../../index');

module.exports = {
  getBreedByNameDb: async (breedName) => {
    try {
      const breedDetail = await Dog.findOne({ where: { name: breedName } }, { include: Temperament });
      return breedDetail;
    } catch (e) {
      console.log(e);
    }
  },
};
