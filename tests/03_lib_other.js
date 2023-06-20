/* global BigInt */
'use strict'
const $ = require('../index')
const assert = require('assert')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}
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
    assertLog($.tools.rnd(1, 1), 1)
    assertLog($.tools.rnd(100, 100), 100)
    assertLog($.tools.rnd(-100, -100), -100)
    assertLog($.tools.rnd(-1, -1), -1)
    assertLog($.tools.rnd(0, 0), 0)
  })
})
describe('深copy测试', function () {
  it('deep copy', function () {
    assertLog($.tools.copy('1'), '1')
    assertLog($.tools.copy(1), 1)
    assertLog($.tools.copy('{'), '{')
    assertLog($.tools.copy(11), 11)
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
    assertLog($.tools.timeAgo(1558338047719, 1558338047719), '刚刚')
    assertLog($.tools.timeAgo(1558338047710, 1558338047719), '刚刚')
    assertLog($.tools.timeAgo(1558338047819, 1558338047710), '刚刚')
    assertLog($.tools.timeAgo('2016-1-1', '2016-1-1'), '刚刚')
    assertLog($.tools.timeAgo(1558338047719, 1558338046719), '1秒后')
    assertLog($.tools.timeAgo('2016-1-1', '2017-2-1'), '1年前')
    assertLog($.tools.timeAgo('2016-1-1', '2016-3-1'), '2个月前')
    assertLog($.tools.timeAgo('2016-1-1', '2016-1-16'), '15天前')
    assertLog($.tools.timeAgo('2016-1-1', '2016-1-1 1:13:01'), '1小时前')
    assertLog($.tools.timeAgo('2016-1-1', '2016-1-1 0:13:01'), '13分钟前')
    assertLog($.tools.timeAgo('2016-1-1', '2016-1-1 0:0:50'), '50秒前')
    assertLog($.tools.timeAgo('2018-1-1', '2017-1-1'), '1年后')
    assertLog($.tools.timeAgo('2016-3-1', '2016-1-1'), '2个月后')
    assertLog($.tools.timeAgo('2016-1-16', '2016-1-1'), '15天后')
    assertLog($.tools.timeAgo('2016-1-1 1:13:01', '2016-1-1'), '1小时后')
    assertLog($.tools.timeAgo('2016-1-1 0:13:01', '2016-1-1'), '13分钟后')
    assertLog($.tools.timeAgo('2016-1-1 0:0:50', '2016-1-1'), '50秒后')
    assertLog($.tools.timeAgo(new Date('2016-1-1'), new Date('2016-1-1 0:0:50')), '50秒前')
    assertLog($.tools.timeAgo(+new Date('2016-1-1'), +new Date('2016-1-1 0:0:50')), '50秒前')
    assertLog($.tools.timeAgo(new Date('2016-1-1 0:0:50').toISOString(), +new Date('2016-1-1')), '50秒后')
  })
})
describe('其他函数的单元测试', function () {
  it('wait', async function () {
    assertLog(undefined, await $.wait(10))
  })
  it('race', async function () {
    const step1 = async (t, a) => {
      await $.wait(t)
      return [200, 'ok ' + a]
    }
    let r = await $.tools.race(step1(1, 'x'), 5) // 不超时
    assertLog(r[0], 200)
    r = await $.tools.race(step1(5, 'x'), 2) //超时
    assertLog(r[0], 500)
  })
  it('ext', function () {
    assertLog(null, $.ext('', ''))
  })
  it('tools.ifObjEmpty', function () {
    assertLog(
      false,
      $.tools.ifObjEmpty({
        x: 1,
        y: 2
      })
    )
    assertLog(true, $.tools.ifObjEmpty({}))
    assertLog(
      false,
      $.tools.ifObjEmpty(
        {
          x: 1,
          y: 2
        },
        ['x']
      )
    )
    assertLog(
      true,
      $.tools.ifObjEmpty(
        {
          x: 1
        },
        ['x']
      )
    )
  })
  it('tools.jsonPack', function () {
    assert.deepStrictEqual(
      [
        ['abc', 'bac', 'cba'],
        [1, 2, 3],
        [11, 22, 33],
        [111, 222, 333]
      ],
      $.tools.jsonPack(
        [
          { bac: 2, abc: 1, cba: 3 },
          { cba: 33, bac: 22, abc: 11 },
          { bac: 222, cba: 333, abc: 111 }
        ],
        1
      )
    )
  })
  it('log', function () {
    assertLog(1, $.log(1, 2))
    assertLog(1, $.log({}, 2))
    assertLog(1, $.err(1, 2))
    assertLog(1, $.err({}, 2))
  })
  it('compare', function () {
    const items = [
      { name: 'a', lev: 1 },
      { name: 'b', lev: 2 }
    ]

    items.sort($.compare('lev', 'desc'))
    assert.deepStrictEqual(items, [
      { name: 'b', lev: 2 },
      { name: 'a', lev: 1 }
    ])
    items.sort($.compare('lev'))
    assert.deepStrictEqual(items, [
      { name: 'a', lev: 1 },
      { name: 'b', lev: 2 }
    ])
  })
  it('utf8&lzw', function () {
    assertLog($.tools.utf8.encode('你好abc'), 'ä½ å¥½abc')
    assertLog($.tools.utf8.decode('ä½ å¥½abc'), '你好abc')
    assertLog($.tools.lzw.compress($.tools.utf8.encode('你好abc')), 'Ã¤Â½Â Ã¥Âć½abc')
    assertLog($.tools.utf8.decode($.tools.lzw.uncompress('Ã¤Â½Â Ã¥Âć½abc')), '你好abc')
  })
  it('whichNetwork判断手机运营商', function () {
    assertLog($.fake.whichNetwork('13052887711'), 1)
    assertLog($.fake.whichNetwork('13852887711'), 0)
    assertLog($.fake.whichNetwork('19952887711'), 2)
    assertLog($.fake.whichNetwork('20052887711'), -1)
  })
  it('Snowflake', function () {
    const tempSnowflake = new $.Snowflake(1, 1, 0)
    const tempIds = []
    for (let i = 0; i < 10; i++) {
      const tempId = tempSnowflake.nextId()
      $.log(tempId)
      if (tempIds.indexOf(tempId) < 0) {
        tempIds.push(tempId)
      }
    }
    assertLog(tempIds.length, 10)
  })
})
describe('模板引擎单元测试', function () {
  it('tpl', function () {
    $.tpl.config()
    $.tpl.config({ open: '{{', close: '}}' })
    assertLog('Laytpl Error：no data', $.tpl([]).render())
    assertLog('Laytpl Error：Template not found', $.tpl([]).render({ tag: 'div' }))
    assertLog('<div></div>', $.tpl('<{{d.tag}}></{{d.tag}}>').render({ tag: 'div' }))
    assertLog('<di&amp;v></di&v>', $.tpl('<{{=d.tag}}></{{d.tag}}>').render({ tag: 'di&v' })) // =转义html标记
    assertLog('<></>', $.tpl('<{{=d.tag}}></{{d.tag}}>').render({ tag: '' })) // =转义html标记
    assertLog(true, $.tpl('<{{# 1+1 }></{{d.tag}}>').render({ tag: 'div' }).indexOf('Laytpl Error') >= 0) // 模板结构不对
  })
})
describe('判断类型函数单元测试', function () {
  it('getType', function () {
    assertLog($.tools.getType({}), 'Object')
    assertLog($.tools.getType(''), 'String')
    assertLog($.tools.getType(/[a-z]/g), 'RegExp')
    assertLog($.tools.getType(null), 'Null')
    let x
    assertLog($.tools.getType(x), 'Undefined')
  })
  it('isObj', function () {
    assertLog($.tools.isObj(null), false)
    assertLog($.tools.isObj(undefined), false)
    assertLog($.tools.isObj(''), false)
    assertLog($.tools.isObj(+'1x'), false)
    assertLog($.tools.isObj('1x'), false)
    assertLog($.tools.isObj(+'x1x'), false)
    assertLog($.tools.isObj(1), false)
    assertLog($.tools.isObj(0), false)
    assertLog($.tools.isObj(true), false)
    assertLog($.tools.isObj(false), false)
    assertLog($.tools.isObj([]), false)
    assertLog($.tools.isObj({}), true)
    assertLog($.tools.isObj(/a+/g), false)
    assertLog($.tools.isObj(1.1), false)
    assertLog($.tools.isObj(0.1), false)
    assertLog($.tools.isObj(-0.1), false)
    assertLog($.tools.isObj(new Date()), false)

    assertLog($.tools.isObj({}), true)
    assertLog($.tools.isObj(''), false)
  })
  it('isObject', function () {
    assertLog($.tools.isObject({}), true)
    assertLog($.tools.isObject(''), false)
  })
  it('isString', function () {
    assertLog($.tools.isString(null), false)
    assertLog($.tools.isString(undefined), false)
    assertLog($.tools.isString(''), true)
    assertLog($.tools.isString(+'1x'), false)
    assertLog($.tools.isString('1x'), true)
    assertLog($.tools.isObj(+'x1x'), false)
    assertLog($.tools.isString(1), false)
    assertLog($.tools.isString(0), false)
    assertLog($.tools.isString(true), false)
    assertLog($.tools.isString(false), false)
    assertLog($.tools.isString([]), false)
    assertLog($.tools.isString({}), false)
    assertLog($.tools.isString(/a+/g), false)
    assertLog($.tools.isString(1.1), false)
    assertLog($.tools.isString(0.1), false)
    assertLog($.tools.isString(-0.1), false)
    assertLog($.tools.isString(new Date()), false)

    assertLog($.tools.isString(''), true)
    assertLog($.tools.isString({}), false)
  })
  it('isNumber', function () {
    assertLog($.tools.isNumber(null), false)
    assertLog($.tools.isNumber(undefined), false)
    assertLog($.tools.isNumber(''), false)
    assertLog($.tools.isNumber(+'1x'), false)
    assertLog($.tools.isNumber(+'x1x'), false)
    assertLog($.tools.isNumber('1x'), false)
    assertLog($.tools.isNumber(1), true)
    assertLog($.tools.isNumber(0), true)
    assertLog($.tools.isNumber(true), false)
    assertLog($.tools.isNumber(false), false)
    assertLog($.tools.isNumber([]), false)
    assertLog($.tools.isNumber({}), false)
    assertLog($.tools.isNumber(/a+/g), false)
    assertLog($.tools.isNumber(1.1), true)
    assertLog($.tools.isNumber(0.1), true)
    assertLog($.tools.isNumber(-0.1), true)
    assertLog($.tools.isNumber(new Date()), false)

    assertLog($.tools.isNumber(1), true)
    assertLog($.tools.isNumber({}), false)
  })
  it('isBigInt', function () {
    assertLog($.tools.isBigInt(null), false)
    assertLog($.tools.isBigInt(undefined), false)
    assertLog($.tools.isBigInt(''), false)
    assertLog($.tools.isBigInt(+'1x'), false)
    assertLog($.tools.isBigInt(+'x1x'), false)
    assertLog($.tools.isBigInt('1x'), false)
    assertLog($.tools.isBigInt(1), false)
    assertLog($.tools.isBigInt(0), false)
    assertLog($.tools.isBigInt(true), false)
    assertLog($.tools.isBigInt(false), false)
    assertLog($.tools.isBigInt([]), false)
    assertLog($.tools.isBigInt({}), false)
    assertLog($.tools.isBigInt(/a+/g), false)
    assertLog($.tools.isBigInt(1.1), false)
    assertLog($.tools.isBigInt(0.1), false)
    assertLog($.tools.isBigInt(-0.1), false)
    assertLog($.tools.isBigInt(new Date()), false)

    assertLog($.tools.isBigInt(1), false)
    assertLog($.tools.isBigInt({}), false)
    assertLog($.tools.isBigInt(BigInt(1)), true)
  })
  it('isArray', function () {
    assertLog($.tools.isArray(null), false)
    assertLog($.tools.isArray(undefined), false)
    assertLog($.tools.isArray(''), false)
    assertLog($.tools.isArray(+'1x'), false)
    assertLog($.tools.isArray(+'x1x'), false)
    assertLog($.tools.isArray('1x'), false)
    assertLog($.tools.isArray(1), false)
    assertLog($.tools.isArray(0), false)
    assertLog($.tools.isArray(true), false)
    assertLog($.tools.isArray(false), false)
    assertLog($.tools.isArray([]), true)
    assertLog($.tools.isArray({}), false)
    assertLog($.tools.isArray(/a+/g), false)
    assertLog($.tools.isArray(1.1), false)
    assertLog($.tools.isArray(0.1), false)
    assertLog($.tools.isArray(-0.1), false)
    assertLog($.tools.isArray(new Date()), false)

    assertLog($.tools.isArray([]), true)
    assertLog($.tools.isArray({}), false)
  })
  it('isNull', function () {
    assertLog($.tools.isNull(null), true)
    assertLog($.tools.isNull(undefined), false)
    assertLog($.tools.isNull(''), false)
    assertLog($.tools.isNull(+'1x'), false)
    assertLog($.tools.isNull(+'x1x'), false)
    assertLog($.tools.isNull('1x'), false)
    assertLog($.tools.isNull(1), false)
    assertLog($.tools.isNull(0), false)
    assertLog($.tools.isNull(true), false)
    assertLog($.tools.isNull(false), false)
    assertLog($.tools.isNull([]), false)
    assertLog($.tools.isNull({}), false)
    assertLog($.tools.isNull(/a+/g), false)
    assertLog($.tools.isNull(1.1), false)
    assertLog($.tools.isNull(0.1), false)
    assertLog($.tools.isNull(-0.1), false)
    assertLog($.tools.isNull(new Date()), false)

    assertLog($.tools.isNull(null), true)
    assertLog($.tools.isNull({}), false)
  })
  it('isUndefined', function () {
    assertLog($.tools.isUndefined(null), false)
    assertLog($.tools.isUndefined(undefined), true)
    assertLog($.tools.isUndefined(''), false)
    assertLog($.tools.isUndefined(+'1x'), false)
    assertLog($.tools.isUndefined(+'x1x'), false)
    assertLog($.tools.isUndefined('1x'), false)
    assertLog($.tools.isUndefined(1), false)
    assertLog($.tools.isUndefined(0), false)
    assertLog($.tools.isUndefined(true), false)
    assertLog($.tools.isUndefined(false), false)
    assertLog($.tools.isUndefined([]), false)
    assertLog($.tools.isUndefined({}), false)
    assertLog($.tools.isUndefined(/a+/g), false)
    assertLog($.tools.isUndefined(1.1), false)
    assertLog($.tools.isUndefined(0.1), false)
    assertLog($.tools.isUndefined(-0.1), false)
    assertLog($.tools.isUndefined(new Date()), false)

    let a
    assertLog($.tools.isUndefined(a), true)
    assertLog($.tools.isUndefined({}), false)
  })
  it('isRegExp', function () {
    assertLog($.tools.isRegExp(null), false)
    assertLog($.tools.isRegExp(undefined), false)
    assertLog($.tools.isRegExp(''), false)
    assertLog($.tools.isRegExp(+'1x'), false)
    assertLog($.tools.isRegExp(+'x1x'), false)
    assertLog($.tools.isRegExp('1x'), false)
    assertLog($.tools.isRegExp(1), false)
    assertLog($.tools.isRegExp(0), false)
    assertLog($.tools.isRegExp(true), false)
    assertLog($.tools.isRegExp(false), false)
    assertLog($.tools.isRegExp([]), false)
    assertLog($.tools.isRegExp({}), false)
    assertLog($.tools.isRegExp(/a+/g), true)
    assertLog($.tools.isRegExp(1.1), false)
    assertLog($.tools.isRegExp(0.1), false)
    assertLog($.tools.isRegExp(-0.1), false)
    assertLog($.tools.isRegExp(new Date()), false)

    assertLog($.tools.isRegExp(/1+/g), true)
    assertLog($.tools.isRegExp({}), false)
  })
  it('isBoolean', function () {
    assertLog($.tools.isBoolean(null), false)
    assertLog($.tools.isBoolean(undefined), false)
    assertLog($.tools.isBoolean(''), false)
    assertLog($.tools.isBoolean(+'1x'), false)
    assertLog($.tools.isBoolean(+'x1x'), false)
    assertLog($.tools.isBoolean('1x'), false)
    assertLog($.tools.isBoolean(1), false)
    assertLog($.tools.isBoolean(0), false)
    assertLog($.tools.isBoolean(true), true)
    assertLog($.tools.isBoolean(false), true)
    assertLog($.tools.isBoolean([]), false)
    assertLog($.tools.isBoolean({}), false)
    assertLog($.tools.isBoolean(/a+/g), false)
    assertLog($.tools.isBoolean(1.1), false)
    assertLog($.tools.isBoolean(0.1), false)
    assertLog($.tools.isBoolean(-0.1), false)
    assertLog($.tools.isBoolean(new Date()), false)

    assertLog($.tools.isBoolean(true), true)
    assertLog($.tools.isBoolean({}), false)
  })
  it('isPInt', function () {
    assertLog($.tools.isPInt(null), false)
    assertLog($.tools.isPInt(undefined), false)
    assertLog($.tools.isPInt(''), false)
    assertLog($.tools.isPInt(+'1x'), false)
    assertLog($.tools.isPInt(+'x1x'), false)
    assertLog($.tools.isPInt('1x'), false)
    assertLog($.tools.isPInt(1), true)
    assertLog($.tools.isPInt(0), false)
    assertLog($.tools.isPInt(true), false)
    assertLog($.tools.isPInt(false), false)
    assertLog($.tools.isPInt([]), false)
    assertLog($.tools.isPInt({}), false)
    assertLog($.tools.isPInt(/a+/g), false)
    assertLog($.tools.isPInt(1.1), false)
    assertLog($.tools.isPInt(0.1), false)
    assertLog($.tools.isPInt(-0.1), false)
    assertLog($.tools.isPInt(new Date()), false)

    assertLog($.tools.isPInt(1), true)
    assertLog($.tools.isPInt('3'), true)
    assertLog($.tools.isPInt(1.1), false)
  })
  it('isNInt', function () {
    assertLog($.tools.isNInt(null), false)
    assertLog($.tools.isNInt(undefined), false)
    assertLog($.tools.isNInt(''), false)
    assertLog($.tools.isNInt(+'1x'), false)
    assertLog($.tools.isNInt(+'x1x'), false)
    assertLog($.tools.isNInt('1x'), false)
    assertLog($.tools.isNInt(1), false)
    assertLog($.tools.isNInt(0), false)
    assertLog($.tools.isNInt(true), false)
    assertLog($.tools.isNInt(false), false)
    assertLog($.tools.isNInt([]), false)
    assertLog($.tools.isNInt({}), false)
    assertLog($.tools.isNInt(/a+/g), false)
    assertLog($.tools.isNInt(1.1), false)
    assertLog($.tools.isNInt(0.1), false)
    assertLog($.tools.isNInt(-0.1), false)
    assertLog($.tools.isNInt(new Date()), false)

    assertLog($.tools.isNInt(-1), true)
    assertLog($.tools.isNInt('-1'), true)
    assertLog($.tools.isNInt(-1.1), false)
  })
  it('isInt', function () {
    assertLog($.tools.isInt(null), false)
    assertLog($.tools.isInt(undefined), false)
    assertLog($.tools.isInt(''), false)
    assertLog($.tools.isInt(+'1x'), false)
    assertLog($.tools.isInt(+'x1x'), false)
    assertLog($.tools.isInt('1x'), false)
    assertLog($.tools.isInt(1), true)
    assertLog($.tools.isInt(0), true)
    assertLog($.tools.isInt(true), false)
    assertLog($.tools.isInt(false), false)
    assertLog($.tools.isInt([]), false)
    assertLog($.tools.isInt({}), false)
    assertLog($.tools.isInt(/a+/g), false)
    assertLog($.tools.isInt(1.1), false)
    assertLog($.tools.isInt(0.1), false)
    assertLog($.tools.isInt(-0.1), false)
    assertLog($.tools.isInt(new Date()), false)

    assertLog($.tools.isInt(3), true)
    assertLog($.tools.isInt('-3'), true)
    assertLog($.tools.isInt('-2.3'), false)
  })
  it('isDecimal', function () {
    assertLog($.tools.isDecimal(null), false)
    assertLog($.tools.isDecimal(null + ''), false)
    assertLog($.tools.isDecimal(undefined), false)
    assertLog($.tools.isDecimal(undefined + ''), false)
    assertLog($.tools.isDecimal(''), false)
    assertLog($.tools.isDecimal(+'1x'), false)
    assertLog($.tools.isDecimal(+'x1x'), false)
    assertLog($.tools.isDecimal('1x'), false)
    assertLog($.tools.isDecimal(1), true)
    assertLog($.tools.isDecimal(0), true)
    assertLog($.tools.isDecimal(true), false)
    assertLog($.tools.isDecimal(false), false)
    assertLog($.tools.isDecimal([]), false)
    assertLog($.tools.isDecimal([] + ''), false)
    assertLog($.tools.isDecimal({}), false)
    assertLog($.tools.isDecimal(/a+/g), false)
    assertLog($.tools.isDecimal(1.1), true)
    assertLog($.tools.isDecimal(0.1), true)
    assertLog($.tools.isDecimal(-0.1), true)
    assertLog($.tools.isDecimal(new Date()), false)

    assertLog($.tools.isDecimal(1.22), true)
    assertLog($.tools.isDecimal('1.22'), true)
    assertLog($.tools.isDecimal('-1.22'), true)
    assertLog($.tools.isDecimal(-1.22), true)
    assertLog($.tools.isDecimal('--12.2'), false)
  })
  it('isBool', function () {
    assertLog($.tools.isBool(null), false)
    assertLog($.tools.isBool(undefined), false)
    assertLog($.tools.isBool(''), false)
    assertLog($.tools.isBool(+'1x'), false)
    assertLog($.tools.isBool(+'x1x'), false)
    assertLog($.tools.isBool('1x'), false)
    assertLog($.tools.isBool(1), true)
    assertLog($.tools.isBool(0), true)
    assertLog($.tools.isBool(true), true)
    assertLog($.tools.isBool(false), true)
    assertLog($.tools.isBool([]), false)
    assertLog($.tools.isBool({}), false)
    assertLog($.tools.isBool(/a+/g), false)
    assertLog($.tools.isBool(1.1), false)
    assertLog($.tools.isBool(0.1), false)
    assertLog($.tools.isBool(-0.1), false)
    assertLog($.tools.isBool(new Date()), false)

    assertLog($.tools.isBool('1'), true)
    assertLog($.tools.isBool('0'), true)
    assertLog($.tools.isBool('true'), true)
    assertLog($.tools.isBool('false'), true)
    assertLog($.tools.isBool('True'), true)
    assertLog($.tools.isBool('-2'), false)
  })
  it('isDate', function () {
    assertLog($.tools.isDate(null), false)
    assertLog($.tools.isDate('null'), false)
    assertLog($.tools.isDate(undefined), false)
    assertLog($.tools.isDate(''), false)
    assertLog($.tools.isDate(+'1x'), false)
    assertLog($.tools.isDate(+'x1x'), false)
    assertLog($.tools.isDate('1x'), false)
    assertLog($.tools.isDate(1), false)
    assertLog($.tools.isDate(0), false)
    assertLog($.tools.isDate(true), false)
    assertLog($.tools.isDate(false), false)
    assertLog($.tools.isDate([]), false)
    assertLog($.tools.isDate({}), false)
    assertLog($.tools.isDate(/a+/g), false)
    assertLog($.tools.isDate(1.1), false)
    assertLog($.tools.isDate(0.1), false)
    assertLog($.tools.isDate(-0.1), false)

    assertLog($.tools.isDate('2016-1-1'), true)
    assertLog($.tools.isDate('2016/1/1'), true)
    assertLog($.tools.isDate('2016.1.1'), false)
    assertLog($.tools.isDate(new Date()), true)
    assertLog($.tools.isDate('1'), false)
  })
})
describe('pipe', function () {
  it('pipe', function () {
    const r = $.pipe(
      x => x.toUpperCase(), // 单词变大写
      a => a.split(''), // -----------------分成数组
      a => a[3], // ------------------------取下标3
      s => s.charCodeAt(0).toString(16), // 变为16进制
      s => s.fillStr('0', 4, -1), // -------不足4位部分左边填0
      s => `\\u${s}` // --------------------转成\uxxxx 形式
    )('Test') // ----------------------- => \u0054
    assertLog('\\u0054', r)
  })
})
describe('obj2Url', function () {
  it('obj2Url', function () {
    assertLog('a=1&b=2&c=x', $.tools.obj2Url({ a: 1, b: 2, c: 'x' }))
  })
})
describe('hash digest', function () {
  it('hash md5', function () {
    assertLog('6a204bd89f3c8348afd5c77c717a097a', $.tools.hash('asdfasdf', 'md5', 'hex'))
  })
})

