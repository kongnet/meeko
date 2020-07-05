'use strict'
const $ = require('../index')
const path = require('path')
const assert = require('assert')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}
let r =
  'a(?!p)(?=p)((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))'
console.log($.reg.gen(r))
r = '[\u4e00-\u9fa5\xff]{10,20}'

console.log($.reg.gen(r))
r = '^-([1-9]\\d*\\.\\d*|0\\.\\d*[1-9]\\d*)$'
console.log($.reg.gen(r))
r = ''
console.log($.reg.gen(r))
r =
  '^\\0\\cXabc\\01\\xff\\o\u0000.[\\b]\\b\\B\\d[0-9]\\D\\f\\n\\r\\s\\S\\t\\v\\w[a-zA-Z0-9]\\W[^a-zA-Z0-9]+\\o.*$'
console.log($.reg.gen(r))
r = '(http|https|ftp|ws|wss):\\/{2}[a-z]+\\.com'
console.log($.reg.gen(r))
r = '\\w[-\\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\\.)+[A-Za-z]{2,14}'
console.log($.reg.gen(r))
r = '(你|我|他)'
console.log($.reg.gen(r))
r = '-[1-9][0-9]{2,10}'
console.log($.reg.gen(r))
try {
  $.requireAll(__dirname)
} catch (e) {
  console.log(e.toString())
}
try {
  $.requireAll(path.join(__dirname, 'x'))
} catch (e) {
  console.log(e.toString())
}
r = $.requireAll({
  dirname: __dirname,
  filter: /^r[a-z_\\.]+$/g
})
r = $.requireAll({
  dirname: path.join(__dirname, '..', 'lib'),
  filter: function (fileName) {
    // $.log(fileName)
  },
  map: function (name) {
    return name.replace(/_([a-z])/g, function (m, c) {
      return c.toUpperCase()
    })
  }
})
$.log($.fake.randData(['3', '1', 'u'], 3))
$.log($.fake.randData(null, 3))
$.log($.fake.randNum(3))
$.log($.fake.randStr(3))
$.log($.fake.randTime('2016-1-1', '2016-2-2'))
$.log($.fake.randName())
for (let i = 0; i < 10; i++) {
  $.log(`赵` + $.fake.randSecName())
}
$.log($.fake.randColor())
$.log($.fake.randColor('rgba'))
$.log($.fake.smallAndNum(3))
$.log($.fake.randUrl(4))
$.log($.fake.randIp())
$.log($.fake.phoneNum())
$.log($.fake.idCard())
$.log($.fake.price(9, 6))
$.log($.c.r('red'))
$.log($.c.g('green'))
$.log($.c.y('yellow'))
$.log($.c.b('blue'))
$.log($.c.m('magenta'))
$.log($.c.c('cyan'))
$.log($.c.w('white'))
$.log($.c.dimr('dimred'))
$.log($.c.dimr('dimred', 47, 1))
$.log($.c.dimg('dimgreen'))
$.log($.c.dimy('dimyellow'))
$.log($.c.dimb('dimblue'))
$.log($.c.dimm('dimmagenta'))
$.log($.c.dimc('dimcyan'))
$.log($.c.dimw('dimwhite'))
const a = {
  name1: 'x',
  n1: 1,
  o: {},
  null: null,
  u: undefined,
  d: new Date(),
  a: 1.001,
  b: 'x',
  bool2: false,
  c: [0.991, 'y'],
  reg: /.+/g,
  fn: function () {},
  bool1: true,
  x: 10.8
}
$.log($.json.parse('{a:1}'))
$.dir('$.dir(a)', a)
const colWidth = [5, 10, 6]
const data = [
  { id: 1, b: 'aaa', c: 'cccc1' },
  { id: 2, b: true, c: 'cccc2' },
  { id: 3, b: 'ccc', c: 'cccc3' }
]
$.drawTable(data, colWidth)
const drawOutput = $.drawTable(data, colWidth, { color: 1 })
console.log(drawOutput)
const timesFunc = function () {
  return 'x'.times(100)
}
const repeatFunc = function () {
  return 'x'.repeat(100)
}
$.benchmark(timesFunc, '', 10000)
$.benchmark(repeatFunc, '', 10000)

$.dir('$.now() +$.now()', $.now(), +$.now())
$.dir($.now().format())
$.dir([1, 2, 3, 4].shuffle())
$.dir([1, 2, 3, 4].fisherYates())
$.dir([].fisherYates())

