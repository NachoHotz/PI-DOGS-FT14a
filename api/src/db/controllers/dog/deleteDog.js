const { Dog } = require('../../../db/index');

module.exports = {
  deleteBreed: async (req, res, next) => {
    try {
      const { id } = req.params;

      await Dog.destroy({ where: { id } });

      return res.status(200).send('Breed deleted successfully!');
    } catch (e) {
      next(e);
    }
  }
}
