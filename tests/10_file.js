/* global describe */
/* global it */
/* global BigInt */
'use strict'
var $ = require('../index')
const assert = require('assert')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}

describe('文件操作相关', function () {
  it('getFileMd5', function () {
    const fileMd5 = $.file.getFileMd5('./tests/zzz_zend.js')
    assertLog(fileMd5, '4697d8bb99737f7e7f5511b924cd7bed')
  })
  it('getFileType', function () {
    const f1 = $.file.getFileType('./screenShot/drawTable.png')
    assertLog(f1.fileType, 'png')
  })
  it('checkImgComplete', function () {
    const f1 = $.file.checkImgComplete('./screenShot/drawTable.png', 'png')
    assertLog(f1, true)
  })
})
