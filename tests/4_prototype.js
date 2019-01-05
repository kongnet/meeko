/* global describe */
/* global it */
/* global BigInt */
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
describe('Array原型扩展的单元测试', function () {
  it('copy', function () {
    assert.strictEqual([1].copy()[0], 1)
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
  it('unique', function () {
    assert.strictEqual(JSON.stringify([undefined, null, 1, 1, '1', '1', null, undefined, NaN, NaN].unique()), JSON.stringify([undefined, null, 1, '1', NaN]))
  })
  it('mean', function () {
    assert.strictEqual([1, 2, 3, 4, 5].mean(), 3)
  })
  it('median', function () {
    assert.strictEqual([1, 2, 3, 4, 5, 6].median(), 3.5)
    assert.strictEqual([1, 2, 3, 4, 5].median(), 3)
    assert.strictEqual([].median(), 0)
  })
  it('variance', function () {
    assert.strictEqual([1, 2, 3, 4, 5].variance(), 2)
  })
  it('remove', function () {
    assert.strictEqual([1, 2, 3, 4, 5].remove()[0], 2)
    assert.strictEqual([1, 2, 3, 4, 5].remove(1, 2)[1], 4)
  })
  it('stddev', function () {
    assert.strictEqual([1, 2, 3, 4, 5].stddev(), 1.4142135623730951)
  })
})
describe('Math扩展函数的单元测试', function () {
  it('num2e', function () {
    assert.strictEqual($.math.num2e(0.00000129466), '1.2947e-6')
    assert.strictEqual($.math.num2e(0.00000129466, 1), '1.3e-6')
  })
  it('mean', function () {
    assert.strictEqual($.math.mean([1, 2, 3, 4, 5]), 3)
  })
  it('min', function () {
    assert.strictEqual($.math.min([1, 2, 3, 4, 5]), 1)
  })
  it('max', function () {
    assert.strictEqual($.math.max([1, 2, 3, 4, 5]), 5)
  })
  it('median', function () {
    assert.strictEqual($.math.median([1, 2, 3, 4, 5, 6]), 3.5)
    assert.strictEqual($.math.median([1, 2, 3, 4, 5]), 3)
    assert.strictEqual($.math.median([]), 0)
  })
  it('variance', function () {
    assert.strictEqual($.math.variance([1, 2, 3, 4, 5]), 2)
  })
  it('stddev', function () {
    assert.strictEqual($.math.stddev([1, 2, 3, 4, 5]), 1.4142135623730951)
  })
  let rst = $.math.linearFitting([1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 4, 3, 6, 9, 3, 5, 2, 5])
  it(`linearFitting ${rst.f}`, function () {
    assert.strictEqual(JSON.stringify(rst), `{"a":0.18333333333333332,"b":3.305555555555556,"r":0.04426829268292683,"f":"y=0.1833*x+3.3056 R^2=0.0443"}`)
  })
  let rst1 = $.math.exponentFitting([1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 4, 3, 6, 9, 3, 5, 2, 5])
  it(`exponentFitting ${rst1.f}`, function () {
    assert.strictEqual(JSON.stringify(rst1), `{"a":2.4241733882720133,"b":0.07811356958381002,"r":0.10831424034090119,"f":"y=2.4242*e^(0.0781*x) R^2=0.1083"}`)
  })
  let rst2 = $.math.lnFitting([1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 4, 3, 6, 9, 3, 5, 2, 5])
  it(`lnFitting ${rst2.f}`, function () {
    assert.strictEqual(JSON.stringify(rst2), `{"a":1.224733441070464,"b":2.480130419814377,"r":0.1362718140723164,"f":"y=1.2247*ln(x)+2.4801 R^2=0.1363"}`)
  })
  let rst3 = $.math.powerFitting([1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 4, 3, 6, 9, 3, 5, 2, 5])
  it(`powerFitting ${rst3.f}`, function () {
    assert.strictEqual(JSON.stringify(rst3), `{"a":1.8454140471460965,"b":0.46635474401809107,"r":0.26630441651302567,"f":"y=1.8454*x^0.4664 R^2=0.2663"}`)
  })
  let rst4 = $.math.pearson([56, 97, 76, 59, 86, 62, 32, 69, 75, 79, 36, 70, 48, 57, 86, 88, 92, 85, 75, 48], [8, 45, 35, 12, 37, 24, 5, 21, 36, 32, 10, 27, 15, 19, 41, 50, 39, 42, 35, 17])
  it(`pearson相关指数`, function () {
    assert.strictEqual(rst4.toFixed(3), '0.931')
  })
})
describe('Buffer原型扩展的单元测试', function () {
  it('contact', function () {
    let buf = Buffer.from([1, 2])
    let buf1 = buf.contact(Buffer.from([3, 4]))
    assert.strictEqual(3, buf1[2])
  })
})
