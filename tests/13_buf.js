'use strict'
const $ = require('../index')
const assert = require('assert')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}

const rr = Buffer.from([0x20, 0x0, 0x59, 0x67, 0xff, 0x1, 0x0, 0x11, 0x45, 0x0])
const arr = $.buf.split(rr, $.buf.zero)

describe('buffer扩展', function () {
  it('buffer按字符split', function () {
    assertLog(arr[1][2], 255)
  })
  it('bufferArray按字符join', function () {
    const buf = $.buf.join(arr, $.buf.zero)
    assertLog(buf[7], 0x11)
  })
})
