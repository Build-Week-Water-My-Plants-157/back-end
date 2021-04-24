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

describe('plants router tests', () => {

    describe("plants GET requests", () => {
        let getRes;

        // GET("/")
        test("returns all plants", async () => {
            getRes = await request(server).get('/api/plants');
            expect(getRes.body.length).not.toEqual(0)
        })

        // test("returns 200 status", async () => {
        //     getRes = await request(server).get('/api/plants');
        //     expect(getRes.status).toBe(200)
        // })

        // // GET("/:id")
        // test("returns specific plant", async () => {
        //     getRes = await request(server).get('/api/plants/1');
        //     expect(getRes.body.nickname).toEqual("Leafy")
        // })

        // test("returns 200 status", async () => {
        //     getRes = await request(server).get('/api/plants/1');
        //     expect(getRes.status).toBe(200)
        // })

        // test('should return JSON', async () => {
        //     getRes = await request(server).get('/api/plants');
        //     expect(getRes.type).toBe('application/json');
        // })
    })

    describe("plants POST requests", () => {
        let postRes;
        let getRes2;
        const plant = {
            nickname: "Rainbow", 
            species: "dwarf", 
            h2o_frequency: "48 hours", 
            image: "testurl"
        }

        // POST("/")
        test("plant can be created", async () => {
            postRes = await request(server).post('/api/plants').send(plant)
            getRes2 = await request(server).get('/api/plants')
            expect(getRes2.body.length).toBe(4)
            expect(postRes.body.nickname).toEqual("Rainbow")
        })


        test("returns 201 status", async () => {
            postRes = await request(server).post('/api/plants').send(plant);
            expect(postRes.status).toBe(201)
        })

        test('should return JSON', async () => {
            postRes = await request(server).get('/api/plants');
            expect(postRes.type).toBe('application/json');
        })
    })

    describe("plants PUT requests", () => {
        let putRes;
        const changes = {
            nickname: "LeafyHasBeenChanged", 
            species: "dwarf", 
            h2o_frequency: "48 hours", 
            image: "testurl"
        }

        // PUT("/api/plants/1")
        test("plant can be updated", async () => {
            putRes = await request(server).put('/api/plants/1').send(changes);
            expect(putRes.body.nickname).toEqual('LeafyHasBeenChanged')
        })

        test("returns 200 status", async () => {
            putRes = await request(server).put('/api/plants/1').send(changes);
            expect(putRes.status).toBe(200)
        })


        test('should return JSON', async () => {
            putRes = await request(server).put('/api/plants/1').send(changes);
            expect(putRes.type).toBe('application/json');
        })
    })

    describe("plants DELETE requests", () => {
        let deleteRes;
        let getRes3;
        let getResById;
        // DELETE("/:id")
        test("specific plant can be deleted", async () => {
            getResById = await request(server).get('/api/plants/3');
            deleteRes = await request(server).delete('/api/plants/3');
            getRes3 = await request(server).get('/api/plants');
            expect(deleteRes.body.message).toEqual(`Plant with id ${getResById.body.id} has been deleted`)
            expect(getRes3.body.length).toEqual(2);
        })

        test("returns 200 status", async () => {
            deleteRes = await request(server).delete('/api/plants/3');
            expect(deleteRes.status).toBe(200)
        })

        test('should return JSON', async () => {
            deleteRes = await request(server).delete('/api/plants/3');
            expect(deleteRes.type).toBe('application/json');
        })
    })
})