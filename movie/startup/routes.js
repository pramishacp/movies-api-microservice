const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { movieRoutes } = require('../src/index');

module.exports = function (app) {
  app.use(express.json());
  app.use(cors());
  app.use(morgan("tiny"));
  app.use('/api/movies', movieRoutes);
};
