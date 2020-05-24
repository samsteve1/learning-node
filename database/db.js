const mongoose = require('mongoose')
const debug = require('debug')('vidly:database')

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => debug("Connection to mongoDb successful."))
  .catch(() => debug("Could not connect to MongoDb"));

module.exports = mongoose