const db = require('../../data/dbConfig');

async function findAll() {
    return db.select('u.id', 'u.username', 'u.phone_number').from('users as u').orderBy('u.id');
};

async function findById(id) {
    const res = await db.select('u.id', 'u.username', 'u.phone_number', 'p.id as plantId', 'nickname', 'species', 'h2o_frequency', 'image')
    .from('users as u').leftJoin('users_plants as u_p', 'u_p.user_id', 'u.id')
    .leftJoin('plants as p', 'plantId', 'u_p.plant_id').
    where({'u.id': id})
    .groupBy('plantId')
    .first();

    const newObj = {
        id: res.id,
        username: res.username,
        phone_number: res.phone_number,
        plants: [await findPlants(res.id)]
    }
    return newObj;
}

async function findPlants(user_id) {
    const res = db('plants as p')
    .join('users_plants as up', 'up.plant_id', 'p.id')
    .join('users as u', 'u.id', 'up.user_id')
    .select('p.id', 'p.nickname', 'p.species', 'p.h2o_frequency', 'p.image')
    .where({"up.user_id": user_id});

    return res;
}

async function add(user) {
    const [id] = await db('users').insert(user);
    return findById(id);
}

async function update(id, changes) {
    return db('users').where({id}).update(changes, '*');
}

async function remove(id) {
    return db('users').where({id}).del();
}

module.exports = {
    findAll,
    findById,
    add,
    update,
    remove
}