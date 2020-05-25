let Joi = require("@hapi/joi");
const mongoose = require("../database/db");

const customerSchema = new  mongoose.Schema({
    name: {type: String, required: true, min: 3},
    phone: {type: String, required: true, min: 11},
    isGold: {type: Boolean, default: false}
})

const Customer = mongoose.model('Customer', customerSchema);

function validate(customer) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        phone: Joi.string().length(11).required(),
        isGold: Joi.boolean()
    })

    return schema.validate(customer)
}

exports.validate = validate;
exports.Customer = Customer