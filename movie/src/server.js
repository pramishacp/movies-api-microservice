require('dotenv').config();
const express = require('express');

const app = express();

require('./startup/routes')(app);
require('./startup/db')();

const {
    NODE_DOCKER_PORT,
    NODE_DOCKER_PORT_TEST,
    NODE_ENV
} = process.env;

const PORT = (NODE_ENV === 'test') ? NODE_DOCKER_PORT_TEST : NODE_DOCKER_PORT;

/* eslint-disable no-console */
const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

module.exports = server;