'use strict'
const $ = require('../index')
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
  it('readBig', function () {
    $.file.readBig('./package.json', undefined, undefined, function (a, b) {
      console.log(a, b)
    })
  })
  const person = `p1	男
  p2	男
  p3	女
  p4	女
  p5	男
  p6	男`
  it('csv2Arr 跳过第一行', function () {
    let f1 = $.file.csv2Arr(person, '\t', 1)
    assertLog(f1[0][0].trim(), 'p2')
  })
  it('csv2Arr 不跳过第一行', function () {
    let f1 = $.file.csv2Arr(person, '\t', 0)
    assertLog(f1[0][0].trim(), 'p1')
  })
})
