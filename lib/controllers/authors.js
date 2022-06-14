const { Router } = require('express');
const Author = require('../models/Author');

module.exports = Router().get('/', async (req, res) => {
  const authors = await Author.getAll();
  const authorsWithoutTimes = authors.map(({ id, name, dob, pob }) => {
    return { id, name, dob: dob.slice(10, 23), pob };
  });
  res.json(authorsWithoutTimes);
});
