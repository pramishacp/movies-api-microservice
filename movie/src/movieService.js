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

        const {
            userId
        } = user;

        const movie = new Movie({
            title: Title,
            released: Released,
            genre: Genre,
            director: Director,
            userId: userId
        })
        return MovieDAL.insertMovie(movie);
    },
    
    /**
       * Find all movies of the user
       * @param {Object} user - user information
    */
    findAllMoviesByUserId: (user) => {
        const {
            userId
        } = user;

        return MovieDAL.findAllMoviesByUserId(userId);
    },
};

module.exports = movieService;


