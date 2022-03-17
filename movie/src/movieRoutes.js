const express = require("express");
const router = express.Router();

const {
    Movie,
    validate
} = require("./movieModel");
const movieService = require("./movieService");
const omdbService = require("./omdb/omdbService");

const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
    const movies = await Movie.find().select("-__v").sort("name");

    res.send(movies);
});

router.post("/", auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) { return res.status(400).send(error.details[0].message) };

    const omdb = await omdbService.findMovieByTitle(req.body.title);
    if (omdb.Response === "False") { return res.status(400).send("Movie not found.") };

    if (req.user.role === "basic") {
        const { length } = await movieService.findAllMoviesByUserId(req.user);
        if (length === 5) return res.status(403).send("You have already created the 5 movies this month.");
    }

    const movie = await movieService.insertMovie(omdb, req.user);

    return res.status(200).send(movie);
});

module.exports = router;