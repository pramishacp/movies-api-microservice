const {
  Movie
} = require("./movieModel");
const moment = require('moment')

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

  /**
   * Find all movies of user
   * @param {String} userId - user's userId
   */
   findAllByUserId: (userId) =>
      new Promise(async (resolve, reject) => {
          try {
              const resp = await Movie.find({userId: userId});
              return resolve(resp);
          } catch (err) {
              return reject(err);
          }
      }),

  /**
   * Find all movies of user by calender month
   * @param {String} userId - user's userId
   */
   findAllByUserIdByMonth: (userId) =>
      new Promise(async (resolve, reject) => {
          try {
              const resp = await Movie.find({
                  $expr: {
                      $and: [{
                              "$eq": [{
                                      "$month": "$createdAt"
                                  },
                                  moment().format('MM')
                              ]
                          },
                          {
                              "$eq": [{
                                      "$year": "$createdAt"
                                  },
                                  moment().format('YYYY')
                              ]
                          },
                          {
                              "$eq": ["$userId", userId]
                          }
                      ]
                  }
              })
              return resolve(resp);
          } catch (err) {
              return reject(err);
          }
      }),
};

module.exports = movieDal;