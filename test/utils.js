'use strict'

const loadtest = require('loadtest')

module.exports.callMiddleware = async (middleware, req) => {
  return new Promise((resolve, reject) => {

    req = Object.assign({
      headers: {},
    }, req)

    const res = {}

    middleware(req, res, error => {
      if (error) return reject(error)
      return resolve({ req, res })
    })
  })
}

module.exports.simulateRequest = async options => {
  return new Promise((resolve, reject) => {
    loadtest.loadTest(options, (error, result) => {
      if (error) return reject(error)
      return resolve(result)
    })
  })
}
