/* global describe */
/* global it */
'use strict'
const $ = require('../index')
let assert = require('assert')
describe('Number原型扩展的单元测试', function () {
  it('round', function () {
    assert.strictEqual(1.123457, 1.123456789.round(6))
    assert.strictEqual(1, 1.123456789.round(0))
    assert.strictEqual(1, (1.123456789).round(0))
    assert.strictEqual(1, (1).round(0))
  })
  it('isPrime', function () {
    assert.strictEqual(true, (2).isPrime()) // 9007199254740881 安全数中最大的质数
    assert.strictEqual(false, (4).isPrime())
    assert.strictEqual(true, (13).isPrime())
    assert.strictEqual(false, (15).isPrime())
  })
  it('prettyBytes', function () {
    assert.strictEqual('1 KB', (1000).prettyBytes())
    assert.strictEqual('0 B', (0).prettyBytes())
    assert.strictEqual('0B', (0).prettyBytes(0, false))
    assert.strictEqual('-27.145 GB', (-27145424323.5821).prettyBytes(5))
    assert.strictEqual('123MB', (123456789).prettyBytes(3, false))
  })
})
describe('Buffer原型扩展的单元测试', function () {
  it('contact', function () {
    let buf = Buffer.from([1, 2])
    let buf1 = buf.contact(Buffer.from([3, 4]))
    assert.strictEqual(3, buf1[2])
  })
})
describe('Function原型扩展的单元测试', function () {
  it('help', function () {
    let func = function () {
      /* abc */
    }
    assert.strictEqual('abc', func.help())
  })
})