describe('objByString', function () {
  it('objByString', function () {
    const a = [{ x: { y: [1, 2] } }]
    assertLog(2, $.tools.objByString(a, '[0].x.y[1]'))
    assertLog(undefined, $.tools.objByString(a, '[0].x.y[2]'))
  })
})
describe('size', function () {
  it('size', function () {
    const a = { a: 1, b: { c: 1 } }
    assertLog(2, $.tools.size(a))
    assertLog(4, $.tools.size('😀'))
  })
})
describe('equals', function () {
  it('equals', function () {
    assertLog(
      true,
      $.tools.equals(
        {
          a: [2, { e: 3, h: { h: undefined } }],
          b: [new Date('2019-1-1 10:10:10'), 4],
          c: 'foo'
        },
        {
          a: [2, { h: { h: undefined }, e: 3 }],
          b: [new Date('2019-01-01 10:10:10'), 4],
          c: 'foo'
        }
      )
    )
    assertLog(true, $.tools.equals([1, 3, 5], [1, 2, 3, 4, 5, 6].filter($.tools.negate(n => n % 2 === 0))))
    assertLog(true, $.tools.equals(null, null))
    assertLog(true, $.tools.equals([null], [null]))
    assertLog(true, $.tools.equals(NaN, NaN))
    assertLog(true, $.tools.equals(undefined, undefined))
    assertLog(false, $.tools.equals(null, undefined))
    assertLog(false, $.tools.equals(NaN, undefined))
    assertLog(false, $.tools.equals(NaN, null))
  })
})
describe('fake 身份证check', function () {
  it('身份证check', function () {
    assertLog($.fake.checkIdCard.check('050107801003402'), false)
    assertLog($.fake.checkIdCard.check('032126198909252301'), false)
    assertLog($.fake.checkIdCard.check('6321261989092'), false)
    assertLog($.fake.checkIdCard.check('632126098909252301'), false)
    assertLog($.fake.checkIdCard.check('632126699909252301'), false)

    assertLog($.fake.checkIdCard.check('150105801003402'), true)
    assertLog($.fake.checkIdCard.check('160107801003402'), false)
    assertLog($.fake.checkIdCard.check('370831190112064909'), true)
    assertLog($.fake.checkIdCard.check('370831990112064909'), false)
    assertLog($.fake.checkIdCard.check('370831180112064909'), false)
    assertLog($.fake.checkIdCard.check('370831190112064901'), false)

    assertLog($.fake.checkIdCard.check('3708311901120649091'), false) // 非15 和18

    assertLog($.fake.checkIdCard.check('632126198909252302'), false)
    assertLog($.fake.checkIdCard.getId15('370831190112064909'), '370831011206490')
    assertLog($.fake.checkIdCard.getId15('632126890925230'), '632126890925230')
    assertLog($.fake.checkIdCard.getId15('63212689092520'), null)
    assertLog($.fake.checkIdCard.getId18('370831011206490'), '370831190112064909')
    assertLog($.fake.checkIdCard.getId18('370831190112064909'), '370831190112064909')
    assertLog(
      JSON.stringify($.fake.checkIdCard.getInfo('440902194012308005')),
      JSON.stringify({
        gender: '女',
        birthday: '1940-12-30',
        place: '广东省,茂名市,茂南区'
      })
    )
    assertLog(
      JSON.stringify($.fake.checkIdCard.getInfo('440902401230800')),
      JSON.stringify({
        gender: '女',
        birthday: '1940-12-30',
        place: '广东省,茂名市,茂南区'
      })
    )

    assertLog(
      JSON.stringify($.fake.checkIdCard.getInfo('610632192707287313')),
      JSON.stringify({
        gender: '男',
        birthday: '1927-07-28',
        place: '陕西省,延安市,黄陵县'
      })
    )
    assertLog(
      JSON.stringify($.fake.checkIdCard.getInfo('610632270728731')),
      JSON.stringify({
        gender: '男',
        birthday: '1927-07-28',
        place: '陕西省,延安市,黄陵县'
      })
    )

    assertLog($.fake.checkIdCard.getId18('63212619890925230'), null)
    assertLog($.fake.checkIdCard.check('932126198909252301'), false)
    assertLog($.fake.checkIdCard.check('632126298909252301'), false)
    assertLog($.fake.checkIdCard.check('632126198999252301'), false)
  })
})
