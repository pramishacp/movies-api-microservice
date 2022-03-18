require('dotenv').config();

const request = require('supertest');
const axios = require('axios');

const User = require('./test_helper');
const { Movie } = require('../movie/movieModel');

const baseURL = process.env.AUTH_URL;
let server;

describe('/api/movies', () => {
    beforeEach(() => {
        /* eslint-disable global-require */
        server = require('../server');
    });

    afterEach(async () => {
        await server.close();
    });

    describe('GET /', () => {
        let token;

        /* eslint-disable no-return-await */
        const exec = async () => await request(server).get('/api/movies').set('Authorization', `Bearer ${token}`);

        beforeEach(async () => {
            const {
                username,
                password,
            } = User.basicUser;

            const auth = await axios.post(`${baseURL}/auth`, {
                username,
                password,
            });
            token = auth.data.token;
        });

        afterEach(async () => {
            await Movie.remove({});
        });

        it('should return 200 if user is authenticated', async () => {
            const movies = [{
                    title: 'movie1',
                    userId: 123,
                },
                {
                    title: 'movie2',
                    userId: 123,
                },
            ];

            await Movie.collection.insertMany(movies);

            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveLength(2);
            expect(res.body.some((g) => g.title === 'movie1')).toBeTruthy();
            expect(res.body.some((g) => g.title === 'movie2')).toBeTruthy();
        });
    });

    describe('POST /', () => {
        let title;
        let token;
        let tokenType;
        let username;
        let password;

        const exec = async () => await request(server)
            .post('/api/movies')
            .set('Authorization', `${tokenType} ${token}`)
            .send({
                title,
            });

        beforeEach(async () => {
            title = 'movie1';
            username = User.basicUser.username;
            password = User.basicUser.password;

            const auth = await axios.post(`${baseURL}/auth`, {
                username,
                password,
            });
            tokenType = 'Bearer';
            token = auth.data.token;
        });

        afterEach(async () => {
            await Movie.remove({});
        });

        it('should return 401 if no token is provided', async () => {
            token = '';
            tokenType = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return 400 if token is invalid', async () => {
            token = 'a';

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 200 if title is not a string', async () => {
            title = 1;

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if title not found in omdb', async () => {
            title = 'title1';

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 200 if a premium user try to create more than 5 books per calendar month', async () => {
            username = User.premiumUser.username;
            password = User.premiumUser.password;
            const auth = await axios.post(`${baseURL}/auth`, {
                username,
                password,
            });
            token = auth.data.token;

            await exec();
            await exec();
            await exec();
            await exec();
            await exec();

            const res = await exec();
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('userId');
            expect(res.body).toHaveProperty('title');
            expect(res.body.title).toMatch(/(movie1)/i);
            expect(res.body).toHaveProperty('genre');
            expect(res.body).toHaveProperty('released');
            expect(res.body).toHaveProperty('director');

            const {
                length
            } = await Movie.find({});
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

            const {
                length
            } = await Movie.find({});
            expect(length).toBe(5);
        });

        it('should return 200 if it is valid', async () => {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('userId');
            expect(res.body).toHaveProperty('title');
            expect(res.body.title).toMatch(/(movie1)/i);
            expect(res.body).toHaveProperty('genre');
            expect(res.body).toHaveProperty('released');
            expect(res.body).toHaveProperty('director');

            const {
                length
            } = await Movie.find({});
            expect(length).toBe(1);

            const movie = await Movie.find({
                title: {
                    $regex: 'movie1',
                    $options: 'i',
                },
            });
            expect(movie).not.toBeNull();
        });
    });
});