const server = require('../server');
const request = require('supertest');
const db = require('../../data/dbConfig');

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async () => {
    await db('users_plants').truncate();
    await db('plants').truncate();
    await db('users').truncate();
    await db.seed.run();
});

afterAll(async () => {
    await db.destroy();
});

describe("users router tests", () => {

    describe("users GET requests", () => {
        let getRes;
        const user = {username: "Iron Man", password: "1234"};

        test("return all users", async () => {
            getRes = await request(server).get('/api/users')
            expect(getRes.body.length).not.toEqual(0);
            expect(getRes.body.length).toEqual(3);
        })

         test("returns 200 status", async () => {
            getRes = await request(server).get('/api/users');
            expect(getRes.status).toBe(200)
        })

         test('should return JSON', async () => {
            getRes = await request(server).get('/api/plants');
            expect(getRes.type).toBe('application/json');
        })

        test("return specific user by id", async () => {
            await request(server).post('/api/auth/register').send(user);
            let loginInfo = await request(server).post('/api/auth/login').send(user)
            let token = loginInfo.body.token;
            const headers = {authorization: `bearer ${token}`};

            let response = await request(server).get('/api/users/1').set(headers)
            expect(response.body.username).toBe("Nico")
            expect(response.status).toEqual(200)
            expect(response.type).toBe('application/json');
            expect(response.body.plants.length).not.toBe(0)
        })

    })
})

describe("users POST requests", () => {
    let getRes;
    let postRes;
    const user = {username: "Iron Man", password: "1234"};
    const plant = {
        plant_id: 1
    }

    test("add a plant to a user", async () => {
        await request(server).post('/api/auth/register').send(user);
        let loginInfo = await request(server).post('/api/auth/login').send(user)
        let token = loginInfo.body.token;
        const headers = {authorization: `bearer ${token}`};

        postRes = await request(server).post('/api/users/4').set(headers).send(plant)
        getRes = await request(server).get('/api/users/4').set(headers)
        expect(getRes.body.plants.length).toEqual(1)
        expect(postRes.status).toEqual(201)
    })
})

describe("users DELETE requests", () => {
    let getRes;
    let postRes;
    let delRes;
    const user = {username: "Iron Man", password: "1234"};
    const plant = {
        plant_id: 1
    }

    test("delete a plant from a user", async () => {
        await request(server).post('/api/auth/register').send(user);
        let loginInfo = await request(server).post('/api/auth/login').send(user)
        let token = loginInfo.body.token;
        const headers = {authorization: `bearer ${token}`};

        postRes = await request(server).post('/api/users/4').set(headers).send(plant)
        getRes = await request(server).get('/api/users/4').set(headers)
        expect(getRes.body.plants.length).toEqual(1)
        delRes = await request(server).delete('/api/users/4/plant').set(headers).send(plant)
        getRes = await request(server).get('/api/users/4').set(headers)
        expect(getRes.body.plants.length).toEqual(0)
        expect(delRes.status).toEqual(200);
        expect(delRes.body.message).toBe("Plant with id 1 has been deleted from user 4")
    })

    test("delete a user from db", async () => {
        await request(server).post('/api/auth/register').send(user);
        let loginInfo = await request(server).post('/api/auth/login').send(user)
        let token = loginInfo.body.token;
        const headers = {authorization: `bearer ${token}`};

        delRes = await request(server).delete('/api/users/4').set(headers);
        expect(delRes.body.message).toBe("User with id 4 has been deleted")
    })
})

describe("users PUT requests", () => {
    const changed = {username: "Spider Man", password: "test"};
    const user = {username: "Iron Man", password: "1234"};
    let changedRes;

    test("update user information", async () => {
        await request(server).post('/api/auth/register').send(user);
        let loginInfo = await request(server).post('/api/auth/login').send(user)
        let token = loginInfo.body.token;
        const headers = {authorization: `bearer ${token}`};

        changedRes = await request(server).put('/api/users/4').set(headers).send(changed);
        expect(changedRes.body).toEqual(changed)
        expect(changedRes.status).toEqual(200)
    })
})

describe("auth router tests", () => {

    describe("registering in a user", () => {
        let regRes;
        let getRes;
        const user = {username: "Iron Man", password: "1234"};

        test("registers a user", async () => {
            regRes = await request(server).post('/api/auth/register').send(user)
            getRes = await request(server).get('/api/users')
            expect(getRes.body.length).toEqual(4);
            expect(regRes.body.user.username).toBe("Iron Man")
        })

        test("returns 201 status", async () => {
            regRes = await request(server).post('/api/auth/register').send(user)
            expect(regRes.status).toBe(201)
        })

        test('should return JSON', async () => {
            regRes = await request(server).post('/api/auth/register').send(user)
            expect(regRes.type).toBe('application/json');
        })
    })

    describe("logging in a user", () => {
        let logRes;
        const user = {username: "Iron Man", password: "1234"};

        test("logging in a user", async () => {
            await request(server).post('/api/auth/register').send(user)
            logRes = await request(server).post('/api/auth/login').send(user)
            expect(logRes.body.message).toEqual(`${user.username} is back!`)
        })

        test("returns 200 status", async () => {
            await request(server).post('/api/auth/register').send(user)
            logRes = await request(server).post('/api/auth/login').send(user)
            expect(logRes.status).toBe(200)
        })

        test('should return JSON', async () => {
            await request(server).post('/api/auth/register').send(user)
            logRes = await request(server).post('/api/auth/login').send(user)
            expect(logRes.type).toBe('application/json');
        })
    })
})