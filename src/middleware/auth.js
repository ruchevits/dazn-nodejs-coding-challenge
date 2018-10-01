'use strict'

/**
 * Authorization middleware.
 * It does not actually authenticate a user against some database, just appends to the request object
 * whatever username is specified in the basic authorization header. Password is ignored.
 */
module.exports = (req, res, next) => {

  const authorization = req.headers['authorization']

  if (authorization) {
    const segments = authorization.split(' ')
    const credentials = new Buffer(segments[1], 'base64').toString().split(':')
    req.username = credentials[0]
  }

  return next()
}
