let Joi = require("@hapi/joi");
const mongoose = require('mongoose')

const genereSchema = new mongoose.Schema({
  name: { type: String, required: true },
});
const Genere = mongoose.model("Genere", genereSchema);

function validate(genere) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
  });
  return schema.validate(genere);
}

exports.validate = validate;
exports.Genere = Genere;
exports.genereSchema = genereSchema
