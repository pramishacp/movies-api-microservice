/* eslint-disable no-console */
require('dotenv').config();
const mongoose = require('mongoose');

module.exports = () => {
    const {
        DB_USER,
        DB_PASSWORD,
        DB_HOST,
        DB_PORT,
        DB_NAME,
        DB_NAME_TEST,
        NODE_ENV,
    } = process.env;

    const options = {
        useNewUrlParser: true,
    };

    const DB = (NODE_ENV === 'test') ? DB_NAME_TEST : DB_NAME;

    const url = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB}?authSource=admin`;

    mongoose
        .connect(url, options)
        .then(() => console.log(`Connected to... ${url}`))
        .catch((err) => console.log(err));
};
