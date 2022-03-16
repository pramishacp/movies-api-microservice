const Joi = require('joi');
const mongoose = require('mongoose');

const Movie = mongoose.model('Movie', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, 
    minlength: 3,
    maxlength: 50
  },
  genre: { 
    type: String,
    required: true,
    trim: true, 
    minlength: 3,
    maxlength: 50
  },
  released: { 
    type: String,
    required: true,
    trim: true, 
    minlength: 3,
    maxlength: 50
  },
  director: { 
    type: String,
    required: true,
    trim: true, 
    minlength: 3,
    maxlength: 50
  }
}));

function validateMovie(movie) {
  const schema = {
    title: Joi.string().min(3).max(50).required(),
    genre: Joi.string().min(3).max(50).required(),
    released: Joi.string().min(3).max(50).required(),
    director: Joi.string().min(3).max(50).required(),
  };

  return Joi.validate(movie, schema);
}

module.exports.Movie = Movie; 
module.exports.validate = validateMovie;