const startUpDebugger = require("debug")("vidly:startup");
const dbDebugger = require("debug")("vidly:db");
const config = require("config");
const express = require("express");
const morgan = require("morgan");
const Joi = require("@hapi/joi");
const genre = require("./controllers/genre");

const app = express();

app.use(express.json());

//console.log('Application name: ' + config.get('name'))
// console.log(config.get('db_name'))

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startUpDebugger("Morgan running...");
}
dbDebugger('connecting to database...');
app.get("/api/generes", genre.index);
app.get("/api/generes/:id", genre.show);
app.post("/api/generes", genre.store);
app.put("/api/generes/:id", genre.update);
app.delete("/api/generes/:id", genre.destory);

const port = process.env.PORT || 3000;

app.listen(port, () =>
  startUpDebugger(`Node develoment server started at http://localhost:${port}`)
);
