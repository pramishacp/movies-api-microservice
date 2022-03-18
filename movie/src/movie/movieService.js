const MovieDAL = require('./movieDAL');
const { Movie } = require('./movieModel');

const movieService = {
    /**
     * Create movie
     * @param {Object} body - movie information
     * @param {Object} user - user information
     */
    insertMovie: (body, user) => {
        const {
            Title,
            Released,
            Genre,
            Director,
        } = body;

        const {
            userId,
        } = user;

        const movie = new Movie({
            title: Title,
            released: Released,
            genre: Genre,
            director: Director,
            userId,
        });
        return MovieDAL.insertMovie(movie);
    },

    /**
     * Find all movies of the user
     * @param {Object} user - user information
     */
    findAllByUserId: (user) => {
        const {
            userId,
        } = user;

        return MovieDAL.findAllByUserId(userId);
    },

    /**
     * Find all movies of user by calender month
     * @param {Object} user - user information
     */
    findAllByUserIdByMonth: (user) => {
        const {
            userId,
        } = user;

        return MovieDAL.findAllByUserIdByMonth(userId);
    },
};

module.exports = movieService;
