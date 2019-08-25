/* global describe */
/* global it */
'use strict'
const $ = require('../index')
const assert = require('assert')
require('chai').should()
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}

describe('代数函数测试', function () {
  describe('高斯消元法', function () {
    it('Gaussian', function () {
      const matrixStr = `
    1,  0, 5, 8, 37
    3,  2, 3, 3, 34
   -1, -3, 5, 7, 13
    9, -5, 3, 6, 26`

      const r = $.math.gaussian($.file.csv2Arr(matrixStr, ',', 1, (v) => +v.trim()))
        .map(x => +x.toFixed(10))
        .equals([3, 5, 2, 3])
      assertLog(r, true)
    })
  })
})
