const { Router } = require('express');
const Author = require('../models/Author');

module.exports = Router()
  .get('/', async (req, res) => {
    const authors = await Author.getAllIdAndNames();
    res.json(authors);
  })
  .get('/:id', async (req, res) => {
    const id = req.params.id;
    const author = await Author.getById(id);
    res.json(author);
  });
