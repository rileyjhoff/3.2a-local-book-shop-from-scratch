const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('books routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/books should return a list of books', async () => {
    const res = await request(app).get('/books');
    expect(res.body.length).toEqual(10);
    const book1 = res.body.find((book) => book.id === 1);
    expect(book1).toHaveProperty('title', 'The Corrections');
    expect(book1).toHaveProperty('released', 2001);
    const book10 = res.body.find((book) => book.id === 10);
    expect(book10).toHaveProperty('title', 'The Sun Also Rises');
    expect(book10).toHaveProperty('released', 1926);
  });

  afterAll(() => {
    pool.end();
  });
});
