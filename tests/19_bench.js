'use strict'
const $ = require('../index')
const assert = require('assert')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}

function thousand (number, p = 3) {
  const sign = Math.sign(number)
  const arr = (Math.abs(number) + '').split('.')
  const int = arr[0] + ''
  const fraction = arr[1] || ''
  const f = int.length % 3
  let r = int.substring(0, f)

  for (let i = 0; i < Math.floor(int.length / 3); i++) {
    r += ',' + int.substring(f + i * 3, f + (i + 1) * 3)
  }

  if (f === 0) {
    r = r.substring(1)
  }

  return (sign < 0 ? '-' : '') + r + (fraction ? '.' + fraction.slice(0, p) : '')
}

function format_with_mod (number, p = 3) {
  const sign = Math.sign(number)
  let n = Math.abs(number)
  let r = ''
  let mod
  do {
    mod = n % 1000
    n = n / 1000
    r = ~~mod + (r ? ',' + r : '')
  } while (n > 1)

  const strNumber = number + ''
  const index = strNumber.indexOf('.')
  if (index > 0) {
    r += strNumber.substring(index).slice(0, p + 1)
  }
  return (sign < 0 ? '-' : '') + r
}

const testSuite = [
  {
    name: '千分位显示',
    testArr: [
      [
        function 原生 () {
          return (123456789.12345678).toLocaleString()
        },
        '',
        10
      ],
      [
        function 普通切割 () {
          return thousand(123456789.12345678)
        },
        '',
        10
      ],
      [
        function 数值取模法 () {
          return format_with_mod(123456789.12345678)
        },
        '',
        10
      ]
    ]
  }
]

describe('bench测试', function () {
  it('benchSuite', function () {
    $.bench.suite(testSuite)
    // assertLog(r, encryptStr)
  })
})
