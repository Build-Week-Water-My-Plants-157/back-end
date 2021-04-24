const {jwtSecret} = require('../secrets');
const jwt = require('jsonwebtoken');
const Users = require('../models/usersModel');
const db = require('../../data/dbConfig')

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

async function checkUsernameForFree(req, res, next) {
    try {
      const username = req.body.username;
      const user = await db.select("username").from('users').where({username})
      if (user.length >= 1) {
        res.status(422).json({message: "Username taken"})
      } else {
        next();
      }
    } catch (err) {
      next({apiCode: 500, apiMessage: 'Error checking if username exists', ...err })
    // next(err)
    }
  }

  async function checkUsernameExists(req, res, next) {
    try {
      const username = req.body.username;
      const user = await db.select("username").from('users').where({username})
      if (user.length === 0) {
        res.status(401).json({message: "Username does not have an account"})
      } else {
        next();
      }
    } catch (err) {
      next({apiCode: 500, apiMessage: 'Error checking if username not exist', ...err });
      }
    }

    function requirePassword(req, res, next) {
        const { password } = req.body;
        if (!password) {
            res.status(401).json({message: "Password is required"})
        } else {
            next()
        }
    }

module.exports = {
    restricted,
    checkUsernameForFree,
    checkUsernameExists,
    requirePassword
}