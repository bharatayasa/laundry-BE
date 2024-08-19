const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const AccesToken = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
dotenv.config();

const secretKey = process.env.JWT_SECRET;

function verifyAccessToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ status: 'error', message: 'Access denied' });
        }
        req.user = user;
        next();
    });
}

module.exports = verifyAccessToken;