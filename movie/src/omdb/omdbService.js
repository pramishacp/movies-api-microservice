const OmdbDAL = require('./omdbDAL');

const omdbService = {
    /**
     * Find movie by title
     * @param {String} title - movie title
     */
    findMovieByTitle: (title) => OmdbDAL.findMovieByTitle(title),
};

module.exports = omdbService;
