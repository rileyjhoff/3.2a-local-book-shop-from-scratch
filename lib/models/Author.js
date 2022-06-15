const pool = require('../utils/pool');

class Author {
  id;
  name;
  dob;
  pob;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.dob = row.dob;
    this.pob = row.pob;
    this.books = row.books;
  }

  static async getAllIdAndNames() {
    const { rows } = await pool.query('SELECT id, name FROM authors');
    return rows.map((row) => new Author(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT 
        authors.*, 
        COALESCE(
          json_agg(to_jsonb(books))
          FILTER (WHERE books.id IS NOT NULL), '[]'
        ) as books
      FROM authors
      LEFT JOIN books_authors ON authors.id = books_authors.author_id
      LEFT JOIN books ON books.id = books_authors.book_id
      Where authors.id = $1
      GROUP BY authors.id`,
      [id]
    );
    return rows.map((row) => new Author(row));
  }

  toJSON() {
    return { ...this, dob: new Date(this.dob).toDateString() };
  }

  static async insert({ name, dob, pob }) {
    const { rows } = await pool.query(
      `INSERT 
      INTO authors (name, dob, pob) 
      VALUES ($1, $2, $3) 
      RETURNING *`,
      [name, dob, pob]
    );
    return new Author(rows[0]);
  }
}

module.exports = Author;
