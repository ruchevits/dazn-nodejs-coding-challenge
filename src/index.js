'use strict'

const server = require('./server')

server.listen(process.env.PORT, () => {
  console.log(`Server is listening at ${process.env.PORT}`)
})
