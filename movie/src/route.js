const express = require("express");
const router = express.Router();

const { Movie, validate } = require("./model");

router.get("/", async (req, res) => {
  const movies = await Movie.find().select("-__v").sort("name");

  res.send(movies);
});

module.exports = router;
