'use strict'

const express = require('express')
const router = express.Router()

/**
 * Get API status.
 */
router.get('/', (req, res) => {
  res.sendStatus(204)
})

module.exports = router
