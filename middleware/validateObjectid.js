const mongoose = require("mongoose");

module.exports = function (req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    let payload = {
      status: false,
      data: {
        error: {
          code: 404,
          message: "Invalid ID",
        },
      },
    };
    return res.status(404).send(payload);
  }
  next();
};
