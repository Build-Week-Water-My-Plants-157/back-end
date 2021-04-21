const express = require('express');
const server = express();
const cors = require('cors');
const morgan = require('morgan')
const errorHandler = require('./errorHandler');
const usersRouter = require('../api/routers/usersRouter');
const plantsRouter = require('../api/routers/plantRouter')
server.use(cors());
server.use(express.json());
server.use(morgan('dev'))
// server.use(base endpoint, router) * repeat if multiple routers *
server.use('/api/users', usersRouter);
server.use('/api/plants', plantsRouter)

// ROUTERS

server.use(errorHandler); // error handler

module.exports = server;