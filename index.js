const debug = require("debug")("vidly:startup");
const config = require("config");
const express = require("express");
const morgan = require("morgan");
const Joi = require("@hapi/joi");
const generes = require("./routes/generes");
const customers = require("./routes/customers");

const app = express();

app.use(express.json());
app.use("/api/generes", generes);
app.use("/api/customers", customers);

debug("Application name: " + config.get("name"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan running...");
}

const port = process.env.PORT || 3000;

app.listen(port, () =>
  debug(`Node develoment server started at http://localhost:${port}`)
);
