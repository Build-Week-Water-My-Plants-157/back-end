const db = require('../../data/dbConfig');
const Plants = require('../models/plantsModel');

async function findAll() {
    return db.select('u.id', 'u.username', 'u.phone_number').from('users as u').orderBy('u.id');
};

async function findById(id) {
    const res = await db.select('u.id', 'u.username', 'u.phone_number', 'p.id as plantId', 'nickname', 'species', 'h2o_frequency', 'image')
    .from('users as u')
    .join('users_plants as u_p', 'u_p.user_id', 'u.id')
    .leftJoin('plants as p', 'plantId', 'u_p.plant_id').
    where({'u.id': id})
    .groupBy('plantId')
    .first();

    const newObj = {
        id: res.id,
        username: res.username,
        phone_number: res.phone_number,
        plants: await findPlants(res.id)
    }
    return newObj;
}

async function findBy(filter) {
    return db('users').where(filter);
}

async function findPlants(user_id) {
    const res = db('plants as p')
    .join('users_plants as up', 'up.plant_id', 'p.id')
    .join('users as u', 'u.id', 'up.user_id')
    .select('p.id', 'p.nickname', 'p.species', 'p.h2o_frequency', 'p.image')
    .where({'up.user_id': user_id});

    return res;
}

async function addPlantToUser(userId, plantId) {
    return db('users_plants as up')
    .insert({user_id: userId, plant_id: plantId})
}

function add(user) {
        console.log(user, "in the add model")
        return db('users').insert(user)
        .then(row => {
            return row[0]
        })
        .catch(err => {
            console.log(err)
        })

        // console.log(id, "in the add model");
        // return findById(id);
}

async function update(id, changes) {
    return db('users').where({id}).update(changes, '*');
}

async function remove(id) {
    return db('users').where({id}).del();
}

async function removePlantFromUser(userId, plantId) {
    return db('users_plants')
    .where({user_id: userId, plant_id: plantId})
    .del();
}

module.exports = {
    findAll,
    findById,
    findBy,
    add,
    update,
    remove,
    removePlantFromUser,
    addPlantToUser
}
