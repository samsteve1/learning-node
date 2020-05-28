require("express-async-errors");
const debug = require("debug")("vidly:startup");
const express = require("express");

const app = express();
require("./validation/validation")();
require("./routes/index")(app);
require("./config/app")();
require("./config/morgan")(app);

const port = process.env.PORT || 3000;

app.listen(port, () =>
  debug(`Node develoment server started at http://localhost:${port}`)
);
