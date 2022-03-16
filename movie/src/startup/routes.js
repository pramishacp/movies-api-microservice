const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const movies = require('../route');

module.exports = function (app) {
  app.use(express.json());
  app.use(cors());
  app.use(morgan("tiny"));
  app.use('/api/movies', movies);
};
