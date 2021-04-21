const router = require('express').Router();
const Plant = require('../models/plantsModel');

// Get All Plants
router.get('/', async (req, res, next) => {
  try {
    const plant = await Plant.findAll()
     res.json(plant)
  } catch (err) {
    next({apiCode: 500, apiMessage: 'Error Getting Plants', ...err })
  }
})

// Get Plant by ID
router.get('/:id', async (req, res, next) => {
  try {
    const plant = await Plant.findById(req.params.id)
     res.json(plant)
  } catch (err) {
    next({apiCode: 500, apiMessage: 'Error Getting Plant by ID', ...err })
  }
})

// Create Plant
router.post('/', async(req, res, next) => {
try {
  const plant = await Plant.add(req.body)
   res.status(201).json(plant)
} catch (err) {
      next({apiCode: 500, apiMessage: 'Error Creating Plant', ...err })
}
})

// Update Plant
router.put('/:id', async (req, res, next) => {
  try {
    const plant = await Plant.findById(req.params.id)
     res.json(plant)
  } catch (err) {
    next({apiCode: 500, apiMessage: 'Error Updating Plant', ...err })
  }
})

// Delete Plant
router.delete('/:id', async (req, res, next) => {
  try {
    const plant = await Plant.remove(req.params.id)
    res.json(plant)
  } catch (err) {
    next({apiCode: 500, apiMessage: 'Error Deleting Plant', ...err })
  }
})

module.exports = router