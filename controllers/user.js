const { User, validate } = require("../models/user");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const store = async (req, res) => {
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
  if (user) {
    let payload = {
      status: false,
      data: {
        error: {
          code: 422,
          message: `User with the email - ${req.body.email} already exists.`,
        },
      },
    };
    return res.status(422).send(payload);
  }

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  let payload = {
    status: true,
    data: _.pick(user, ["name", "email"]),
  };
  const token = user.generateAuthToken();
  res.status(201).header("x-auth-token", token).send(payload);
};

exports.store = store;
