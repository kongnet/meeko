/* global describe */
/* global it */
'use strict'
var $ = require('../index')
let assert = require('assert')
var b = {
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
    type: 'enum'
  }
}
describe('checkParam的单元测试', function () {
  assert.strictEqual(1, $.log($.c.cls + $.c.xy(0, 0)))
  it('int', function * () {
    yield $.tools.wait(1)
    let a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 2
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x'
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: undefined
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: null
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: ''
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 'true'
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 'false'
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: true
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: false
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: -1
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 0
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1.9
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      id1: 0
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      id1: null
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
  })
  it('string', function () {
    let a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      name: 1
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      name: undefined
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      name: null
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      name: ''
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      name: 'abc'
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      name: true
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      name: false
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      name: -1
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      name: 0
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      name: 1.9
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
  })
  it('string正则测试：url', function () {
    let a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      url: 1
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, '被测试数据：' + JSON.stringify(a))
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, '被测试数据：' + JSON.stringify(a))
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      url: undefined
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, '被测试数据：' + JSON.stringify(a))
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      url: null
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, '被测试数据：' + JSON.stringify(a))
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      url: ''
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, '被测试数据：' + JSON.stringify(a))
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      url: 'abc'
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, '被测试数据：' + JSON.stringify(a))
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      url: true
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, '被测试数据：' + JSON.stringify(a))
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      url: false
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, '被测试数据：' + JSON.stringify(a))
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      url: -1
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, '被测试数据：' + JSON.stringify(a))
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      url: 0
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, '被测试数据：' + JSON.stringify(a))
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      url: 1.9
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, '被测试数据：' + JSON.stringify(a))
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      url: 'https://www.npmjs.com/package/meeko'
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, '被测试数据：' + JSON.stringify(a))
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      url: 'http://www.npmjs.com/package/meeko'
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, '被测试数据：' + JSON.stringify(a))
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      url: 'https://'
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, '被测试数据：' + JSON.stringify(a))
  })
  it('bool', function () {
    let a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      code: 1
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      code: undefined
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      code: null
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      code: ''
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      code: 'abc'
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      code: true
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      code: false
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)

    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      code: 'true'
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      code: 'false'
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)

    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      code: '0'
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      code: '1'
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)

    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      code: -1
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      code: 0
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      code: 1.9
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
  })
  it('positive', function () {
    let a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      rights: 1
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      rights: 2
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      rights: undefined
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      rights: null
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      rights: ''
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      rights: 'abc'
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      rights: true
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      rights: false
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      rights: -1
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      rights: 0
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      rights: 1.9
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
  })
  it('negative', function () {
    let a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      description: 1
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      description: -1
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      description: -2
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      description: undefined
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      description: null
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      description: ''
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      description: 'abc'
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      description: true
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      description: false
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      description: -1
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      description: 0
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      description: 1.9
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
  })
  it('number', function () {
    let a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      type: 1
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      type: undefined
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      type: null
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      type: ''
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      type: 'abc'
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      type: true
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      type: false
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      type: -1
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      type: 0
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      type: 1.9
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
  })
  it('datetime', function () {
    let a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime: 1
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime: undefined
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime: null
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime: ''
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime: 'abc'
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime: true
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime: false
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime: -1
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime: 0
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime: 1.9
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime: '1999-06-06 12:0:0'
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime: '2016-01-05T11:22:20.527Z'
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
  })
  it('datetime1', function () {
    let a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime1: 1
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime1: undefined
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime1: null
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime1: ''
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime1: 'abc'
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime1: true
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime1: false
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime1: -1
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime1: 0
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime1: 1.9
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime1: '1999-06-06 12:0:0'
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      datetime1: '2016-01-05T11:22:20.527Z'
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
  })
  it('array1', function () {
    let a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      array1: 1
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      array1: null
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      array1: ''
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      array1: 0
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      array1: 1.9
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      array1: '1999-06-06 12:0:0'
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      array1: '2016-01-05T11:22:20.527Z'
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
  })
  it('array1 正向测试', function () {
    let a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      array1: []
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, '被测试数据：' + JSON.stringify(a))
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      array1: ['jjhh', '', '4r59ew5es4', '4445']
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, '被测试数据：' + JSON.stringify(a))
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      array1: [123, 321, 55.2, 11]
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, '被测试数据：' + JSON.stringify(a))
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      array1: [123, 321, 55, 11]
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, '被测试数据：' + JSON.stringify(a))
  })
  it('array2', function () {
    let a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      array2: 1
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      array2: undefined
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      array2: null
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      array2: ''
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      array2: 0
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      array2: 1.9
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      array2: '1999-06-06 12:0:0'
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      array2: '2016-01-05T11:22:20.527Z'
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      array2: []
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      array2: ['jjhh', '', '4r59ew5es4', '4445']
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      array2: [123, 321, 55.2, 11]
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      array2: [123, 321, 55, 11]
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      id: 1
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: '',
      id: 1
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      id: 1
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: 0,
      id: 1
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: -0.1,
      id: 1
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'x',
      n1: -1.1,
      id: 1
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: 1,
      name1: 'xcc',
      n1: -0.1,
      id: 1
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
  })
  it('enum', function () {
    let a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1
    }
    assert.strictEqual(200, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: '1',
      name1: 'x',
      n1: 1,
      id: 1
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      name1: 'x',
      n1: 1,
      id: 1
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: undefined,
      name1: 'x',
      n1: 1,
      id: 1
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: null,
      name1: 'x',
      n1: 1,
      id: 1
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
    a = {
      enum: NaN,
      name1: 'x',
      n1: 1,
      id: 1
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
  })
  it('enum1', function () {
    let a = {
      enum: 1,
      enum1: 1,
      name1: 'x',
      n1: 1,
      id: 1
    }
    assert.strictEqual(401, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
  })
  it('default', function () {
    let a = {
      enum: 1,
      name1: 'x',
      n1: 1,
      id: 1,
      d2: 1
    }
    assert.strictEqual(500, $.tools.checkParam(a, b).code, $.tools.checkParam(a, b).msg)
  })
})
