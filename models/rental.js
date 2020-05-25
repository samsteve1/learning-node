let Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const rentalSchema = new mongoose.Schema({
  customer: new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    isGold: {
      type: Boolean,
      default: false,
    },
  }),
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
      },
      dailyRentalrate: {
        type: Number,
        required: true,
      },
      dateOut: {
        type: Date,
        default: Date.now,
      },
      dateReturned: {
        type: Date,
      },
      rentalFee: {
        type: Number,
        required: true,
      },
    }),
  },
});
const Rental = mongoose.model("Rental", rentalSchema);

function validate(rental) {
  let schema = Joi.object({
    customer_id: Joi.string().required(),
    movie_id: Joi.string().required(),
  });

  return schema.validate(rental);
}

exports.Rental = Rental;
exports.validate = validate;
exports.mongoose = mongoose;
