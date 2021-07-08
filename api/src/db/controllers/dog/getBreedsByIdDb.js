const { Dog, Temperament } = require('../../index');

module.exports = {
  getBreedByIdDb: async (breedId) => {
    try {
      const breedDetail = await Dog.findByPk(breedId, { include: Temperament });
      if (!breedDetail) return 'Breed not found.';
      return breedDetail;
    } catch (error) {
      console.log(error);
    }
  },
};
