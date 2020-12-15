/* global describe */
/* global it */
'use strict'
var $ = require('../index')
const assert = require('assert')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}

const cryptoExt = new $.Crypto()
const objStr = { pageNum: 1, serialNo: '20200908334669040224546816' }
const key = '6D0S+qpEy6vrK1+/'
const encryptStr = '5f75ff5a9abce3d846dcdabeb6e7a55c9c458f8157ebe4569718e09fbc7e110b175153a35812bbddc555024448409751aae0d217e35b99dfa3eb39517e75aa03'
describe('crypto扩展', function () {
  it('aes-128-ecb加密', function () {
    const r = cryptoExt.encrypt(JSON.stringify(objStr), key)
    assertLog(r, encryptStr)
  })

  it('aes-128-ecb解密', function () {
    const r = cryptoExt.decrypt(encryptStr, key)
    assertLog(r, JSON.stringify(objStr))
  })
})
