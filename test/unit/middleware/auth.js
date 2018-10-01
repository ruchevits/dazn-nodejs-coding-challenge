'use strict'

const { expect } = require('chai')
const { callMiddleware } = require('../../utils')
const { auth } = require('../../../src/middleware')

describe('Auth Middleware', () => {

  it('should append username to the request object if the authorization header is set', async () => {

    const { req } = await callMiddleware(auth, {
      headers: {
        'authorization': 'Basic YWxpY2U6YWxpY2U=', // alice:alice
      },
    })

    expect(req).to.have.property('username', 'alice')

  })

  it('should not do anything if the authorization header is not set', async () => {

    const { req } = await callMiddleware(auth)

    expect(req).to.not.have.property('username')

  })
})
