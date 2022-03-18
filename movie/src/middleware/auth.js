require('dotenv').config();

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authorization = req.header('Authorization');
    if (!authorization) return res.status(401).send('Access denied. No token provided.');

    try {
        const bearerToken = authorization.split(' ');
        if (bearerToken[0] !== 'Bearer') {
            return res.status(400).send('Invalid token.');
        }
        
        const token = bearerToken[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        return next();
    } catch (ex) {
        return res.status(400).send('Invalid token.');
    }
};