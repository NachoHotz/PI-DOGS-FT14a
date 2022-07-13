/* eslint-disable no-undef */
const Dog = require('../../src/db/models/Dog');
const sequelize = require('../../src/db/index').default;

describe('Dog model', () => {
  before(() =>
    sequelize.authenticate().catch((err) => {
      console.error('Unable to connect to the database:', err);
    }),
  );
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Dog.create({ name: '' })
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Dog.create({ name: 'Pug' });
      });
    });
  });
});
