require('winston-mongodb')
const winston = require('winston')

process.on('unhandledRejection', (ex) => {
    throw ex
});

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: {service: 'user-service'},
    transports: [
      new winston.transports.File({filename: 'logs/error.log', level: 'error'}),
      new winston.transports.File({filename: 'logs/combined.log'}),
      new winston.transports.MongoDB({db: 'mongodb://localhost/vidly'}),
      new winston.transports.Console({colorize: true, prettyPrint: true})
    ]
  })

  logger.exceptions.handle(
      new winston.transports.File({filename: 'logs/exceptions.log'})
  )
module.exports = function (err, req, res, next) {
    logger.error(err.message, err)
    let payload = {
        status: false,
        data: {
            error:{
                code: 500,
                message: "Something went wrong."
            }
        }
    }
    res.status(500).send(payload)
} 