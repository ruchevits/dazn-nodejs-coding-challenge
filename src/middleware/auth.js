'use strict'

module.exports = (req, res, next) => {

  console.log(111)

  const authorization = req.headers['authorization']

  if (authorization) {
    const segments = authorization.split(' ')
    const credentials = new Buffer(segments[1], 'base64').toString().split(':')
    req.username = credentials[0]
  }

  return next()
}
