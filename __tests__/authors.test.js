const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('authors routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/authors should return a list of authors', async () => {
    const res = await request(app).get('/authors');
    expect(res.body.length).toEqual(10);
    const author1 = res.body.find((author) => author.id === 1);
    expect(author1).toHaveProperty('name', 'Ernest Hemingway');
    expect(author1).toHaveProperty('dob', '1899-07-21');
    expect(author1).toHaveProperty('pob', 'Oak Park, IL');
    const author10 = res.body.find((author) => author.id === 10);
    expect(author10).toHaveProperty('name', 'Michael Merrill');
    expect(author10).toHaveProperty('dob', '1980-10-03');
    expect(author10).toHaveProperty('pob', 'Portland, OR');
  });

  afterAll(() => {
    pool.end();
  });
});
