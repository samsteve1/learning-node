const request = require("supertest");
const { User } = require("../../models/user");
const { Genere } = require("../../models/genere");
describe("Auth middlware", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(async () => {
    await Genere.remove({});
    server.close();
  });

  let token;
  const exec = () => {
    return request(server)
      .post("/api/generes")
      .set("x-auth-token", token)
      .send({ name: "romance" });
  };

  beforeEach(() => {
    token = new User().generateAuthToken();
  });

  it("should return 401 if no token is provided", async () => {
    token = "";
    const res = await exec();
    expect(res.status).toBe(401);
  });
  it("should return 422 if invalid token is sent", async () => {
    token = "abc";
    const res = await exec();
    expect(res.status).toBe(422);
  });

  it("should return 200 if a valid token is sent", async () => {
    const res = await exec();

    expect(res.status).toBe(201);
  });
});
