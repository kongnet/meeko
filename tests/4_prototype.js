/* global describe */
/* global it */
/* global $ */
'use strict'
var $ = require('../index')
let assert = require('assert')

describe('Date原型扩展的单元测试', function () {
  var d1 = new Date('2015-12-29 01:11:01')
  var d2 = new Date('2016-01-02 20:09:31')
  var d3 = new Date('2018-01-01 20:09:31')
  it('getWeek', function () {
    assert.strictEqual(52, d1.getWeek())
    assert.strictEqual(52, d2.getWeek())
    assert.strictEqual(1, d3.getWeek())
  })
  it('format', function () {
    assert.strictEqual('2015-12-29 01:11:01', d1.format())
    assert.strictEqual(+new Date('2015-12-29 01:11:01') / 1000 | 0, +d1.format('X'))
    assert.strictEqual('2015/12/29', d1.format('yyyy/MM/dd'))
    assert.strictEqual('2015/12/29/011101', d1.format('YYYY/MM/DD/HHmmss'))
    assert.strictEqual('20151229011101', d1.format('YYYYMMDDHHmmss'))
    assert.strictEqual('2015-12-29 01:11:01', d1.format('YYYY-MM-DD HH:mm:ss'))
    assert.strictEqual('2015-12-29 01:11:01', d1.format('yyyy-MM-dd hh:mm:ss'))
    assert.strictEqual('2015-12-29 01:11:01 52 4', d1.format('yyyy-MM-dd hh:mm:ss ww q'))
  })
  it('date2Str', function () {
    assert.strictEqual('2015-12-29 01:11:01', d1.date2Str())
    assert.strictEqual('2016-01-02 20:09:31', d2.date2Str())
  })
  it('date8', function () {
    assert.strictEqual('20151229', d1.date8())
    assert.strictEqual('20160102', d2.date8())
  })
  it('dateAdd年', function () {
    assert.strictEqual('2016-12-29 01:11:01', d1.dateAdd('y', 1).date2Str())
    assert.strictEqual('2015-12-29 01:11:01', d1.dateAdd('y', -1).date2Str())
  })
  it('dateAdd季度', function () {
    assert.strictEqual('2016-03-29 01:11:01', d1.dateAdd('q', 1).date2Str())
    assert.strictEqual('2015-12-29 01:11:01', d1.dateAdd('q', -1).date2Str())
  })
  it('dateAdd月', function () {
    assert.strictEqual('2016-01-29 01:11:01', d1.dateAdd('m', 1).date2Str())
    assert.strictEqual('2015-12-29 01:11:01', d1.dateAdd('m', -1).date2Str())
  })
  it('dateAdd周', function () {
    assert.strictEqual('2016-01-05 01:11:01', d1.dateAdd('w', 1).date2Str())
    assert.strictEqual('2015-12-29 01:11:01', d1.dateAdd('w', -1).date2Str())
  })
  it('dateAdd日', function () {
    assert.strictEqual('2015-12-30 01:11:01', d1.dateAdd('d', 1).date2Str())
    assert.strictEqual('2015-12-29 01:11:01', d1.dateAdd('d', -1).date2Str())
  })
  it('dateAdd时', function () {
    assert.strictEqual('2015-12-29 02:11:01', d1.dateAdd('h', 1).date2Str())
    assert.strictEqual('2015-12-29 01:11:01', d1.dateAdd('h', -1).date2Str())
  })
  it('dateAdd分', function () {
    assert.strictEqual('2015-12-29 01:12:01', d1.dateAdd('n', 1).date2Str())
    assert.strictEqual('2015-12-29 01:11:01', d1.dateAdd('n', -1).date2Str())
  })
  it('dateAdd秒', function () {
    assert.strictEqual('2015-12-29 01:11:02', d1.dateAdd('s', 1).date2Str())
    assert.strictEqual('2015-12-29 01:11:01', d1.dateAdd('s', -1).date2Str())
  })

  it('dateDiff', function () {
    // assert.strictEqual(0,d1.dateDiff('y',d2));
  })
})
describe('String原型扩展的单元测试', function () {
  it('render', function () {
    assert.strictEqual('<div></div>', '<{{d.tag}}></{{d.tag}}>'.render({ tag: 'div' }))
  })
  it('upperFirst', function () {
    assert.strictEqual('Ab', 'ab'.upperFirst())
    assert.strictEqual('Ab', 'AB'.upperFirst())
  })
  it('fillStr', function () {
    assert.strictEqual('abaaaa', 'ab'.fillStr('a', 6))
    assert.strictEqual('ab    ', 'ab'.fillStr(' ', 6))
    assert.strictEqual('ababab', 'ababab'.fillStr(' ', 6))
    assert.strictEqual('ababab', 'ababab'.fillStr(' ', 6, 1))
    assert.strictEqual('ababab', 'ababab'.fillStr(' ', 6, -1))
    assert.strictEqual('00000008', '8'.fillStr('0', 8, -1))
  })
  it('toMoney', function () {
    assert.strictEqual('-9,812,345,678.45678901', '-9812345678.45678901'.toMoney())
    assert.strictEqual('9,812,345,678.45678901', '9812345678.45678901'.toMoney())
    assert.strictEqual('-9,812,345,678.45', '-9812345678.45678901'.toMoney(2))
    assert.strictEqual('-9,812,345,678', '-9812345678.45678901'.toMoney(0))
    assert.strictEqual('0.45', '.45678901'.toMoney(2))
    assert.strictEqual('-0.45', '-.45678901'.toMoney(2))
    assert.strictEqual(2, 'abc'.toMoney(2))
  })
  it('replaceAll', function () {
    assert.strictEqual('aaaxxxccc', 'aaabbbccc'.replaceAll('b', 'x'))
  })
  it('times', function () {
    assert.strictEqual('xxx', 'x'.times(3))
    assert.strictEqual('', 'x'.times(0))
  })
  it('trim', function () {
    assert.strictEqual('xxx', ' xxx   '.trim())
    assert.strictEqual('x x x', ' x x x   '.trim())
  })
  it('toLow', function () {
    assert.strictEqual('abc1', 'ABC1'.toLow())
  })
  it('toUp', function () {
    assert.strictEqual('ABC1', 'abc1'.toUp())
  })
  it('format', function () {
    assert.strictEqual('abcdefg1', 'a{0}c{1}e{2}g{3}'.format('b', 'd', 'f', 1))
  })
  it('len', function () {
    assert.strictEqual(5, '我们a'.len())
  })
  it('toInt', function () {
    assert.strictEqual(12, '12.3'.toInt())
  })
  it('esHtml', function () {
    assert.strictEqual('&amp;&lt;&gt;', '&<>'.esHtml())
  })
  it('toHtml', function () {
    assert.strictEqual('&<>', '&amp;&lt;&gt;'.toHtml())
  })
  it('reHtml', function () {
    assert.strictEqual('xxyy', '<div><a>xx</a><div><div>yy</div>'.reHtml())
  })
  it('camelize', function () {
    assert.strictEqual('aBC', 'a-b-c'.camelize())
  })
  it('ac', function () {
    assert.strictEqual('ab c', 'ab'.ac('c'))
  })
  it('dc', function () {
    assert.strictEqual('ab', 'ab c'.dc('c'))
  })
  it('tc', function () {
    assert.strictEqual('ab c', 'ab'.tc('c'))
    assert.strictEqual('ab', 'ab c'.tc('c'))
  })
})
describe('Number原型扩展的单元测试', function () {
  it('round', function () {
    assert.strictEqual(1.123457, 1.123456789.round(6))
    assert.strictEqual(1, 1.123456789.round(0))
  })
})
describe('Buffer原型扩展的单元测试', function () {
  it('contact', function () {
    let buf = Buffer.from([1, 2])
    let buf1 = buf.contact(Buffer.from([3, 4]))
    assert.strictEqual(3, buf1[2])
  })
})
