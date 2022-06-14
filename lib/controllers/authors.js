const { Router } = require('express');
const Author = require('../models/Author');

module.exports = Router().get('/', async (req, res) => {
  const authors = await Author.getAllIdAndNames();
  res.json(authors);
});
