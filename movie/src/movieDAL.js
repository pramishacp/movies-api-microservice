const mongoose = require("mongoose");

const httpService = require("./httpService");

const movieDal = {
  /**
   * Find Movie By Title
   * @param {String} title - movie title
   */
  findMovieByTitle: (title) =>
    new Promise(async (resolve, reject) => {
      try {
        const resp = await httpService.get(`/`, {
          params: {
            t: title,
          },
        });
        return resolve(resp.data);
      } catch (err) {
        return reject(err);
      }
    }),

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
