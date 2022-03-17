const MovieDAL = require("./movieDAL");
const { Movie } = require('./movieModel');

const mongoose = require('mongoose')

const movieService = {
    /**
       * Create movie
       * @param {Object} body - movie information
    */
     insertMovie: (body, user) => {
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
            director: Director,
            userId: user.userId
        })
        return MovieDAL.insertMovie(movie);
    },
};

module.exports = movieService;


