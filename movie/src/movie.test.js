const request = require("supertest");

const { Movie } = require("./movieModel");

let server;

describe("/api/movies", () => {
  beforeEach(() => {
    server = require("../server");
  });
  afterEach(() => {
    server.close();
  });

  describe("POST /", () => {
    let title;

    const exec = async () =>
      await request(server).post("/api/movies").send({ title});

    beforeEach(async () => {
      title = "Harry Potter";
    });

    afterEach(async () => {
      await Movie.remove({});
    });

    it("should return 200 if it is valid", async () => {
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("title");
      expect(res.body.title).toMatch(/(Harry Potter)/i);
      expect(res.body).toHaveProperty("genre");
      expect(res.body).toHaveProperty("released");
      expect(res.body).toHaveProperty("director");

      const { length } = await Movie.find({});
      expect(length).toBe(1);
    });
  });
});
