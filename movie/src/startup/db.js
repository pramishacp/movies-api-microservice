require("dotenv").config();
const mongoose = require("mongoose");

module.exports = () => {
    const {
        DB_USER,
        DB_PASSWORD,
        DB_HOST,
        DB_PORT,
        DB_NAME
    } = process.env;

    const options = {
        useNewUrlParser: true,
    };

    const url = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;

    mongoose
        .connect(url, options)
        .then(() => console.log(`Connected to... ${url}`))
        .catch((err) => console.log(err));
};