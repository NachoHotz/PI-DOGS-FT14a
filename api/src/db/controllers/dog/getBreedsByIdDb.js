/* eslint-disable consistent-return */
const { Dog, Temperament } = require('../../index');

module.exports = {
  getBreedByIdDb: async (breedId) => {
    try {
      const breedDetail = await Dog.findByPk(breedId, { include: Temperament });
      return breedDetail;
    } catch (e) {
      console.log(e);
    }
  },
};
