const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    let payload = {
      status: false,
      data: {
        error: {
          code: 401,
          message: "Unauthenticated.",
        },
      },
    };
    return res.status(401).send(payload);
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch {
    let payload = {
      status: false,
      data: {
        error: {
          code: 422,
          message: "Invalid token.",
        },
      },
    };
    res.status(422).send(payload);
  }
};
