'use strict'

const { expect } = require('chai')
const { simulateRequest } = require('../utils')

const BASE_URL = `http://localhost:${process.env.PORT}`
const MAX_REQUESTS = 3

describe('Streams API', () => {

  describe('GET /', () => {

    it('should not restrict concurrent connections', async () => {

      const result = await simulateRequest({
        url: `${BASE_URL}/`,
        maxRequests: MAX_REQUESTS,
        concurrency: 10,
        headers: {
          'Authorization': 'Basic YWxpY2U6YWxpY2U=', // alice:alice
        }
      })

      expect(result.totalErrors).to.equal(0)

    })
  })

  describe('GET /streams/:id', () => {

    it('should allow three concurrent connections', async () => {

      const result = await simulateRequest({
        url: `${BASE_URL}/streams/1`,
        maxRequests: MAX_REQUESTS,
        concurrency: 3,
        headers: {
          'Authorization': 'Basic YWxpY2U6YWxpY2U=', // alice:alice
        }
      })

      expect(result.totalErrors).to.equal(0)

    })

    it('should not allow more than three concurrent connections', async () => {

      const result = await simulateRequest({
        url: `${BASE_URL}/streams/1`,
        maxRequests: MAX_REQUESTS,
        concurrency: 4,
        headers: {
          'Authorization': 'Basic Ym9iOmJvYg==', // bob:bob
        }
      })

      expect(result.totalErrors).to.equal(MAX_REQUESTS)

    })
  })

})
