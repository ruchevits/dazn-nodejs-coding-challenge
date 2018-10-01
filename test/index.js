'use strict'

const { expect } = require('chai')
const loadtest = require('loadtest')

const MAX_REQUESTS = 3

describe('Streams', () => {

  describe('GET /streams/:id', () => {

    it('should not restrict concurrent connections', async () => {

      const result = await simulateWatchStream({
        url: 'http://localhost:8080',
        maxRequests: MAX_REQUESTS,
        concurrency: 10,
        headers: {
          'Authorization': 'Basic YWxpY2U6YWxpY2U=',
        }
      })

      expect(result.totalErrors).to.equal(0)

    })
  })

  describe('GET /streams/:id', () => {

    it('should allow three concurrent connections', async () => {

      const result = await simulateWatchStream({
        url: 'http://localhost:8080/streams/1',
        maxRequests: MAX_REQUESTS,
        concurrency: 3,
        headers: {
          'Authorization': 'Basic YWxpY2U6YWxpY2U=',
        }
      })

      expect(result.totalErrors).to.equal(0)

    })

    it('should not allow more than three concurrent connections', async () => {

      const result = await simulateWatchStream({
        url: 'http://localhost:8080/streams/1',
        maxRequests: MAX_REQUESTS,
        concurrency: 4,
        headers: {
          'Authorization': 'Basic Ym9iOmJvYg==',
        }
      })

      expect(result.totalErrors).to.equal(MAX_REQUESTS)

    })
  })

})

function simulateWatchStream(options) {
  return new Promise((resolve, reject) => {
    loadtest.loadTest(options, (error, result) => {
      if (error) return reject(error)
      return resolve(result)
    })
  })
}
