'use strict'

/**
 * Logging middleware.
 */
module.exports = (req, res, next) => {

  console.log(`Requested: ${req.url}`)

  return next()
}
