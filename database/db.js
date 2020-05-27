const mongoose = require('mongoose')
const winston = require('winston')

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: {service: 'user-service'},
  transports: [
    new winston.transports.File({filename: 'logs/database.log', level: 'info'}),
    new winston.transports.File({filename: 'logs/database.log', level: 'error'}),
    new winston.transports.Console({colorize: true, prettyPrint: true})
  ]
})

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => logger.info('Connected to database'))
  .catch(() => logger.error("Could not connect to MongoDb"));
module.exports = mongoose