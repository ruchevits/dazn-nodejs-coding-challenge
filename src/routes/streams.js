'use strict'

const express = require('express')
const middleware = require('../middleware')

const router = express.Router()

router.use(middleware.rateLimit)

/**
 * Get video stream by ID.
 */
router.get('/:id', (req, res) => {
  setTimeout(() => {
    res.status(200).send(req.params)
  }, 500)
})

module.exports = router
