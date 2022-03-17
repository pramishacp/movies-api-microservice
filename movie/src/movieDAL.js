const mongoose = require("mongoose");

const movieDal = {
  /**
   * Creates new movie
   * @param {Object} movie - movie information
   */
  insertMovie: (movie) =>
    new Promise(async (resolve, reject) => {
      try {
        const resp = await movie.save();
        return resolve(resp);
      } catch (err) {
        return reject(err);
      }
    }),
};

module.exports = movieDal;
