'use strict'
const $ = require('../index')
const assert = require('assert')
const crypto = require('crypto')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}

const cryptoExt = new $.Crypto()
const objStr = { pageNum: 1, serialNo: '20200908334669040224546816' }

describe('crypto扩展', function () {
  it('aes-256-gcm加解密同实例', function () {
    let r = cryptoExt.encrypt(JSON.stringify(objStr))
    r = cryptoExt.decrypt(r.r, null, null, r.tag)
    assertLog(r.r, JSON.stringify(objStr))
  })
  it('aes-256-gcm加解密不同实例', function () {
    let key = crypto.randomBytes(32)
    let iv = crypto.randomBytes(16)
    const cryptoExt1 = new $.Crypto({ key, iv })
    let r = cryptoExt1.encrypt(JSON.stringify(objStr))
    let tag = r.tag.toString('base64')
    const cryptoExt2 = new $.Crypto({ key, iv, tag: Buffer.from(tag, 'base64') })
    let r1 = cryptoExt2.decrypt(r.r)
    assertLog(r1.r, JSON.stringify(objStr))
  })
  it('aes-256普通加解密', function () {
    let oriStr = 'aabbccddeeffgg0123zzz你好'
    let key = 'e43ee68382dc550fbd1d329486febdd4e43ee68382dc550fbd1d329486febdd5'
    let iv = '6e9bbca876f8ddffc44a93503156abb3'
    const cryptoObj = new $.Crypto()
    assertLog(oriStr, cryptoObj.easyAES.decrypt(cryptoObj.easyAES.encrypt(oriStr, key, iv), key, iv))
  })
})
