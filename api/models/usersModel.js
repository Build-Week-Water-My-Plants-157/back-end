const db = require("../../data/dbConfig");
const Plants = require("../models/plantsModel");

async function findAll() {
    return db.select("u.id", "u.username", "u.phone_number").from("users as u").orderBy("u.id");
};

async function findById(id) {
    // const res = await db.select("u.id", "u.username", "u.phone_number")
    // .from("users as u")
    // .where({id})
    // .first()
    // .then(row => {
    //     // console.log(row, "row")
    //     return row
    // })

    // console.log(await res,"res in find by id")

    // const newObj = {
    //     id: res.id,
    //     username: res.username,
    //     phone_number: res.phone_number,
    //     plants: await findPlants(res.id)
    // }
    // console.log(newObj, "newObj")
    // return newObj;

    const res = await db('users')
    .select('users.id', 'users.username', 'users.phone_number')
    .where('id', id)
    .first();

     const newObj = {
        id: res.id,
        username: res.username,
        phone_number: res.phone_number,
        plants: await findPlants(res.id)
    }
    console.log(newObj, "newObj")
    return newObj;

}

async function findBy(filter) {
    return db("users").where(filter);
}

async function findPlants(user_id) {
    const res = await db("plants as p")
    .join("users_plants as up", "up.plant_id", "p.id")
    .join("users as u", "u.id", "up.user_id")
    .select("p.id", "p.nickname", "p.species", "p.h2o_frequency", "p.image")
    .where({"up.user_id": user_id})
    .groupBy("p.id")
    .then(row => {
        // console.log(row, "findPlants row")
        return row
    });

    // console.log(await res, "res in findPlants")
    return res;
}

async function addPlantToUser(userId, plantId) {
    return db("users_plants as up")
    .insert({user_id: userId, plant_id: plantId})
}

function add(user) {
        return db("users").insert(user, "users")
        .then(row => {
            return row[0]
        })
        .catch(err => {
            console.log(err)
        })
}

async function update(id, changes) {
    return db("users").where({id}).update(changes, "*");
}

async function remove(id) {
    return db("users").where({id}).del();
}

async function removePlantFromUser(userId, plantId) {
    return db("users_plants")
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
