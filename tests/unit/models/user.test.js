const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const config = require("config");
const { User } = require("../../../models/user");

describe("Generate json web token", () => {
  it("should return valid token", () => {
    const user = new User({
      _id: mongoose.Types.ObjectId().toHexString(),
      roles: ["admin"],
      permissions: ["delete"],
    });
    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));

    expect(decoded._id == user._id).toBeTruthy()
  });
});
