/* global describe */
/* global it */
'use strict'
var $ = require('../index')
const assert = require('assert')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}

describe('文件操作相关', function () {
  it('getFileMd5', function () {
    const fileMd5 = $.file.getFileMd5('./LICENSE')
    assertLog(fileMd5, '6d99ad314bee621647d239347e0b0add')
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
