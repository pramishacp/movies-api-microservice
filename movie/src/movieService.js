const MovieDAL = require("./movieDAL");
const { Movie } = require('./movieModel');

const mongoose = require('mongoose')

const movieService = {
    /**
      * Find Movie By Title
      * @param {String} title - movie title
    */
    findMovieByTitle: (title) => MovieDAL.findMovieByTitle(title),

    /**
       * Create movie
       * @param {Object} body - movie information
    */
     insertMovie: (body) => {
        const {
            Title,
            Released,
            Genre,
            Director
        } = body;
        const movie = new Movie({
            title: Title,
            released: Released,
            genre: Genre,
            director: Director
        })
        return MovieDAL.insertMovie(movie);
    },
};

module.exports = movieService;


