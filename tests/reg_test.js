'use strict'
let $ = require('../index')

let r = 'a(?!p)(?=p)((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))'
console.log($.reg.gen(r))
r = '[\u4e00-\u9fa5\xff]{10,20}'

console.log($.reg.gen(r))
r = '^-([1-9]\\d*\\.\\d*|0\\.\\d*[1-9]\\d*)$'
console.log($.reg.gen(r))
r = ''
console.log($.reg.gen(r))
r = '^\\0\\cXabc\\01\\xff\\o\\u0000.[\\b]\\b\\B\\d[0-9]\\D\\f\\n\\r\\s\\S\\t\\v\\w[a-zA-Z0-9]\\W[^a-zA-Z0-9]+\\o.*$'
console.log($.reg.gen(r))
r = '(http|https|ftp|ws|wss):\\/{2}[a-z]+\\.com'
console.log($.reg.gen(r))
r = '\\w[-\\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\\.)+[A-Za-z]{2,14}'
console.log($.reg.gen(r))
r = '(你|我|他)'

r = '-[1-9][0-9]{2,10}'
console.log($.reg.gen(r))
try {
  $.requireAll()
} catch (e) {
  console.log(e.toString())
}
try {
  $.requireAll(__dirname, 'x')
} catch (e) {
  console.log(e.toString())
}
$.requireAll()
