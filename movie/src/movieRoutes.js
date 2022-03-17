const express = require("express");
const router = express.Router();

const { Movie, validate } = require("./movieModel");
const movieService = require('./movieService');
const omdbService = require('./omdb/omdbService');

const auth = require('../middleware/auth')

router.get("/", async (req, res) => {
  const movies = await Movie.find().select("-__v").sort("name");

  res.send(movies);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const omdb = await omdbService.findMovieByTitle(req.body.title);
  if(omdb.Response === "False") return res.status(400).send("Movie not found.");

  const movie = await movieService.insertMovie(omdb, req.user);

  return res.status(200).send(movie);
});

module.exports = router;
