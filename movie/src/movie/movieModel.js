const Joi = require("joi");
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true
    },
    released: {
        type: String,
        required: true,
    },
    director: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const validateMovie = (movie) => {
    const schema = Joi.object({
        title: Joi.string().required(),
    });

    return schema.validate(movie);
}

module.exports.Movie = new mongoose.model('Movie', movieSchema);
module.exports.validate = validateMovie;