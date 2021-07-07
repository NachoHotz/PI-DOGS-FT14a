const { Dog } = require('../../index');

module.exports = {
  getBreedByIdDb: async (req, res, next) => {
    try {
      const { breedId } = Number(req.params.id);
      const breedDetail = await Dog.findByPk(breedId);

      if (!breedDetail) return res.status(404).send('Breed not found.');

      return breedDetail;
    } catch (e) {
      next(e);
    }
  },
};
