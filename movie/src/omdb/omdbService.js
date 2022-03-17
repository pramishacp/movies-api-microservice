const OmdbDAL = require("./omdbDAL");

const omdbService = {
    /**
     * Find Movie By Title
     * @param {String} title - movie title
     */
    findMovieByTitle: (title) => OmdbDAL.findMovieByTitle(title),
};

module.exports = omdbService;