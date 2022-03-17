const request = require("supertest");

const { Movie } = require("./movieModel");
const authService = require('./auth/authService');

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
    let token; 
    let username;
    let password;

    const exec = async () => await request(server).post("/api/movies").set('x-auth-token', token).send({ title });

    beforeEach(async () => {
      title = "Harry Potter";
      username = 'basic-thomas';
      password = 'sR-_pcoow-27-6PAwCD8';

      const auth =   await authService.getAuthToken({username: username, password: password})
      token = auth.token;
    });

    afterEach(async () => {
      await Movie.remove({});
    });

    it('should return 401 if no token provided', async () => {
      token = ''; 

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return 200 if title is not a string', async () => {
      title = 1

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 200 if a premium user try to create more than 5 books per calendar month', async () => {
      username = 'premium-jim';
      password = 'GBLtTyq3E_UNjFnpo9m6';

      const auth =  await authService.getAuthToken({username: username, password: password})
      token = auth.token;

      await exec();
      await exec();
      await exec(); 
      await exec();
      await exec();

      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("userId");
      expect(res.body).toHaveProperty("title");
      expect(res.body.title).toMatch(/(Harry Potter)/i);
      expect(res.body).toHaveProperty("genre");
      expect(res.body).toHaveProperty("released");
      expect(res.body).toHaveProperty("director");

      const { length } = await Movie.find({});
      expect(length).toBe(6);
    });

    it('should return 403 if a basic user try to create more than 5 books per calendar month', async () => {
      await exec();
      await exec();
      await exec(); 
      await exec();
      await exec();

      const res = await exec();
      expect(res.status).toBe(403);

      const { length } = await Movie.find({});
      expect(length).toBe(5);
    });

    it("should return 200 if it is valid", async () => {
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("userId");
      expect(res.body).toHaveProperty("title");
      expect(res.body.title).toMatch(/(Harry Potter)/i);
      expect(res.body).toHaveProperty("genre");
      expect(res.body).toHaveProperty("released");
      expect(res.body).toHaveProperty("director");

      const { length } = await Movie.find({});
      expect(length).toBe(1);

      const movie = await Movie.find({ "title": { "$regex": "Harry Potter", "$options": "i" } });
      expect(movie).not.toBeNull();
    });
  });
});
