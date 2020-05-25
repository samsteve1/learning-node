const mongoose = require("mongoose");
let Joi = require("@hapi/joi");
const {genereSchema} = require('./genere')

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  numberInstock: {
    type: Number,
    default: 0,
    required: true
  },
  dailyRentalrate: {
    type: Number,
    default: 0,
    required: true
  },
  genere: {
    type: genereSchema,
    required: true
  }
});

const Movie = mongoose.model('Movie', movieSchema)

function validate(movie) {
  const schem = Joi.object({
    title: Joi.string().required(),
    numberInstock: Joi.number(),
    dailyRentalrate: Joi.number(),
    genere_id: Joi.string().required()
  });
  return schem.validate(movie)
}
exports.validate = validate;
exports.Movie = Movie;
