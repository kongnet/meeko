'use strict'
const $ = require('../index')
const assert = require('assert')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}
describe('Number原型扩展的单元测试', function () {
  it('round', function () {
    assertLog(1.123457, (1.123456789).round(6))
    assertLog(1, (1.123456789).round(0))
    assertLog(1, (1.123456789).round(0))
    assertLog(1, (1).round(0))
  })
  it('isPrime', function () {
    assertLog(true, (2).isPrime()) // 9007199254740881 安全数中最大的质数
    assertLog(false, (4).isPrime())
    assertLog(true, (13).isPrime())
    assertLog(false, (15).isPrime())
  })
  it('prettyBytes', function () {
    assertLog('1 KB', (1000).prettyBytes())
    assertLog('0 B', (0).prettyBytes())
    assertLog('0.123 B', (0.12345).prettyBytes())
    assertLog('0B', (0).prettyBytes(0, false))
    assertLog('-27.145 GB', (-27145424323.5821).prettyBytes(5))
    assertLog('123MB', (123456789).prettyBytes(3, false))
  })
})
describe('Buffer原型扩展的单元测试', function () {
  it('contact', function () {
    const buf = Buffer.from([1, 2])
    const buf1 = buf.contact(Buffer.from([3, 4]))
    assertLog(3, buf1[2])
  })
})
describe('Function原型扩展的单元测试', function () {
  it('help', function () {
    const func = function () {
      /* abc */
    }
    assertLog('abc', func.help())
  })
})
