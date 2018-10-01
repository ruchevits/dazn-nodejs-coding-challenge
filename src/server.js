'use strict'

const express = require('express')
const routes = require('./routes')

const server = express()

server.use('/', routes.main)
server.use('/streams', routes.streams)

module.exports = server