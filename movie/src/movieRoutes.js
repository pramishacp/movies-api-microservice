const express = require("express");
const router = express.Router();

const { Movie, validate } = require("./movieModel");
const movieService = require('./movieService')

router.get("/", async (req, res) => {
  const movies = await Movie.find().select("-__v").sort("name");

  res.send(movies);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const {title} = req.body;

  console.log('1...')

  const omdb = await movieService.findMovieByTitle(title);
  console.log('2...')
  if(omdb.Response === "False") return res.status(400).send("Movie not found.");

  const movie = await movieService.insertMovie(omdb);

  return res.status(200).send(movie);
});

module.exports = router;
