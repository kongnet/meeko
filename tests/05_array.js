'use strict'
const $ = require('../index')
const assert = require('assert')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}
describe('Array原型扩展的单元测试', function () {
  it('allCheck', function () {
    assertLog(true, [1, 2, 3, 4, 5, 6].allCheck())
    assertLog(
      false,
      [1, 2, 3, 4, 5, 6].allCheck(x => x > 6)
    )
  })
  it('indexOfAll', function () {
    assertLog(true, $.tools.equals([0, 6], [1, 2, 3, 4, 5, 6, 1].indexOfAll(1)))
    assertLog(true, $.tools.equals([], [1, 2, 3, 4, 5, 6, 1].indexOfAll(11)))
    assertLog(true, $.tools.equals([6], [1, 2, 3, 4, 5, 6, '2'].indexOfAll('2')))
  })
  it('pick', function () {
    assertLog([1].pick(), 1)
    assertLog([1, 2].includes([1, 2].pick()), true)
  })
  it('copy', function () {
    assertLog([1].copy()[0], 1)
    const a = [0, 1]
    const b = a.copy()
    a[0] = 1
    assertLog(a[0] !== b[0], true)
  })
  it('count', function () {
    assertLog(JSON.stringify(['A', 'B', 'B', 'C', 'A', 'D'].count()), '{"A":2,"B":2,"C":1,"D":1}')
    assertLog(
      JSON.stringify(['A', 'B', 'B', 'C', 'A', 'D'].countAdv()),
      '[{"k":"A","v":2,"w":0.3333333333333333},{"k":"B","v":2,"w":0.3333333333333333},{"k":"C","v":1,"w":0.16666666666666666},{"k":"D","v":1,"w":0.16666666666666666}]'
    )
    assertLog(true, $.tools.equals([5.2, 4.2, 5.3].countBy(Math.floor), { 5: 2, 4: 1 }))
  })
  it('mode', function () {
    assertLog([1, 1, 1, 2, 3].mode().join(''), '1')
  })
  it('flatten', function () {
    assertLog([1, [2, [3, [4, 5], 6], 7], 8].flatten().join(''), '12345678')
  })
  it('orderBy', function () {
    assertLog(
      JSON.stringify(
        [
          { name: 'A', age: 48 },
          { name: 'B', age: 36 },
          { name: 'C', age: 26 }
        ].orderBy(['age'], ['asc', 'desc'])
      ),
      '[{"name":"C","age":26},{"name":"B","age":36},{"name":"A","age":48}]'
    )
    assertLog(
      JSON.stringify(
        [
          { name: 'A', age: 48 },
          { name: 'B', age: 36 },
          { name: 'C', age: 26 }
        ].orderBy(['age'], ['desc'])
      ),
      '[{"name":"A","age":48},{"name":"B","age":36},{"name":"C","age":26}]'
    )
    assertLog(
      JSON.stringify(
        [
          { name: 'A', age: 48 },
          { name: 'B', age: 36 },
          { name: 'C', age: 26 }
        ].orderBy(['age'])
      ),
      '[{"name":"C","age":26},{"name":"B","age":36},{"name":"A","age":48}]'
    )
    assertLog(
      JSON.stringify(
        [
          { name: 'A', age: 48 },
          { name: 'B', age: 36 },
          { name: 'C', age: 26 }
        ].orderBy(['name'])
      ),
      '[{"name":"A","age":48},{"name":"B","age":36},{"name":"C","age":26}]'
    )
  })
  it('equals', function () {
    let r = [].equals()
    assertLog(r, false)
    r = [].equals([])
    assertLog(r, true)
    r = [].equals([1])
    assertLog(r, false)
    r = [[2]].equals([[1]])
    assertLog(r, false)
    r = [[{ a: 1 }]].equals([[{ a: 2 }]]) // 对象是相等的
    assertLog(r, true)
    r = [[NaN]].equals([[NaN]])
    assertLog(r, true)
  })
  it('unique', function () {
    const r = [undefined, null, 1, 1, '1', '1', null, undefined, NaN, NaN].unique()
    assertLog(r.equals([undefined, null, 1, '1', NaN]), true) // 用JSON.stringify 会错误
  })
  it('intersect', function () {
    let r = [undefined, true, null, 1, 1, false, '1', '1', null, 'undefined', NaN, NaN].intersect([1, '1', 'undefined', undefined, 2, '5', true, null, false, NaN])
    assertLog(r.equals([undefined, true, null, 1, false, '1', 'undefined', NaN]), true)
    r = [undefined, true, null, 1, 1, false, '1', '1', null, 'undefined', NaN, NaN].intersect()
    assertLog(r.equals([]), true)
    r = [1, 2, 3].intersect([3, 4, 5])
    assertLog(r.equals([3]), true)
  })
  it('union', function () {
    let r = [undefined, true, null, 1, 1, '1', '1', null, 'undefined', NaN, NaN].union([1, '1', 'undefined', undefined, 2, '5', true, null])
    assertLog(r.equals([undefined, true, null, 1, '1', 'undefined', NaN, 2, '5']), true)
    r = [undefined, true, null, 1, 1, '1', '1', null, 'undefined', NaN, NaN].union()
    assertLog(r.equals([undefined, true, null, 1, '1', 'undefined', NaN]), true)
    r = [1, 2, 3].union([3, 4, 5])
    assertLog(r.equals([1, 2, 3, 4, 5]), true)
  })
  it('except', function () {
    let r = [1, 2, 3, 4].except([2, 3, 5])
    assertLog(r.equals([1, 4]), true)
    r = [2, 3, 5].except([1, 2, 3, 4])
    assertLog(r.equals([5]), true)
    r = [2, 3, 5].except()
    assertLog(r.equals([2, 3, 5]), true)
    r = [undefined, true, null, 1, 1, '1', '1', null, 'undefined', NaN, NaN].except([1, '1', 'undefined', undefined, 2, '5', true, null])
    assertLog(r.equals([NaN]), true)
  })
  it('subset', function () {
    let r = ['1', undefined, NaN, NaN].subset([undefined, null, 1, 1, '1', '1', null, undefined, NaN, NaN])
    assertLog(r, true)
    r = ['2', 2].subset([undefined, null, 1, 1, '1', '1', null, undefined, NaN, NaN])
    assertLog(r, false)
    r = ['1', null, 3, NaN].subset([undefined, null, 1, 1, '1', '1', null, undefined, NaN, NaN])
    assertLog(r, false)
    r = [undefined, null, NaN, undefined, undefined].subset([undefined, null, 1, 1, '1', '1', null, undefined, NaN, NaN])
    assertLog(r, true)
  })
  it('mean', function () {
    assertLog([1, 2, 3, 4, 5].mean(), 3)
  })
  it('median', function () {
    assertLog([1, 2, 3, 4, 5, 6].median(), 3.5)
    assertLog([1, 2, 3, 4, 5].median(), 3)
    assertLog([].median(), NaN)
  })
  it('remove', function () {
    assertLog([1, 2, 3, 4, 5].remove()[0], 2)
    assertLog([1, 2, 3, 4, 5].remove(1, 2)[1], 4)
  })
  it('chunk', function () {
    assertLog([1, 2, 3, 4, 5].chunk(2)[1][0], 3)
    assertLog([1, 2, 3, 4, 5].chunk(6)[5], void 0)
  })
  it('countBy', function () {
    assertLog([6.1, 4.2, 6.3].countBy(Math.floor)['6'], 2) // {4: 1, 6: 2}
  })
  it('max', function () {
    assertLog([6.1, 4.2, 6.3].max(), 6.3)
  })
  it('min', function () {
    assertLog([6.1, 4.2, 6.3].min(), 4.2)
  })
  it('sum', function () {
    assertLog([1n, 4n, 6n].sum(), 11n)
  })
  it('findMaxMin', function () {
    assertLog(JSON.stringify([6.1, 4.2, 6.3].findMaxMin()), '{"max":6.3,"min":4.2,"maxIdx":2,"minIdx":1,"count":3,"sum":16.6}')
    assertLog([1n, 2n, 3n].findMaxMin().sum, 6n)
    /*
    > [1n,2n,3n,4n,5n].findMaxMin()
      { max: 5n, min: 1n, maxIdx: 4, minIdx: 0, count: 5, sum: 15n }
    */
  })
})
