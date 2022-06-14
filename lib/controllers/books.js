const { Router } = require('express');
const Book = require('../models/Book');

module.exports = Router()
  .get('/', async (req, res) => {
    const books = await Book.getAll();
    res.json(books);
  })
  .get('/:id', async (req, res) => {
    const id = req.params.id;
    const arr = [];
    const book = await Book.getById(id);
    book.reduce((acc, book) => {
      const authArr = [];
      book.authors.map(({ f1, f2 }) => {
        const obj = {
          id: f1,
          name: f2,
        };
        return authArr.push(obj);
      }, {});
      acc.id = book.id;
      acc.title = book.title;
      acc.released = book.released;
      acc.authors = authArr;
      return arr.push(acc);
    }, {});
    res.json(arr);
  });
