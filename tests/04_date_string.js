/* global $ */
'use strict'
const $ = require('../index')
const assert = require('assert')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}
describe('Date原型扩展的单元测试', function () {
  const d1 = new Date('2015-12-29 01:11:01')
  const d2 = new Date('2016-01-02 20:09:31')
  const d3 = new Date('2019-12-31 20:09:31')
  it('isLeap', function () {
    assertLog(false, d1.isLeap())
    assertLog(true, d2.isLeap())
    assertLog(false, d3.isLeap())
  })
  it('getQuarter', function () {
    assertLog(4, d1.getQuarter())
    assertLog(1, d2.getQuarter())
  })

  it('getWeek', function () {
    assertLog(53, d1.getWeek())
    assertLog(1, d2.getWeek())
    assertLog(53, d3.getWeek())
  })
  it('format', function () {
    assertLog('2015-12-29 01:11:01', d1.format())
    assertLog((+new Date('2015-12-29 01:11:01') / 1000) | 0, +d1.format('X'))
    assertLog('2015/12/29', d1.format('yyyy/MM/dd'))
    assertLog('2015/12/29/011101', d1.format('YYYY/MM/DD/HHmmss'))
    assertLog('20151229011101', d1.format('YYYYMMDDHHmmss'))
    assertLog('2015-12-29 01:11:01', d1.format('YYYY-MM-DD HH:mm:ss'))
    assertLog('2015-12-29 01:11:01', d1.format('yyyy-MM-dd hh:mm:ss'))
    assertLog('2015-12-29 01:11:01 53 4', d1.format('yyyy-MM-dd hh:mm:ss ww q'))
  })
  it('date2Str', function () {
    assertLog('2015-12-29 01:11:01', d1.date2Str())
    assertLog('2016-01-02 20:09:31', d2.date2Str())
  })
  it('date8', function () {
    assertLog('20151229', d1.date8())
    assertLog('20160102', d2.date8())
    assertLog('2016-01-02', d2.date8('-'))
  })
  it('dateAdd年', function () {
    assertLog('2016-12-29 01:11:01', d1.dateAdd('y', 1).date2Str())
    assertLog('2015-12-29 01:11:01', d1.dateAdd('y', -1).date2Str())
  })
  it('dateAdd季度', function () {
    assertLog('2016-03-29 01:11:01', d1.dateAdd('q', 1).date2Str())
    assertLog('2015-12-29 01:11:01', d1.dateAdd('q', -1).date2Str())
    assertLog('2015-12-29 01:11:01', d1.dateAdd('q', 0).date2Str())
  })
  it('dateAdd月', function () {
    assertLog('2016-01-29 01:11:01', d1.dateAdd('M', 1).date2Str())
    assertLog('2015-12-29 01:11:01', d1.dateAdd('M', -1).date2Str())
    assertLog('2015-12-29 01:11:01', d1.dateAdd('M', 0).date2Str())
    assertLog('2015-12-29 01:11:01', d1.offset('M', 0).date2Str())
  })
  it('dateAdd周', function () {
    assertLog('2016-01-05 01:11:01', d1.dateAdd('w', 1).date2Str())
    assertLog('2015-12-29 01:11:01', d1.dateAdd('w', -1).date2Str())
  })
  it('dateAdd日', function () {
    assertLog('2015-12-30 01:11:01', d1.dateAdd('d', 1).date2Str())
    assertLog('2015-12-29 01:11:01', d1.dateAdd('d', -1).date2Str())
  })
  it('dateAdd时', function () {
    assertLog('2015-12-29 02:11:01', d1.dateAdd('h', 1).date2Str())
    assertLog('2015-12-29 01:11:01', d1.dateAdd('h', -1).date2Str())
  })
  it('dateAdd分', function () {
    assertLog('2015-12-29 01:12:01', d1.dateAdd('m', 1).date2Str())
    assertLog('2015-12-29 01:11:01', d1.dateAdd('m', -1).date2Str())
  })
  it('dateAdd秒', function () {
    assertLog('2015-12-29 01:11:02', d1.dateAdd('s', 1).date2Str())
    assertLog('2015-12-29 01:11:01', d1.dateAdd('s', -1).date2Str())
  })

  it('dateDiff', function () {
    // assertLog(0,d1.dateDiff('y',d2));
  })
})
describe('String原型扩展的单元测试', function () {
  it('render', function () {
    assertLog('<div></div>', '<{{d.tag}}></{{d.tag}}>'.render({ tag: 'div' }))
  })
  it('upperFirst', function () {
    assertLog('Ab', 'ab'.upperFirst())
    assertLog('Ab', 'AB'.upperFirst())
  })
  it('fillStr', function () {
    assertLog('abaaaa', 'ab'.fillStr('a', 6))
    assertLog('ab    ', 'ab'.fillStr(' ', 6))
    assertLog('ababab', 'ababab'.fillStr(' ', 6))
    assertLog('ababab', 'ababab'.fillStr(' ', 6, 1))
    assertLog('ababab', 'ababab'.fillStr(' ', 6, -1))
    assertLog('00000008', '8'.fillStr('0', 8, -1))
  })
  it('toMoney', function () {
    assertLog('-9,812,345,678.45678901', '-9812345678.45678901'.toMoney(10))
    assertLog('9,812,345,678.45678901', '9812345678.45678901'.toMoney(10))
    assertLog('-9,812,345,678.45', '-9812345678.45678901'.toMoney(2))
    assertLog('-9,812,345,678', '-9812345678.45678901'.toMoney(0))
    assertLog('0.45', '.45678901'.toMoney(2))
    assertLog('-0.45', '-.45678901'.toMoney(2))
    assertLog(2, 'abc'.toMoney(2))
  })
  it('replaceAll', function () {
    assertLog('aaaxxxccc', 'aaabbbccc'.replaceAll('b', 'x'))
  })
  it('times', function () {
    assertLog('xxx', 'x'.times(3))
    assertLog('', 'x'.times(0))
  })
  it('trim', function () {
    assertLog('xxx', ' xxx   '.trim())
    assertLog('x x x', ' x x x   '.trim())
  })
  it('toLow', function () {
    assertLog('abc1', 'ABC1'.toLow())
  })
  it('toUp', function () {
    assertLog('ABC1', 'abc1'.toUp())
  })
  it('toDate', function () {
    assertLog(new Date('2019-01-01').date2Str(), '20190101'.toDate().date2Str())
    assertLog(new Date('2019-02-02 10:32:11').date2Str(), '2019-02-02 10:32:11'.toDate().date2Str())
    assertLog(-1, '20190155'.toDate())
    assertLog(-1, 'sadfasf'.toDate())
  })
  it('format', function () {
    assertLog('abcdefg1', 'a{0}c{1}e{2}g{3}'.format('b', 'd', 'f', 1))
  })
  it('len', function () {
    assertLog(5, '我们a'.len())
  })
  it('toInt', function () {
    assertLog(12, '12.3'.toInt())
  })
  it('esHtml', function () {
    assertLog('&amp;&lt;&gt;', '&<>'.esHtml())
  })
  it('toHtml', function () {
    assertLog('&<>', '&amp;&lt;&gt;'.toHtml())
  })
  it('reHtml', function () {
    assertLog('xxyy', '<div><a>xx</a><div><div>yy</div>'.reHtml())
  })
  it('camelize', function () {
    assertLog('aBC', 'a-b-c'.camelize())
    assertLog('aB1C1', 'a_b1_c1'.camelize('_'))
  })
  it('deCamelize', function () {
    assertLog('a-b-c', 'aBC'.deCamelize())
    assertLog('a_b1_c1', 'aB1C1'.deCamelize('_'))
  })
  it('ac', function () {
    assertLog('ab c', 'ab'.ac('c'))
  })
  it('dc', function () {
    assertLog('ab', 'ab c'.dc('c'))
  })
  it('tc', function () {
    assertLog('ab c', 'ab'.tc('c'))
    assertLog('ab', 'ab c'.tc('c'))
  })
})
