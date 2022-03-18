require('express-async-errors');
const express = require('express');

const router = express.Router();

const { validate } = require('./movieModel');
const movieService = require('./movieService');
const omdbService = require('../omdb/omdbService');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
    const movies = await movieService.findAllByUserId(req.user);
    return res.status(200).send(movies);
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const omdb = await omdbService.findMovieByTitle(req.body.title);
    if (omdb.Response === 'False') {
        return res.status(400).send('Movie not found..');
    }

    if (req.user.role === 'basic') {
        const { length } = await movieService.findAllByUserIdByMonth(req.user);
        if (length === 5) {
            return res.status(403).send('Basic user can only create 5 movies a month. Please upgrade to premium.');
        }
    }

    const movie = await movieService.insertMovie(omdb, req.user);
    return res.status(200).send(movie);
});

module.exports = router;
