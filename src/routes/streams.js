'use strict'

const fs = require('fs')
const path = require('path')
const express = require('express')
const middleware = require('../middleware')
const db = require('../database')

const VIDEO_FILE_DIR = path.join(process.env.PWD, 'data')

const router = express.Router()

router.use(middleware.rateLimit)

/**
 * Get video stream by ID.
 */
router.get('/:id', (req, res) => {

  const id = req.params.id

  const fileName = db.streams[id]

  // If video file with the specified ID was not found
  if (!fileName) {
    return res.status(404).send(`Video file not found by ID: ${id}`)
  }

  const filePath = path.join(VIDEO_FILE_DIR, fileName)
  const fileSize = fs.statSync(filePath).size

  const head = {
    'Content-Type': 'video/mp4',
  }

  const options = {}

  const range = req.headers.range

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-')

    options.start = parseInt(parts[0], 10)
    options.end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1

    head['Content-Range'] = `bytes ${options.start}-${options.end}/${fileSize}`
    head['Accept-Ranges'] = 'bytes'
    head['Content-Length'] = options.end - options.start + 1
  }
  else {
    head['Content-Length'] = fileSize
  }

  const file = fs.createReadStream(filePath, options)

  res.writeHead(200, head)
  file.pipe(res)

})

module.exports = router
