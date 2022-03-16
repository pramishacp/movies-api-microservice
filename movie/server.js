require("dotenv").config();

const express = require('express');
const app = express();

require("./src/startup/routes")(app);
require("./src/startup/db")();

const PORT = process.env.NODE_DOCKER_PORT || 4000;

const server = app.listen(PORT, () =>console.log(`Listening on port ${PORT}...`));

module.exports = server;

