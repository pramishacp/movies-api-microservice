require("dotenv").config();
const axios = require("axios");

const baseURL = process.env.OMDB_API_URL;
const apiKey = process.env.OMDB_API_KEY;

const omdbDAL = {
    /**
     * Find Movie By Title
     * @param {String} title - movie title
     */
    findMovieByTitle: (title) =>
        new Promise(async (resolve, reject) => {
            try {
                const resp = await axios.get(`${baseURL}`, {
                    params: {
                        t: title,
                        apikey: apiKey,
                    },
                });
                return resolve(resp.data);
            } catch (err) {
                return reject(err);
            }
        }),
};

module.exports = omdbDAL;