/* global describe */
/* global it */
'use strict'
const $ = require('../index')
const assert = require('assert')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}

const cryptoExt = new $.Crypto()
const objStr = { pageNum: 1, serialNo: '20200908334669040224546816' }

describe('crypto扩展', function () {
  it('aes-256-gcm加解密', function () {
    const r = cryptoExt.decrypt(cryptoExt.encrypt(JSON.stringify(objStr)))
    assertLog(r, JSON.stringify(objStr))
  })
})
