const router = require('express').Router();
const Users = require('../models/usersModel');

router.get('/', async (req, res, next) => {
    try {
        const users = await Users.findAll();
        res.status(200).json(users);
    } catch (err) {
        console.log(err)
        next({apiCode: 500, apiMessage: 'error getting users', ...err });
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const user = await Users.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        console.log(err)
        next({apiCode: 500, apiMessage: 'error getting user by id', ...err });
    }
})

module.exports = router;