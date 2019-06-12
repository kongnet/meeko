/* global describe */
/* global it */
/* global $ */
'use strict'
var $ = require('../index')
let assert = require('assert')

describe('Array原型扩展的单元测试', function () {
  it('copy', function () {
    assert.strictEqual([1].copy()[0], 1)
    let a = [0, 1]
    let b = a.copy()
    a[0] = 1
    assert.strictEqual(a[0] !== b[0], true)
  })
  it('count', function () {
    assert.strictEqual(JSON.stringify(['A', 'B', 'B', 'C', 'A', 'D'].count()), '{"A":2,"B":2,"C":1,"D":1}')
  })
  it('flatten', function () {
    assert.strictEqual([1, [2, [3, [4, 5], 6], 7], 8].flatten().join(''), '12345678')
  })
  it('orderBy', function () {
    assert.strictEqual(JSON.stringify([{ name: 'A', age: 48 }, { name: 'B', age: 36 }, { name: 'C', age: 26 }].orderBy(['age'], ['asc', 'desc'])), '[{"name":"C","age":26},{"name":"B","age":36},{"name":"A","age":48}]')
    assert.strictEqual(JSON.stringify([{ name: 'A', age: 48 }, { name: 'B', age: 36 }, { name: 'C', age: 26 }].orderBy(['age'], ['desc'])), '[{"name":"A","age":48},{"name":"B","age":36},{"name":"C","age":26}]')
    assert.strictEqual(JSON.stringify([{ name: 'A', age: 48 }, { name: 'B', age: 36 }, { name: 'C', age: 26 }].orderBy(['age'])), '[{"name":"C","age":26},{"name":"B","age":36},{"name":"A","age":48}]')
    assert.strictEqual(JSON.stringify([{ name: 'A', age: 48 }, { name: 'B', age: 36 }, { name: 'C', age: 26 }].orderBy(['name'])), '[{"name":"A","age":48},{"name":"B","age":36},{"name":"C","age":26}]')
  })
  it('equals', function () {
    let r = [].equals()
    assert.strictEqual(r, false)
    r = [].equals([])
    assert.strictEqual(r, true)
    r = [].equals([1])
    assert.strictEqual(r, false)
    r = [[2]].equals([[1]])
    assert.strictEqual(r, false)
    r = [[{ a: 1 }]].equals([[{ a: 2 }]]) // 对象是相等的
    assert.strictEqual(r, true)
    r = [[NaN]].equals([[NaN]])
    assert.strictEqual(r, true)
  })
  it('unique', function () {
    let r = [undefined, null, 1, 1, '1', '1', null, undefined, NaN, NaN].unique()
    assert.strictEqual(r.equals([ undefined, null, 1, '1', NaN ]), true) // 用JSON.stringify 会错误
  })
  it('intersect', function () {
    let r = [undefined, true, null, 1, 1, false, '1', '1', null, 'undefined', NaN, NaN].intersect([1, '1', 'undefined', undefined, 2, '5', true, null, false, NaN])
    assert.strictEqual(r.equals([ undefined, true, null, 1, false, '1', 'undefined', NaN ]), true)
    r = [undefined, true, null, 1, 1, false, '1', '1', null, 'undefined', NaN, NaN].intersect()
    assert.strictEqual(r.equals([]), true)
    r = [1, 2, 3].intersect([3, 4, 5])
    assert.strictEqual(r.equals([3]), true)
  })
  it('union', function () {
    let r = [undefined, true, null, 1, 1, '1', '1', null, 'undefined', NaN, NaN].union([1, '1', 'undefined', undefined, 2, '5', true, null])
    assert.strictEqual(r.equals([ undefined, true, null, 1, '1', 'undefined', NaN, 2, '5' ]), true)
    r = [undefined, true, null, 1, 1, '1', '1', null, 'undefined', NaN, NaN].union()
    assert.strictEqual(r.equals([undefined, true, null, 1, '1', 'undefined', NaN]), true)
    r = [1, 2, 3].union([3, 4, 5])
    assert.strictEqual(r.equals([1, 2, 3, 4, 5]), true)
  })
  it('except', function () {
    let r = [1, 2, 3, 4].except([2, 3, 5])
    assert.strictEqual(r.equals([1, 4]), true)
    r = [2, 3, 5].except([1, 2, 3, 4])
    assert.strictEqual(r.equals([5]), true)
    r = [2, 3, 5].except()
    assert.strictEqual(r.equals([2, 3, 5]), true)
    r = [undefined, true, null, 1, 1, '1', '1', null, 'undefined', NaN, NaN].except([1, '1', 'undefined', undefined, 2, '5', true, null])
    assert.strictEqual(r.equals([NaN]), true)
  })
  it('subset', function () {
    let r = ['1', undefined, NaN, NaN].subset([undefined, null, 1, 1, '1', '1', null, undefined, NaN, NaN])
    assert.strictEqual(r, true)
    r = ['2', 2].subset([undefined, null, 1, 1, '1', '1', null, undefined, NaN, NaN])
    assert.strictEqual(r, false)
    r = ['1', null, 3, NaN].subset([undefined, null, 1, 1, '1', '1', null, undefined, NaN, NaN])
    assert.strictEqual(r, false)
    r = [undefined, null, NaN, undefined, undefined].subset([undefined, null, 1, 1, '1', '1', null, undefined, NaN, NaN])
    assert.strictEqual(r, true)
  })
  it('mean', function () {
    assert.strictEqual([1, 2, 3, 4, 5].mean(), 3)
  })
  it('median', function () {
    assert.strictEqual([1, 2, 3, 4, 5, 6].median(), 3.5)
    assert.strictEqual([1, 2, 3, 4, 5].median(), 3)
    assert.strictEqual([].median(), 0)
  })
  it('remove', function () {
    assert.strictEqual([1, 2, 3, 4, 5].remove()[0], 2)
    assert.strictEqual([1, 2, 3, 4, 5].remove(1, 2)[1], 4)
  })
})
