'use strict'

const express = require('express')
const routes = require('./routes')
const middleware = require('./middleware')

const server = express()

server.use(middleware.auth)

server.use('/', routes.main)
server.use('/streams', routes.streams)

module.exports = server
