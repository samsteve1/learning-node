const { User } = require("../../../models/user");
const mongoose = require("mongoose");
const auth = require("../../../middleware/auth");

describe("Auth middleware", () => {
  it("should populate req.user with the payload of a valid JWT", () => {
    const user = new User({
      _id: mongoose.Types.ObjectId().toHexString(),
      roles: ["admin"],
      permissions: ["delete"],
    });
    const token = user.generateAuthToken();

    const req = {
      header: jest.fn().mockReturnValue(token),
    };
    const res = {};
    const next = jest.fn();
    auth(req, res, next);
    expect(req.user.roles[0] === user.roles[0]).toBeTruthy();
    expect(req.user.permissions[0] === user.permissions[0]).toBeTruthy();
    expect(req.user._id == user._id).toBeTruthy();
  });
});
