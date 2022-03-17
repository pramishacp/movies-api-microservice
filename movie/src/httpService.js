require("dotenv").config();

const axios = require("axios");

axios.defaults.baseURL = process.env.OMDB_API_URL;
axios.defaults.params = {};
axios.defaults.params["apikey"] = process.env.OMDB_API_KEY;

module.exports = {
  get: axios.get,
};