const o = [
  {
    id: 52523,
    push_uid: 232421,
    uid: 2,
    relation_id: 2600,
    money: 12,
    type: 1,
    mark: 1002,
    source: 3,
    remark: '你的团队成员桃成功推广商品，收益结算完成',
    extend: '',
    created_at: 1548844685,
    updated_at: 1548897208,
    d_flag: 0
  },
  {
    id: 52505,
    push_uid: 232421,
    uid: 2,
    relation_id: 2404,
    money: 53,
    type: 1,
    mark: 1002,
    source: 3,
    remark: '你的团队成员桃成功推广商品，收益结算完成',
    extend: '',
    created_at: 1548844684,
    updated_at: 1548897189,
    d_flag: 0
  },
  {
    id: 52480,
    push_uid: 546945,
    uid: 539299,
    relation_id: 2887,
    money: 1045,
    type: 1,
    mark: 3001,
    source: 1,
    remark: '你的粉丝xxxxxxxx',
    extend: '',
    created_at: 1548844559,
    updated_at: 1548897039,
    d_flag: 0
  },
  {
    id: 52479,
    push_uid: 623249,
    uid: 2,
    relation_id: 2877,
    money: 5,
    type: 1,
    mark: 3001,
    source: 3,
    remark: '你的团队成员王蓓成功推广商品，订单完成，奖励',
    extend: '',
    created_at: 1548844559,
    updated_at: 1548897038,
    d_flag: 0
  },
  {
    id: 52478,
    push_uid: 623249,
    uid: 544402,
    relation_id: 2877,
    money: 11,
    type: 1,
    mark: 3001,
    source: 3,
    remark: '你的团队成员王蓓成功推广商品，订单完成，奖励',
    extend: '',
    created_at: 1548844559,
    updated_at: 1548897037,
    d_flag: 0
  },
  {
    id: 52477,
    push_uid: 623249,
    uid: 623249,
    relation_id: 2877,
    money: 16,
    type: 1,
    mark: 3001,
    source: 2,
    remark:
      '成功推广商品漫步者（EDIFIER） K550 头戴式有线电竞耳机 带麦克风带线控电脑音乐游戏吃鸡耳麦 典雅黑，订单完成，奖励',
    extend: '',
    created_at: 1548844559,
    updated_at: 1548897036,
    d_flag: 0
  },
  {
    id: 52476,
    push_uid: 623249,
    uid: 544402,
    relation_id: 2877,
    money: 16,
    type: 1,
    mark: 3001,
    source: 1,
    remark: '你的粉丝王蓓成功购买商品，奖励',
    extend: '',
    created_at: 1548844559,
    updated_at: 1548897035,
    d_flag: 0
  }
]

const groupCol = ['source', 'mark']
const aggregateCol = ['money', 'id', 'push_uid', 'uid', 'money']
const aggregateOpt = ['sum', 'count', 'max', 'min', 'avg']

$.dir(
  o
    .groupBy(groupCol, aggregateCol, aggregateOpt)
    .orderBy(['source', 'mark'], ['desc', 'asc'])
)

const waitNotEmptyObj = {}

const spinner = new $.Spinner('dots7')
const spinner1 = new $.Spinner()
spinner.setShowTxt()
spinner.start()
spinner1.start()
spinner.stop()
spinner.start('dots2')
setTimeout(() => {
  waitNotEmptyObj.x = 1
  spinner.setShowTxt('gogo')
  spinner.stop()
  spinner1.stop()
}, 200)

async function waitNotEmptyFunc () {
  await $.tools.waitNotEmpty(waitNotEmptyObj, 'x', function () {})
}
waitNotEmptyFunc()

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

    assertLog($.fake.checkIdCard.check('3708311901120649091'), false) //非15 和18

    assertLog($.fake.checkIdCard.check('632126198909252302'), false)
    assertLog(
      $.fake.checkIdCard.getId15('370831190112064909'),
      '370831011206490'
    )
    assertLog($.fake.checkIdCard.getId15('632126890925230'), '632126890925230')
    assertLog($.fake.checkIdCard.getId15('63212689092520'), null)
    assertLog(
      $.fake.checkIdCard.getId18('370831011206490'),
      '370831190112064909'
    )
    assertLog(
      $.fake.checkIdCard.getId18('370831190112064909'),
      '370831190112064909'
    )
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
