const mongoose = require("mongoose");
const winston = require("winston");
const config = require("config");
const debug = require("debug")("vidly:db");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({
      filename: "logs/database.log",
      level: "info",
    }),
    new winston.transports.File({
      filename: "logs/database.log",
      level: "error",
    }),
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
  ],
});

module.exports = function () {
  mongoose
    .connect(config.get("db"))
    .then(() => {
      logger.info("Connected to database");
      debug(`Connected to ${config.get("db")}`);
    })
    .catch(() => logger.error("Could not connect to MongoDb"));
};
