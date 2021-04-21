const express = require('express');
const server = express();
const cors = require('cors');
const morgan = require('morgan')
const errorHandler = require('./errorHandler');
const usersRouter = require('../api/routers/usersRouter');

server.use(cors());
server.use(express.json());
server.use(morgan('dev'))
// server.use(base endpoint, router) * repeat if multiple routers *
server.use('/api/users', usersRouter);

// ROUTERS

server.use(errorHandler); // error handler

module.exports = server;