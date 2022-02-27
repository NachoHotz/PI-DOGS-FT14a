/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app');
const { Dog, conn } = require('../../src/db/index');

const agent = session(app);
const dog = {
  name: 'Pug',
  height: '30-60',
  weight: '10-15',
  life_span: '9-15',
  temperament: [1, 3, 5],
};

describe('Dog routes', () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error('Unable to connect to the database:', err);
    }),
  );
  beforeEach(() => Dog.sync({ force: true }).then(() => Dog.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () => agent.get('/dogs').expect(200));
    it('The parameters that GET receives are objects', () =>
      agent
        .get('/dogs')
        .expect((res) => expect(typeof res.body[0]).equal('object'))).timeout(
      5000,
    );
  });
  describe('GET /dogs?name', () => {
    it('should return 200 if it finds a dog', () =>
      agent
        .get('/dogs?name=bulldog')
        .expect((res) => expect(res.status).equal(200))).timeout(5000);
  });
});
