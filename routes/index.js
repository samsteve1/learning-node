const error = require("../middleware/error");
const express = require("express");
const generes = require("./generes");
const customers = require("./customers");
const movies = require("./movies");
const rentals = require("./rentals");
const users = require("./users");
const auth = require("./auth");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/generes", generes);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
