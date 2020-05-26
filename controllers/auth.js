let Joi = require("@hapi/joi");
const config = require('config')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");

const login = async (req, res) => {
  let { error } = validate(req.body);
  if (error) {
    let payload = {
      status: false,
      data: {
        error: {
          code: 422,
          message: error.details[0].message,
        },
      },
    };
    return res.status(422).send(payload);
  }
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    let payload = {
      status: false,
      data: {
        error: {
          code: 422,
          message: `Could not sign you in with those details.`,
        },
      },
    };
    return res.status(422).send(payload);
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    let payload = {
      status: false,
      data: {
        error: {
          code: 422,
          message: `Could not sign you in with those details.`,
        },
      },
    };
    return res.status(422).send(payload);
  }
  const token = jwt.sign({_id: user.id}, config.get('jwtPrivateKey'));
  let payload = {
      status:true,
      data: {
          token: token
      }
  }
  res.send(payload);
};
function validate(user) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return schema.validate(user);
}

exports.login = login;
