'use strict'

const express = require('express')
const router = express.Router()

/**
 * Get video stream by ID.
 */
router.get('/:id', (req, res) => {
  res.status(200).send(req.params)
})

module.exports = router
