const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');

const movieRoutes = require('../movie/movieRoutes');
const { swaggerDocument } = require('../../swaggerDocument');
const error = require('../middleware/error');

module.exports = (app) => {
    app.use(express.json());
    app.use(cors());
    app.use(morgan('tiny'));
    app.use('/api/movies', movieRoutes);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use(error);
};
