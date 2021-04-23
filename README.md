USER ENDPOINTS

REGISTER A NEW USER
POST: https://tt157-backend.herokuapp.com/api/auth/register

LOGIN A USER
POST: https://tt157-backend.herokuapp.com/api/auth/login

GET ALL USERS
GET: https://tt157-backend.herokuapp.com/api/users

GET USERS BY ID w/ PLANT ARRAY
GET: https://tt157-backend.herokuapp.com/api/users/:id

ADD A PLANT TO A USER
POST: https://tt157-backend.herokuapp.com/api/users/:id -- send plant id in the body, ex: {plant_id: 1}

UPDATE A USER
PUT: https://tt157-backend.herokuapp.com/api/users/:id

DELETE A USER
DELETE: https://tt157-backend.herokuapp.com/api/users/:id

DELETE A USER'S PLANT
// note that you need to send the plant id in the body similar to "ADD A PLANT TO USER"
DELETE: https://tt157-backend.herokuapp.com/api/users/:id/plant
// BE CAREFUL OF HOW SIMILAR ENDPOINT IS TO "DELETE A USER" BC YOU DO NOT WANT TO ACCIDENTALLY DELETE A USER

---

PLANT ENDPOINTS

ADD A NEW PLANT
POST: https://tt157-backend.herokuapp.com/api/plants

GET ALL PLANTS
GET: https://tt157-backend.herokuapp.com/api/plants

GET PLANT BY ID
GET: https://tt157-backend.herokuapp.com/api/plants/:id

UPDATE A PLANT
PUT: https://tt157-backend.herokuapp.com/api/plants/:id

DELETE A PLANT
DELETE: https://tt157-backend.herokuapp.com/api/plants/:id
