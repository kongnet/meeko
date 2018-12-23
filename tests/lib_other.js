/* global describe */
/* global it */
'use strict'
var $ = require('../index')
let assert = require('assert')

describe('uuid的单元测试', function () {
  it('有len', function () {
    assert.notStrictEqual('nUazy3Dk3u', $.tools.uuid(10, 64), 'nUazy3Dk3u')
  })
  it('无len', function () {
    assert.notStrictEqual('2EC9D207-DCA5-4D96-A397-F1371D053AEB', $.tools.uuid(), '2EC9D207-DCA5-4D96-A397-F1371D053AEB')
    assert.notStrictEqual('2EC9D207-DCA5-4D96-A397-F1371D053AEB', $.tools.uuid(null, 64), '2EC9D207-DCA5-4D96-A397-F1371D053AEB')
  })
})
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
  it('linearFitting', function () {
    assert.strictEqual(JSON.stringify($.math.linearFitting([1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 4, 3, 6, 9, 3, 5, 2, 5])), `{"slope":0.18333333333333332,"intercept":3.305555555555556,"r":0.04426829268292683}`)
  })
})
describe('Buffer原型扩展的单元测试', function () {
  it('contact', function () {
    let buf = Buffer.from([1, 2])
    let buf1 = buf.contact(Buffer.from([3, 4]))
    assert.strictEqual(3, buf1[2])
  })
})
describe('随机数的单元测试', function () {
  it('random', function () {
    assert.strictEqual($.tools.rnd(1, 1), 1)
    assert.strictEqual($.tools.rnd(100, 100), 100)
    assert.strictEqual($.tools.rnd(-100, -100), -100)
    assert.strictEqual($.tools.rnd(-1, -1), -1)
    assert.strictEqual($.tools.rnd(0, 0), 0)
  })
})
describe('utf8 & lzw测试', function () {
  it('utf8&lzw', function () {
    assert.strictEqual($.tools.utf8.encode('你好abc'), 'ä½ å¥½abc')
    assert.strictEqual($.tools.utf8.decode('ä½ å¥½abc'), '你好abc')
    assert.strictEqual($.tools.lzw.compress($.tools.utf8.encode('你好abc')), 'Ã¤Â½Â Ã¥Âć½abc')
    assert.strictEqual($.tools.utf8.decode($.tools.lzw.uncompress('Ã¤Â½Â Ã¥Âć½abc')), '你好abc')
  })
})
describe('深copy测试', function () {
  it('deep copy', function () {
    assert.strictEqual($.tools.copy('1'), '1')
    assert.strictEqual($.tools.copy(1), 1)
    assert.strictEqual($.tools.copy('{'), '{')
    assert.strictEqual($.tools.copy(11), 11)
    let a = {
      name1: 'x',
      n1: 1,
      a: 1,
      b: 2
    }
    let b = $.tools.copy(a)
    b.a = 2
    assert.notStrictEqual(a.a, b.a)
    a = [1, 1]
    b = $.tools.copy(a)
    b[0] = 2
    assert.notStrictEqual(a[0], b[0])
  })
})
describe('timeAgo测试', function () {
  it('timeAgo测试', function () {
    assert.strictEqual($.tools.timeAgo('2016-1-1', '2016-1-1'), '刚刚')
    assert.strictEqual($.tools.timeAgo('2016-1-1', '2017-2-1'), '1年前')
    assert.strictEqual($.tools.timeAgo('2016-1-1', '2016-3-1'), '2个月前')
    assert.strictEqual($.tools.timeAgo('2016-1-1', '2016-1-16'), '15天前')
    assert.strictEqual($.tools.timeAgo('2016-1-1', '2016-1-1 1:13:01'), '1小时前')
    assert.strictEqual($.tools.timeAgo('2016-1-1', '2016-1-1 0:13:01'), '13分钟前')
    assert.strictEqual($.tools.timeAgo('2016-1-1', '2016-1-1 0:0:50'), '50秒前')
    assert.strictEqual($.tools.timeAgo('2018-1-1', '2017-1-1'), '1年后')
    assert.strictEqual($.tools.timeAgo('2016-3-1', '2016-1-1'), '2个月后')
    assert.strictEqual($.tools.timeAgo('2016-1-16', '2016-1-1'), '15天后')
    assert.strictEqual($.tools.timeAgo('2016-1-1 1:13:01', '2016-1-1'), '1小时后')
    assert.strictEqual($.tools.timeAgo('2016-1-1 0:13:01', '2016-1-1'), '13分钟后')
    assert.strictEqual($.tools.timeAgo('2016-1-1 0:0:50', '2016-1-1'), '50秒后')
    assert.strictEqual($.tools.timeAgo(new Date('2016-1-1'), new Date('2016-1-1 0:0:50')), '50秒前')
    assert.strictEqual($.tools.timeAgo(+new Date('2016-1-1'), +new Date('2016-1-1 0:0:50')), '50秒前')
    assert.strictEqual($.tools.timeAgo((new Date('2016-1-1 0:0:50')).toISOString(), +new Date('2016-1-1')), '50秒后')
  })
})
describe('其他函数的单元测试', function () {
  it('wait', async function () {
    assert.strictEqual(undefined, await $.wait(10))
  })
  it('ext', function () {
    assert.strictEqual(null, $.ext('', ''))
  })
  it('tools.ifObjEmpty', function () {
    assert.strictEqual(false, $.tools.ifObjEmpty({
      x: 1,
      y: 2
    }))
    assert.strictEqual(true, $.tools.ifObjEmpty({}))
    assert.strictEqual(false, $.tools.ifObjEmpty({
      x: 1,
      y: 2
    }, ['x']))
    assert.strictEqual(true, $.tools.ifObjEmpty({
      x: 1
    }, ['x']))
  })
  it('tools.jsonPack', function () {
    assert.deepStrictEqual([['abc', 'bac', 'cba'], [1, 2, 3], [11, 22, 33], [111, 222, 333]], $.tools.jsonPack([{ bac: 2, abc: 1, cba: 3 }, { cba: 33, bac: 22, abc: 11 }, { bac: 222, cba: 333, abc: 111 }], 1))
  })
  it('log', function () {
    assert.strictEqual(1, $.log(1, 2))
    assert.strictEqual(1, $.log({}, 2))
    assert.strictEqual(1, $.err(1, 2))
    assert.strictEqual(1, $.err({}, 2))
  })
  it('compare', function () {
    let items = [{ 'name': 'a', lev: 1 }, { name: 'b', lev: 2 }]
    assert.deepStrictEqual(items.sort($.compare('lev', 'desc')), [{ 'name': 'b', lev: 2 }, { name: 'a', lev: 1 }])
    assert.deepStrictEqual(items.sort($.compare('lev')), [{ 'name': 'a', lev: 1 }, { name: 'b', lev: 2 }])
  })
})
describe('模板引擎单元测试', function () {
  it('tpl', function () {
    $.tpl.config()
    $.tpl.config({ open: '{{', close: '}}' })
    assert.strictEqual('Laytpl Error：no data', $.tpl([]).render())
    assert.strictEqual('Laytpl Error：Template not found', $.tpl([]).render({ tag: 'div' }))
    assert.strictEqual('<div></div>', $.tpl('<{{d.tag}}></{{d.tag}}>').render({ tag: 'div' }))
    assert.strictEqual('<di&amp;v></di&v>', $.tpl('<{{=d.tag}}></{{d.tag}}>').render({ tag: 'di&v' }))// =转义html标记
    assert.strictEqual('<></>', $.tpl('<{{=d.tag}}></{{d.tag}}>').render({ tag: '' }))// =转义html标记
    assert.strictEqual(true, $.tpl('<{{# 1+1 }></{{d.tag}}>').render({ tag: 'div' }).indexOf('Laytpl Error') >= 0)// 模板结构不对
  })
})
describe('判断类型函数单元测试', function () {
  it('getType', function () {
    assert.strictEqual($.tools.getType({}), 'Object')
    assert.strictEqual($.tools.getType(''), 'String')
    assert.strictEqual($.tools.getType(/[a-z]/g), 'RegExp')
    assert.strictEqual($.tools.getType(null), 'Null')
    let x
    assert.strictEqual($.tools.getType(x), 'Undefined')
  })
  it('isObj', function () {
    assert.strictEqual($.tools.isObj({}), true)
    assert.strictEqual($.tools.isObj(''), false)
  })
  it('isObject', function () {
    assert.strictEqual($.tools.isObject({}), true)
    assert.strictEqual($.tools.isObject(''), false)
  })
  it('isString', function () {
    assert.strictEqual($.tools.isString(''), true)
    assert.strictEqual($.tools.isString({}), false)
  })
  it('isNumber', function () {
    assert.strictEqual($.tools.isNumber(1), true)
    assert.strictEqual($.tools.isNumber({}), false)
  })
  it('isArray', function () {
    assert.strictEqual($.tools.isArray([]), true)
    assert.strictEqual($.tools.isArray({}), false)
  })
  it('isNull', function () {
    assert.strictEqual($.tools.isNull(null), true)
    assert.strictEqual($.tools.isNull({}), false)
  })
  it('isUndefined', function () {
    let a
    assert.strictEqual($.tools.isUndefined(a), true)
    assert.strictEqual($.tools.isUndefined({}), false)
  })
  it('isRegExp', function () {
    assert.strictEqual($.tools.isRegExp(/1+/g), true)
    assert.strictEqual($.tools.isRegExp({}), false)
  })
  it('isBoolean', function () {
    assert.strictEqual($.tools.isBoolean(true), true)
    assert.strictEqual($.tools.isBoolean({}), false)
  })
  it('isPInt', function () {
    assert.strictEqual($.tools.isPInt(1), true)
    assert.strictEqual($.tools.isPInt('3'), true)
    assert.strictEqual($.tools.isPInt(1.1), false)
  })
  it('isNInt', function () {
    assert.strictEqual($.tools.isNInt(-1), true)
    assert.strictEqual($.tools.isNInt('-1'), true)
    assert.strictEqual($.tools.isNInt(-1.1), false)
  })
  it('isInt', function () {
    assert.strictEqual($.tools.isInt(3), true)
    assert.strictEqual($.tools.isInt('-3'), true)
    assert.strictEqual($.tools.isInt('-2.3'), false)
  })
  it('isDecimal', function () {
    assert.strictEqual($.tools.isDecimal(1.22), true)
    assert.strictEqual($.tools.isDecimal('1.22'), true)
    assert.strictEqual($.tools.isDecimal('-1.22'), true)
    assert.strictEqual($.tools.isDecimal(-1.22), true)
    assert.strictEqual($.tools.isDecimal('--12.2'), false)
  })
  it('isBool', function () {
    assert.strictEqual($.tools.isBool('True'), true)
    assert.strictEqual($.tools.isBool('-2'), false)
  })
  it('isDate', function () {
    assert.strictEqual($.tools.isDate('2016-1-1'), true)
    assert.strictEqual($.tools.isDate('2016/1/1'), true)
    assert.strictEqual($.tools.isDate('2016.1.1'), false)
    assert.strictEqual($.tools.isDate(new Date()), true)
    assert.strictEqual($.tools.isDate('1'), false)
  })
})
describe('判断手机运营商', function () {
  it('whichNetwork', function () {
    assert.strictEqual($.fake.whichNetwork('13052887711'), 1)
    assert.strictEqual($.fake.whichNetwork('13852887711'), 0)
    assert.strictEqual($.fake.whichNetwork('19952887711'), 2)
    assert.strictEqual($.fake.whichNetwork('20052887711'), -1)
  })
})