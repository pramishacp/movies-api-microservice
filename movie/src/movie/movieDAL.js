/* eslint-disable no-async-promise-executor */
const moment = require('moment');
const { Movie } = require('./movieModel');

const movieDal = {
    /**
     * Creates new movie
     * @param {Object} movie - movie information
     */
    insertMovie: (movie) => new Promise(async (resolve, reject) => {
        try {
            const resp = await movie.save();
            resolve(resp);
        } catch (err) {
            reject(err);
        }
    }),

    /**
     * Find all movies of user
     * @param {String} userId - user's userId
     */
    findAllByUserId: (userId) => new Promise(async (resolve, reject) => {
        try {
            const resp = await Movie.find({
                userId,
            });
            resolve(resp);
        } catch (err) {
            reject(err);
        }
    }),

    /**
     * Find all movies of user by calender month
     * @param {String} userId - user's userId
     */
    findAllByUserIdByMonth: (userId) => new Promise(async (resolve, reject) => {
        try {
            const resp = await Movie.find({
                $expr: {
                    $and: [{
                        $eq: [{
                            $month: '$createdAt',
                        },
                        moment().format('MM'),
                        ],
                    },
                    {
                        $eq: [{
                            $year: '$createdAt',
                        },
                        moment().format('YYYY'),
                        ],
                    },
                    {
                        $eq: ['$userId', userId],
                    },
                    ],
                },
            });
            resolve(resp);
        } catch (err) {
            reject(err);
        }
    }),
};

module.exports = movieDal;
