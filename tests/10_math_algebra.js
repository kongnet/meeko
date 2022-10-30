'use strict'
const $ = require('../index')
const assert = require('assert')

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
      const rst = [3, 5, 2, 3]
      const r = $.math
        .gaussian($.file.csv2Arr(matrixStr, ',', 1, v => +v.trim()))
        .map(x => +x.toFixed(10))
        .equals(rst)
      assertLog(r, true)
      console.log(matrixStr, '\n', '=>', rst)
    })
  })
  describe('最大公约数，最小公倍数', function () {
    it('gcdlcm因式分解', function () {
      assertLog($.math.gcd(10, 12), 2)
      assertLog($.math.lcm(10, 12), 60)
      assertLog($.math.primeFactor(12345678912345).join('*'), '3*5*43*2371*8072791')
      assertLog($.math.primeFactor(1).join('*'), '1')
      assertLog($.math.primeFactor(0).join('*'), '0')
      assertLog($.math.primeFactor(2).join('*'), '2')
    })
  })
})
