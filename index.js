require('express-async-errors')
const error = require('./middleware/error')
let Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const debug = require("debug")("vidly:startup");
const config = require("config");
const express = require("express");
const morgan = require("morgan");
const generes = require("./routes/generes");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");

const app = express();

if(!config.get('jwtPrivateKey')) {
  debug('FATAL: jwt private key not defined.')
  process.exit(1)
}
app.use(express.json());
app.use("/api/generes", generes);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use(error);

debug("Application name: " + config.get("name"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan running...");
}

const port = process.env.PORT || 3000;

app.listen(port, () =>
  debug(`Node develoment server started at http://localhost:${port}`)
);
