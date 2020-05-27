require("express-async-errors");
const debug = require("debug")("vidly:startup");
const config = require("config");
const express = require("express");
const morgan = require("morgan");

const app = express();
require("./validation/validation")();
require("./routes/index")(app);
require("./config/app")();

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan running...");
}

const port = process.env.PORT || 3000;

app.listen(port, () =>
  debug(`Node develoment server started at http://localhost:${port}`)
);
