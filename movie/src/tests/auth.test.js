require('dotenv').config();

const request = require('supertest');
const axios = require('axios');

const User = require('./test_helper');

const baseURL = process.env.AUTH_URL;
let server;

describe('auth middleware', () => {
    /* eslint-disable global-require */
    beforeEach(() => { server = require('../server'); });
    afterEach(async () => {
        await server.close();
    });

    let token;
    let tokenType;

    const exec = () => request(server)
        .get('/api/movies')
        .set('Authorization', `${tokenType} ${token}`);

    beforeEach(async () => {
        const { username } = User.basicUser;
        const { password } = User.basicUser;
        const auth = await axios.post(`${baseURL}/auth`, {
            username,
            password,
        });
        tokenType = 'Bearer';
        token = auth.data.token;
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

    it('should return 200 if token is valid', async () => {
        const res = await exec();

        expect(res.status).toBe(200);
    });
});
