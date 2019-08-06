/* global describe */
/* global it */
'use strict'
const $ = require('../index')
const assert = require('assert')

describe('结束', function () {
  it('结束', function () {
    console.log(`一共 ${$.c.y(global.assertCount)} 个断言`)
  })
})
process.on('uncaughtException', function (err) {
  console.log('-x- Caught exception: ' + err)
  process.exit()
})
