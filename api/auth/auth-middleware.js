const {jwtSecret} = require('../secrets');
const jwt = require('jsonwebtoken');
const Users = require('../models/usersModel');

const restricted = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (token) {
            jwt.verify(token, jwtSecret, (err, decodedToken) => {
                if (err) {
                    res.status(401).json({message: "Token invalid"});
                } else {
                    req.decodedToken = decodedToken;
                    next();
                }
            })
        } else {
            res.status(401).json({message: "Token required"});
        }
    } catch (err) {
        next({apiCode: 500, apiMessage: 'Error verifying token', ...err})
    }

  
}

module.exports = {
    restricted
}