const db = require('../../data/dbConfig');

async function findAll() {
    return db('plants').orderBy('plants.id')
}

async function findById(id) {
    return db('plants').where({id}).first();
}

async function add(plant) {
    return db('plants').insert(plant, "plants") // used to be (plant, "plants")
    .then(row => {
        return row[0]
        // let id = row[0]
        // return findById(id)
    })
    .catch(err => {
        console.log(err)
    })
   
}

async function remove(id) {
    return db('plants').where({id}).del();
}

async function update(id, changes) {
   return db('plants').where({id}).update(changes);
}

module.exports = {
    findAll,
    findById,
    add,
    update,
    remove
}