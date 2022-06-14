const pool = require('../utils/pool');
// const Author = require('../models/Author');

class Book {
  id;
  title;
  released;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.released = row.released;
    this.authors = row.authors;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM books');
    return rows.map((row) => new Book(row));
  }

  static async getById() {
    const { rows } = await pool.query(
      `SELECT books.*, 
      COALESCE(
        json_agg(to_jsonb(authors))
        FILTER (WHERE authors IS NOT NULL), '[]'
      ) as authors
      FROM books
      LEFT JOIN books_authors ON books.id = books_authors.book_id GROUP BY books.id
      LEFT JOIN authors ON authors.id = books_authors.author_id GROUP BY books.id`
    );
    return rows.map((row) => new Book(row));
  }
}

module.exports = Book;
