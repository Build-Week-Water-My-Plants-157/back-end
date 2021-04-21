const router = require('express').Router();
const Users = require('../models/usersModel');

// Get all users
router.get('/', async (req, res, next) => {
    try {
        const users = await Users.findAll();
        res.status(200).json(users);
    } catch (err) {
        console.log(err)
        next({apiCode: 500, apiMessage: 'error getting users', ...err });
    }
})


// Get user by ID
router.get('/:id', async (req, res, next) => {
    if(!req.params.id) {
        next({apiCode: 404, apiMessage: "User Not Found."})
    }
    try {

        const user = await Users.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        console.log(err)
        next({apiCode: 500, apiMessage: 'Error retrieving user.', ...err });
    }
})


// Create User
router.post('/', async (req, res, next) => {
    try {
        const user = await Users.add(req.body)
        res.json(user)
    } catch (err) {
        next({apiCode: 500, apiMessage: 'Error Creating User.', ...err})
    }
})

// Delete User
router.delete('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id)
   if(!id) {
        next({apiCode: 404, apiMessage: "User Not Found."})
    }
    try {
        const user = await Users.remove(id)
        res.json(user)

    } catch (err) {
next({apiCode: 500, apiMessage: 'Error Deleting User.', ...err})}
})

// Update User
router.put('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id)
    try {
        const user = await Users.update(id)
        res.json(user)
    } catch (err) {
    next({apiCode: 500, apiMessage: 'Error Updating User.', ...err})}

})

module.exports = router;