const pool = require('../utils/pool');

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

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT 
      books.*, 
      COALESCE(
        json_agg((authors.id, authors.name))
        FILTER (WHERE authors.id IS NOT NULL), '[]'
      ) as authors
      FROM books
      LEFT JOIN books_authors ON books.id = books_authors.book_id
      LEFT JOIN authors ON authors.id = books_authors.author_id
      Where books.id = $1
      GROUP BY books.id`,
      [id]
    );
    return rows.map((row) => new Book(row));
  }
  static async insert({ title, released }) {
    const { rows } = await pool.query(
      `INSERT 
      INTO books (title, released) 
      VALUES ($1, $2) 
      RETURNING *`,
      [title, released]
    );
    return new Book(rows[0]);
  }
}

module.exports = Book;
