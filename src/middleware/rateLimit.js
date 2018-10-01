'use strict'

const db = require('../database')

const MAX_CONCURRENT_STREAMS = 3

module.exports = (req, res, next) => {

  if (!req.username) {
    throw new Error('User must be authenticated')
  }

  if (!db.connections[req.username]) {
    db.connections[req.username] = 0
  }

  db.connections[req.username]++

  req.connection.on('close', () => {
    db.connections[req.username]--
  })

  if (db.connections[req.username] > MAX_CONCURRENT_STREAMS) {
    return next(new Error('Exceeded concurrent streams'))
  }

  return next()
}
