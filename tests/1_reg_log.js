'use strict'
let $ = require('../index')
let path = require('path')

let r = 'a(?!p)(?=p)((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))'
console.log($.reg.gen(r))
r = '[\u4e00-\u9fa5\xff]{10,20}'

console.log($.reg.gen(r))
r = '^-([1-9]\\d*\\.\\d*|0\\.\\d*[1-9]\\d*)$'
console.log($.reg.gen(r))
r = ''
console.log($.reg.gen(r))
r = '^\\0\\cXabc\\01\\xff\\o\u0000.[\\b]\\b\\B\\d[0-9]\\D\\f\\n\\r\\s\\S\\t\\v\\w[a-zA-Z0-9]\\W[^a-zA-Z0-9]+\\o.*$'
console.log($.reg.gen(r))
r = '(http|https|ftp|ws|wss):\\/{2}[a-z]+\\.com'
console.log($.reg.gen(r))
r = '\\w[-\\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\\.)+[A-Za-z]{2,14}'
console.log($.reg.gen(r))
r = '(你|我|他)'

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
  map: function (name, path) {
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
let a = {
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
  x: 10.8 }
$.log($.json.parse('{a:1}'))
$.dir('$.dir(a)', a)
let colWidth = [5, 10, 6]
let data = [{ id: 1, b: 'aaa', c: 'cccc1' }, { id: 2, b: true, c: 'cccc2' }, { id: 3, b: 'ccc', c: 'cccc3' }]
$.drawTable(data, colWidth)
$.drawTable(data, colWidth, { color: 1 })

$.dir('$.now() +$.now()', $.now(), +$.now())
$.dir($.now().format())
$.dir([1, 2, 3, 4].shuffle())

let spinner = new $.Spinner('dots7')
spinner.setShowTxt()
spinner.start()
spinner.stop()
spinner.start('dots2')
setTimeout(() => {
  spinner.setShowTxt('gogo')
  spinner.stop()
}, 200)
