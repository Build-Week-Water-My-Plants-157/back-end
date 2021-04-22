const router = require('express').Router();
const Plant = require('../models/plantsModel');
// const {findPlant} = require('../findMiddleware')
// Get All Plants
router.get('/', async (req, res, next) => {
  try {
    const plant = await Plant.findAll()
     res.json(plant)
  } catch (err) {
    // next({apiCode: 500, apiMessage: 'Error Getting Plants', ...err })
    next(err)
  }
})

// Get Plant by ID
router.get('/:id',  async (req, res, next) => {
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
  let plant = await Plant.add(req.body)
  plant = plant.replace('(', "").replace(')', "").replace(/"/g, "").split(',')
  console.log(plant, "plants router")
   res.status(201).json({data: {
     id: plant[0],
     nickname: plant[1],
     species: plant[2],
     h2o_frequency: plant[3],
     image: plant[4]
   }})
} catch (err) {
      // next({apiCode: 500, apiMessage: 'Error Creating Plant', ...err })
      next(err)
}
})

// Update Plant
router.put('/:id', async (req, res, next) => {
  try {
    const plant = await Plant.update(req.params.id, req.body)
     res.json(req.body)
  } catch (err) {
    next({apiCode: 500, apiMessage: 'Error Updating Plant', ...err })
  }
})

// Delete Plant
router.delete('/:id', async (req, res, next) => {
  try {
    const plant = await Plant.remove(req.params.id)
    res.json({message: `Plant with id ${req.params.id} has been deleted`})
  } catch (err) {
    next({apiCode: 500, apiMessage: 'Error Deleting Plant', ...err })
  }
})

module.exports = router