'use strict'

const $ = require('../index')
const assert = require('assert')

describe('$.dir 全类型测试', function () {
  it('包含各种数值类型的对象', function () {
    const obj = {
      a: 1,
      b: 'a',
      c: true,
      d: 13n,
      e: /^x+$/,
      f: new Date(),
      g: Infinity,
      h: -Infinity,
      i: NaN,
      j: -0,
      k: Number.MAX_SAFE_INTEGER,
      l: Number.MIN_SAFE_INTEGER,
      m: null,
      n: undefined,
      o: '',
      p: { x: { x: new Map() } },
      q: function () {},
      r: [{ r: 1n }, 2],
      s: Buffer.from('test')
    }
    const result = $.dir(obj)
    assert.strictEqual(Array.isArray(result), true)
  })
})
