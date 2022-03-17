require("dotenv").config();

const http = require("../httpService.js");

const baseURL = process.env.AUTH_URL;

const authDAL = {
    /**
     * Get auth token
     * @param {String} username - user's username
     * @param {String} password - user's password
     */
     getAuthToken: (username, password) =>
        new Promise(async (resolve, reject) => {
            try {
                const resp = await http.post(`${baseURL}/auth`, {
                    username,
                    password,
                });
                return resolve(resp.data);
            } catch (err) {
                console.log(err)
                return reject(err);
            }
        }),
};

module.exports = authDAL;