'use strict'
global.assertCount = 0
const $ = require('../index')
const assert = require('assert')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}
const b = {
  id: {
    desc: 'id',
    req: 1,
    type: 'int',
    size: [-1, 1]
  },
  id1: {
    desc: 'id1',
    type: 'int',
    def: 2
  },
  name: {
    desc: '节点名称'
  },
  name1: {
    desc: '节点名称1',
    req: 1,
    type: 'string',
    size: [1, 2]
  },
  n1: {
    desc: '数值节点1',
    req: 1,
    type: 'number',
    size: [-1, 1]
  },
  url: {
    desc: '必须是url',
    reg: /^https?:\/\/[^/]+/
  },
  code: {
    desc: '节点编码',
    type: 'bool'
  },
  rights: {
    name: '权限字段',
    desc: '节点权限',
    type: 'positive',
    size: [-1, 1]
  },
  description: {
    desc: '节点详情',
    type: 'negative',
    size: [-1, 1]
  },
  type: {
    desc: '节点类型',
    type: 'number'
  },
  datetime: {
    desc: '节点类型',
    type: 'datetime'
  },
  datetime1: {
    desc: '节点类型',
    type: 'datetime',
    def: '#now()'
  },
  d2: {
    desc: '节点类型',
    type: 'd2'
  },
  array1: {
    desc: '数组类型',
    type: 'array'
  },
  array2: {
    desc: '数组类型',
    type: 'array',
    items: {
      type: 'int'
    }
  },
  enum: {
    desc: '枚举类型',
    type: 'enum',
    req: 1,
    size: [1, '2', 'pedding']
  },
  enum1: {
    desc: '枚举类型',
    type: 'enum',
    size: ['pedding']
  },
  file: {
    name: 'file',
    desc: '上传的file组件id',
    type: 'file',
    size: [0, 1024 * 1024 * 0.2],
    fileType: ['image/png', 'image/jpeg']
  }
}
describe('checkParam的单元测试', function () {
  assertLog(1, $.log($.c.cls + $.c.xy(0, 0)))
  it('int', function () {
    let a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 2
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x'
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: undefined
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: null
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: ''
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 'true'
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 'false'
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: true
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: false
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: -1
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 0
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1.9
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      id1: 0
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      id1: null
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
  })
  it('string', function () {
    let a = {
      enum: 1,
      name1: ' x ', // string类型默认会trim
      n1: 1,
      id: 1,
      name: 1
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      name: undefined
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      name: null
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      name: ''
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      name: 'abc'
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      name: true
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      name: false
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      name: -1
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      name: 0
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      name: 1.9
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
  })
  it('string正则测试：url', function () {
    let a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      url: 1
    }
    assertLog(401, $.tools.checkParam(a, b).code, '被测试数据：' + JSON.stringify(a))
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1
    }
    assertLog(200, $.tools.checkParam(a, b).code, '被测试数据：' + JSON.stringify(a))
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      url: undefined
    }
    assertLog(200, $.tools.checkParam(a, b).code, '被测试数据：' + JSON.stringify(a))
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      url: null
    }
    assertLog(401, $.tools.checkParam(a, b).code, '被测试数据：' + JSON.stringify(a))
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      url: ''
    }
    assertLog(200, $.tools.checkParam(a, b).code, '被测试数据：' + JSON.stringify(a))
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      url: 'abc'
    }
    assertLog(401, $.tools.checkParam(a, b).code, '被测试数据：' + JSON.stringify(a))
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      url: true
    }
    assertLog(401, $.tools.checkParam(a, b).code, '被测试数据：' + JSON.stringify(a))
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      url: false
    }
    assertLog(401, $.tools.checkParam(a, b).code, '被测试数据：' + JSON.stringify(a))
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      url: -1
    }
    assertLog(401, $.tools.checkParam(a, b).code, '被测试数据：' + JSON.stringify(a))
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      url: 0
    }
    assertLog(401, $.tools.checkParam(a, b).code, '被测试数据：' + JSON.stringify(a))
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      url: 1.9
    }
    assertLog(401, $.tools.checkParam(a, b).code, '被测试数据：' + JSON.stringify(a))
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      url: 'https://www.npmjs.com/package/meeko'
    }
    assertLog(200, $.tools.checkParam(a, b).code, '被测试数据：' + JSON.stringify(a))
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      url: 'http://www.npmjs.com/package/meeko'
    }
    assertLog(200, $.tools.checkParam(a, b).code, '被测试数据：' + JSON.stringify(a))
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      url: 'https://'
    }
    assertLog(401, $.tools.checkParam(a, b).code, '被测试数据：' + JSON.stringify(a))
  })
  it('bool', function () {
    let a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      code: 1
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      code: undefined
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      code: null
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      code: ''
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      code: 'abc'
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      code: true
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      code: false
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)

    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      code: 'true'
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      code: 'false'
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)

    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      code: '0'
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      code: '1'
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)

    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      code: -1
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      code: 0
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      code: 1.9
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
  })
  it('positive', function () {
    let a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      rights: 1
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      rights: 2
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      rights: undefined
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      rights: null
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      rights: ''
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      rights: 'abc'
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      rights: true
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      rights: false
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      rights: -1
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      rights: 0
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      rights: 1.9
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
  })
  it('negative', function () {
    let a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      description: 1
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      description: -1
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      description: -2
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      description: undefined
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      description: null
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      description: ''
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      description: 'abc'
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      description: true
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      description: false
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      description: -1
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      description: 0
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      description: 1.9
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
  })
  it('number', function () {
    let a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      type: 1
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      type: undefined
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      type: null
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      type: ''
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      type: 'abc'
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      type: true
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      type: false
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      type: -1
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      type: 0
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      type: 1.9
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
  })
  it('datetime', function () {
    let a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime: 1
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime: undefined
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime: null
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime: ''
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime: 'abc'
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime: true
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime: false
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime: -1
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime: 0
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime: 1.9
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime: '1999-06-06 12:0:0'
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime: '2016-01-05T11:22:20.527Z'
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
  })
  it('datetime1', function () {
    let a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime1: 1
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime1: undefined
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime1: null
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime1: ''
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime1: 'abc'
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime1: true
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime1: false
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime1: -1
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime1: 0
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime1: 1.9
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime1: '1999-06-06 12:0:0'
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime1: '2016-01-05T11:22:20.527Z'
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
  })
  it('array1', function () {
    let a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      array1: 1
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      array1: null
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      array1: ''
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      array1: 0
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      array1: 1.9
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      array1: '1999-06-06 12:0:0'
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      array1: '2016-01-05T11:22:20.527Z'
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
  })
  it('array1 正向测试', function () {
    let a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      array1: []
    }
    assertLog(200, $.tools.checkParam(a, b).code, '被测试数据：' + JSON.stringify(a))
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      array1: ['jjhh', '', '4r59ew5es4', '4445']
    }
    assertLog(200, $.tools.checkParam(a, b).code, '被测试数据：' + JSON.stringify(a))
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      array1: [123, 321, 55.2, 11]
    }
    assertLog(401, $.tools.checkParam(a, b).code, '被测试数据：' + JSON.stringify(a))
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      array1: [123, 321, 55, 11]
    }
    assertLog(401, $.tools.checkParam(a, b).code, '被测试数据：' + JSON.stringify(a))
  })
  it('array2', function () {
    let a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      array2: 1
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      array2: undefined
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      array2: null
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      array2: ''
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      array2: 0
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      array2: 1.9
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      array2: '1999-06-06 12:0:0'
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      array2: '2016-01-05T11:22:20.527Z'
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      array2: []
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      array2: ['jjhh', '', '4r59ew5es4', '4445']
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      array2: [123, 321, 55.2, 11]
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      array2: [123, 321, 55, 11]
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      id: 1
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: '',
      id: 1
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      id: 1
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 0,
      id: 1
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: -0.1,
      id: 1
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: -1.1,
      id: 1
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'xcc',
      n1: -0.1,
      id: 1
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
  })
  it('enum', function () {
    let a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: '1',
      name1: 'x',
      n1: 1,
      id: 1
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      name1: 'x',
      n1: 1,
      id: 1
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: undefined,
      name1: 'x',
      n1: 1,
      id: 1
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: null,
      name1: 'x',
      n1: 1,
      id: 1
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: NaN,
      name1: 'x',
      n1: 1,
      id: 1
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
  })
  it('enum1', function () {
    const a = {
      enum: 1,
      enum1: [1, 2],
      name1: 'x',
      n1: 1,
      id: 1
    }
    assertLog(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
  })
  it('file', function () {
    b.file.req = 1
    const a = {
      enum: 1,
      enum1: 'pedding',
      name1: 'x',
      n1: 1,
      id: 1,
      file: [{ size: 1024, type: 'image/jpeg' }]
    }
    assertLog(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
  })
  it('default', function () {
    const a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      d2: 1
    }
    assertLog(500, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
  })
})
