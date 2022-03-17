const Joi = require("joi");
const mongoose = require("mongoose");

const movieSchema =  new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  genre: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  released: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  director: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
});

function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().required(),
  });

  return schema.validate(movie);
}

module.exports.Movie = new mongoose.model('Movie', movieSchema);

module.exports.validate = validateMovie;
