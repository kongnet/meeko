/* global describe */
/* global it */
/* global BigInt */
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
describe('随机数的单元测试', function () {
  it('random', function () {
    assert.strictEqual($.tools.rnd(1, 1), 1)
    assert.strictEqual($.tools.rnd(100, 100), 100)
    assert.strictEqual($.tools.rnd(-100, -100), -100)
    assert.strictEqual($.tools.rnd(-1, -1), -1)
    assert.strictEqual($.tools.rnd(0, 0), 0)
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
  it('utf8&lzw', function () {
    assert.strictEqual($.tools.utf8.encode('你好abc'), 'ä½ å¥½abc')
    assert.strictEqual($.tools.utf8.decode('ä½ å¥½abc'), '你好abc')
    assert.strictEqual($.tools.lzw.compress($.tools.utf8.encode('你好abc')), 'Ã¤Â½Â Ã¥Âć½abc')
    assert.strictEqual($.tools.utf8.decode($.tools.lzw.uncompress('Ã¤Â½Â Ã¥Âć½abc')), '你好abc')
  })
  it('whichNetwork判断手机运营商', function () {
    assert.strictEqual($.fake.whichNetwork('13052887711'), 1)
    assert.strictEqual($.fake.whichNetwork('13852887711'), 0)
    assert.strictEqual($.fake.whichNetwork('19952887711'), 2)
    assert.strictEqual($.fake.whichNetwork('20052887711'), -1)
  })
  it('Snowflake', function () {
    let tempSnowflake = new $.Snowflake(1, 1, 0)
    let tempIds = []
    for (let i = 0; i < 100; i++) {
      let tempId = tempSnowflake.nextId()
      if (tempIds.indexOf(tempId) < 0) {
        tempIds.push(tempId)
      }
    }
    assert.strictEqual(tempIds.length, 100)
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
  it('isBigInt', function () {
    assert.strictEqual($.tools.isBigInt(1), false)
    assert.strictEqual($.tools.isBigInt({}), false)
    assert.strictEqual($.tools.isBigInt(BigInt(1)), true)
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
describe('pipe', function () {
  it('pipe', function () {
    let r = $.pipe(x => x.toUpperCase(), // 单词变大写
      a => a.split(''), // -----------------分成数组
      a => a[3], // ------------------------取下标3
      s => s.charCodeAt(0).toString(16), // 变为16进制
      s => s.fillStr('0', 4, -1), // -------不足4位部分左边填0
      s => `\\u${s}` // --------------------转成\uxxxx 形式
    )('Test') // ----------------------- => \u0054
    assert.strictEqual(`\\u0054`, r)
  })
})
