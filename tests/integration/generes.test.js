const request = require("supertest");
const { Genere } = require("../../models/genere");
const mongoose = require("mongoose");
const { User } = require("../../models/user");

let server;

describe("/api/generes", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(async () => {
    server.close();
    await Genere.remove({});
  });

  describe("GET /", () => {
    it("should return all generes", async () => {
      await Genere.collection.insertMany([
        { name: "action" },
        { name: "horror" },
        { name: "comic" },
      ]);

      const res = await request(server).get("/api/generes");

      expect(res.status).toBe(200);
      expect(res.body.status).toBeTruthy();
      expect(res.body.data.length).toBe(3);
      expect(res.body.data.some((g) => g.name === "action")).toBeTruthy();
    });
  });

  describe("GET /:id", () => {
    it("should return 404 if genere is not found", async () => {
      let res = await request(server).get(
        `api/generes/${mongoose.Types.ObjectId}`
      );

      expect(res.status).toBe(404);
      expect(res.body.status).toBeFalsy();
    });

    it("should return a genere if valid ID is sent", async () => {
      let genere = {
        _id: mongoose.Types.ObjectId(),
        name: "action",
      };

      await Genere.collection.insert(genere);

      let res = await request(server).get(`/api/generes/${genere._id}`);

      expect(res.status).toBe(200);
      expect(res.body.status).toBeTruthy();
      expect(res.body.data).toMatchObject({
        _id: genere._id.toHexString(),
        name: genere.name,
      });
      expect(res.body.data).toHaveProperty("name", genere.name);
    });
  });

  describe("POST /", () => {
    let token;
    let name;
    const exec = async () => {
      return request(server)
        .post("/api/generes")
        .set("x-auth-token", token)
        .send({ name: name });
    };

    beforeEach(() => {
      token = new User().generateAuthToken();
      name = "romance";
    });
    it("should return 401 error is user is not authenticated", async () => {
      token = "";
      let res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return 422 if genere is not sent", async () => {
      name = "";
      let res = await exec();
      expect(res.status).toBe(422);
    });

    it("should return 422 if generes name is less than 3", async () => {
      name = "12";
      let res = await exec();
      expect(res.status).toBe(422);
    });
    it("should return 422 if generes name is greater  than 20", async () => {
      name = new Array(22).join("a");
      let res = await exec();
      expect(res.status).toBe(422);
    });
    it("should save genere to the database", async () => {
      let res = await exec();

      const genere = await Genere.findOne({ name: name });
      expect(genere).toHaveProperty("_id");
      expect(genere).toHaveProperty("name");
    });
    it("should return saved genere", async () => {
      let res = await exec();

      expect(res.status).toBe(201);
      expect(res.body.data).toHaveProperty("_id");
      expect(res.body.data).toHaveProperty("name");
    });
  });

  describe("PUT /:id", () => {
    let token;
    let name;
    const genere = new Genere({
      _id: mongoose.Types.ObjectId().toHexString(),
      name: "Romance",
    });
    const exec = async () => {
      return request(server)
        .put(`/api/generes/${genere._id}`)
        .set("x-auth-token", token)
        .send({ name: name });
    };

    beforeEach(async () => {
      await Genere.collection.insert(genere);
      token = new User().generateAuthToken();
    });
    afterEach(async () => {
      await Genere.remove({});
    });

    it("should return 401 if token is not sent", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return 422 if name is invalid", async () => {
      name = "12";
      const res = await exec();
      expect(res.status).toBe(422);
    });

    it("should update genere name if valid name is sent", async () => {
      name = "name updated";
      const res = await exec();
      expect(res.status).toBe(200);
    });
    it("should return updated genere after update", async () => {
      name = "name updated";
      await exec();
      const res = await request(server).get(`/api/generes/${genere._id}`);
      expect(res.status).toBe(200);
      expect(res.body.data.name).toMatch(name);
    });
  });

  describe("DELETE /:id", () => {
    let token;
    let genere = new Genere({
      _id: mongoose.Types.ObjectId().toHexString(),
      name: "Romance",
    });
    const exec = async () => {
      return request(server)
        .delete(`/api/generes/${genere._id}`)
        .set("x-auth-token", token);
    };

    beforeEach(async () => {
      await Genere.collection.insert(genere);
      token = new User().generateAuthToken();
    });
    afterEach(async () => {
      await Genere.remove({});
    });
    it("should return 401 if token is not set", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });
    it("should return 404 if genere doesnt exists", async () => {
      genere._id = mongoose.Types.ObjectId().toHexString();
      const res = await exec();
      expect(res.status).toBe(404);
    });
    it("should delete genere if ID sent is valid", async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body.status).toBeTruthy();
    });
  });
});
