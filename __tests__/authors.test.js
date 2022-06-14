const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('authors routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET /authors should return a list of authors', async () => {
    const res = await request(app).get('/authors');
    expect(res.body.length).toEqual(10);
    const author1 = res.body.find((author) => author.id === 1);
    expect(author1).toHaveProperty('name', 'Ernest Hemingway');
    const author10 = res.body.find((author) => author.id === 10);
    expect(author10).toHaveProperty('name', 'Michael Merrill');
  });

  it('GET /authors/:id should return author detail, including books', async () => {
    const res = await request(app).get('/authors/1');
    const auth1 = res.body.find((author) => author.id === 1);
    expect(auth1).toHaveProperty('name', 'Ernest Hemingway');
    expect(auth1).toHaveProperty('dob', '1899-07-21T08:00:00.000Z');
    expect(auth1).toHaveProperty('pob', 'Oak Park, IL');
    expect(auth1).toHaveProperty('books', [
      { id: 8, title: 'For Whom the Bell Tolls', released: 1940 },
      { id: 9, title: 'A Farewell to Arms', released: 1929 },
      { id: 10, title: 'The Sun Also Rises', released: 1926 },
    ]);
  });

  it('POST /authors should add a new author', async () => {
    const res = await request(app).post('/authors').send({
      name: 'F. Scott Fitzgerald',
      dob: '1896-09-24',
      pob: 'Saint Paul, MN',
    });
    expect(res.body.name).toEqual('F. Scott Fitzgerald');
    expect(res.body.dob).toEqual('1896-09-24');
    expect(res.body.pob).toEqual('Saint Paul, MN');
  });

  afterAll(() => {
    pool.end();
  });
});
