/* istanbul ignore next */
'use strict'
const { PerformanceObserver, performance } = require('perf_hooks')
const Pack = require('./package.json')
const path = require('path')
const tools = require('./lib/tools')
const c = tools.c

var getGlobal = function () {
  if (typeof self !== 'undefined') {
    return self
  }
  if (typeof window !== 'undefined') {
    return window
  }
  if (typeof global !== 'undefined') {
    return global
  }
}
let globalThis = getGlobal()

/**
 * @description 合并两个对象，与 Object.assign 类似，但只能合并两个
 * @param {object} a a对象，将b对象的可枚举属性复制到此对象，如果a对象已有相同属性，将被覆盖
 * @param {object} b b对象，不会修改此对象
 * @return {object} a对象，此方法并不会生成新对象
 * */

function ext (a, b, isCall = false) {
  if (a && b) {
    for (const item in b) {
      if (!a.hasOwnProperty(item)) {
        if (isCall) {
          a[item] = (first, ...arg) => b[item].apply(first, arg)
        } else {
          a[item] = b[item]
        }
      } else {
        globalThis.isMeekoLoad &&
          console.log(c.g(item.toUpperCase()), 'ES2015-2021 new method')
      }
    }
    return a
  }
  return null
}
let _proto_ = {}

const _s = require('./lib/string')
ext(String.prototype, _s)
const string = {}
ext(string, _s, 1)

const _n = require('./lib/number')
ext(Number.prototype, _n)
const number = {}
ext(number, _n, 1)

const _d = require('./lib/date')
ext(Date.prototype, _d)
const date = {}
ext(date, _d, 1)

const _f = require('./lib/function')
ext(Function.prototype, _f)

const _a = require('./lib/array.js')
ext(Array.prototype, _a)
const array = {}
ext(array, _a, 1)
_proto_ = {
  a: _a,
  d: _d,
  n: _n,
  s: _s
}

const option = {
  logTime: true
}

/**
 * @memberof Date_prototype#
 * @param {string} str - 填充字符
 * @param {number} len - 总长度
 * @param {number} pos - 1右面，-1左面
 * @description 给日期前后补充字符串
 * @function fillStr
 * @return {string}
 * @example
 * new Date().fillStr('a', 50)
 * // Tue Dec 29 2015 01:11:01 GMT+0800 (中国标准时间)aa
 */
Date.prototype.fillStr = String.prototype.fillStr //eslint-disable-line

/**
 * @namespace Buffer_prototype
 * */
/**
 * @memberof Buffer_prototype#
 * @description 合并两个Buffer
 * @function contact
 * @param {Buffer} b 另一Buffer
 * @return {Buffer}
 * @example
 * Buffer.from('123').contact(Buffer.from('456')).toString()
 * // "123456"
 * */

Buffer.prototype.contact =
  Buffer.prototype.contact ||
  function (b) {
    /*
  utf8 有bom头
  EF BB BF [239 187 191]
  */

    const bf = Buffer.alloc(this.length + b.length)
    this.copy(bf, 0, 0, this.length)
    b.copy(bf, this.length, 0, b.length)
    return bf
  }

/**
 * 获取错误堆栈跟踪数据
 * @return string
 * */

const getStackTrace = function () {
  const obj = {}
  Error.captureStackTrace(obj, getStackTrace)
  return obj.stack
}
const os = process.platform
const re = os.includes('win32')
  ? /\\(.+)\.js:(\d+:\d+)/g
  : /\/(.+)\.js:(\d+:\d+)/g
const trace = console

/**
 * @param {...mixed[]} args 要打印的参数
 * */

const log = function log (...args) {
  getStackTrace()
    .split('\n')[2]
    .match(re)
  const s =
    ' [' +
    c.dimg(
      RegExp.$1 +
        ':' +
        RegExp.$2 +
        ' ' +
        new Date().date2Str().replaceAll('-', '')
    ) +
    ']'
  let str = ''
  for (let i = 0; i < args.length; i++) {
    if (typeof args[i] === 'object') {
      str = str + JSON.stringify(args[i]) + ' '
    } else {
      str = str + args[i] + ' '
    }
  }
  trace.log(str + (option.logTime ? s : ''))
  return 1
}

/**
 * @param {...mixed[]} args 要打印的参数
 * */

const err = function err (...args) {
  getStackTrace()
    .split('\n')[2]
    .match(re)
  const s =
    ' [' +
    c.dimr(
      RegExp.$1 +
        ':' +
        RegExp.$2 +
        ' ' +
        new Date().date2Str().replaceAll('-', '')
    ) +
    ']'
  let str = ''
  for (let i = 0; i < args.length; i++) {
    if (typeof args[i] === 'object') {
      str = str + JSON.stringify(args[i]) + ' '
    } else {
      str = str + args[i] + ' '
    }
  }
  trace.error(str + (option.logTime ? s : ''))
  return 1
}

function strColor (k, v) {
  if (typeof v === 'function') {
    return `[function ${k}]`
  }
  if (Object.prototype.toString.call(v) === '[object RegExp]') {
    return '#cyan#' + v + '#none#'
  }
  return v
}

/**
 * dir json着色函数.
 * @param {...array<mixed>} args 任何参数
 */

const dir = function dir (...args) {
  for (let i = 0; i < args.length; i++) {
    let ss = JSON.stringify(args[i], strColor, 4)
    ss = ss
      .replaceAll('"#cyan#', c.cyan)
      .replaceAll('#none#"', c.none)
      .replace(/"(.+)": /g, c.g('$1') + ': ')
      .replace(/(true)(,|'')\n/g, c.r('$1$2\n'))
      .replace(/(false)(,|'')\n/g, c.r('$1$2\n'))
      .replace(/"(.+)",\n/g, '"' + c.m('$1') + '",\n')
      .replace(/"(.+)"\n/g, '"' + c.m('$1') + '"\n')
      .replace(/([0-9.]+),\n/g, c.y('$1') + ',\n')
      .replace(/([0-9.]+)\n/g, c.y('$1') + '\n')
      .replace(/,\n/g, c.y(',\n'))
      .replace(/("|{|}|[|])/g, c.y('$1'))
    trace.log(ss)
  }
}

/**
 * 返回一个sort函数，用于给对象数组根据某字段排序，类似sql中的order by
 * @param {string} k 排序根据的k
 * @param {enum} dir 可选 desc|asc
 * @return function
 * @example
 * [{ 'name': 'a', lev: 1 }, { name: 'b', lev: 2 }].sort($.compare('lev', 'desc'))
 * // [{ name: 'b', lev: 2 }, { 'name': 'a', lev: 1 }]
 * */

function compare (k, order) {
  return function (a, b) {
    return order === 'desc' ? b[k] - a[k] : a[k] - b[k] // ~~(a[k] < b[k]) : ~~(a[k] > b[k])
  }
}

/**
 * setTimeout的promise版
 * @param {int} t 毫秒
 * @return Promise
 * @example
 * await $.wait(5000)
 * */

const wait = function (t) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, t)
  })
}

const math = require('./lib/math')
const matAdv = require('./lib/mathMatrixAdv')
Object.assign(math, matAdv)
const fake = require('./lib/fake')
const file = require('./lib/file')
const reg = require('./lib/reg')
const tpl = require('./lib/tpl')
const color = require('./lib/color')
const requireAll = require('./lib/requireDir')
const Snowflake = require('./lib/Snowflake.js')
const ml = require('./lib/ml') // requireAll({ dirname: path.join(__dirname, '.', 'lib', 'ml') })

const Spinner = require('./lib/Spinner.js')
const Mock = require('./lib/Mock.js')
const qrcode = require('./lib/qrcode.js')
const buf = require('./lib/buf.js')
const geo = require('./lib/geo.js')
/**
 * 把数组里的函数挨个执行，并且把前面函数的返回值传给下一个函数
 * @param {...function[]} [funcs]
 * @return mixed
 * @example
 * $.pipe(arg=>{return arg.push(1)},arg=>{return arg.push(2))([0])
 * // [0,1,2]
 * */

const pipe = (...funcs) => arg => funcs.reduce((p, fn) => fn(p), arg)

/**
 * @description 处理JSON
 * @prop {function} parse 把JSON字符串解析为js对象
 * @prop {function} stringify JSON.stringify的别名
 * */

const json = {
  parse: function (s) {
    return Function('return ' + s)()
  }, // 为了解决key没有双引号
  stringify: JSON.stringify
}

/**
 * new Date 的别名，禁止输入参数
 * @return Date 当前时间
 * */

const now = () => new Date()

/**
 * benchmark，性能测试函数.
 * @param {function} fn - 被执行的函数.
 * @param {number} n - 执行次数.
 * @return {string} 返回 [函数名] [执行时间] 毫秒 [每毫秒运行次数]/ms [执行次数] 次.
 * @example
 * let prime = function () { return (641).isPrime() }
 * $.benchmark(prime)
 * // prime     41 毫秒  24390.2439/ms 1e+6 次
 */

const benchmark = function benchmark (
  fn = function () {
    /* do nothing */
  },
  msg = '',
  n = 1000000
) {
  const t = performance.now()
  let everyTime = 0
  let timeSpend = 0
  let dt = 0
  let minDt = Infinity
  let maxDt = -Infinity
  for (let i = 0; i < n; i++) {
    everyTime = performance.now()
    fn()
    dt = performance.now() - everyTime
    timeSpend += dt
    minDt = dt < minDt ? dt : minDt
    maxDt = dt > minDt ? dt : maxDt
  }
  const diffTime = timeSpend
  const spendTime = diffTime.toFixed(0)
  const perSec = (((n / diffTime) * 10000) / 10000) | 0
  console.log(
    c.y((fn.name || '').fillStr(' ', 15)),
    (spendTime + ' ms').fillStr(' ', 8, -1),
    ((perSec + '').toMoney() + ' /ms').fillStr(' ', 10, -1),
    n.toExponential() + ' 次',
    (
      '±' +
      (((maxDt - minDt) / 2 / (spendTime / n)) * 100).round(2) +
      '%'
    ).fillStr(' ', 9, -1),
    msg
  )
}
globalThis.isMeekoLoad &&
  console.log(
    c.g('✔'),
    `Meeko (${c.y(Pack.version)}) ${c.g(
      'https://github.com/kongnet/meeko.git'
    )}`
  )
globalThis.isMeekoLoad = true
const exportObj = {
  _proto_,
  array,
  date,
  number,
  string,
  benchmark,
  buf,
  c,
  color,
  compare,
  dir,
  drawTable: tools.drawTable,
  err,
  ext,
  fake,
  file,
  getStackTrace,
  geo,
  json,
  log,
  math,
  Mock,
  now,
  option,
  pipe,
  qrcode,
  reg,
  requireAll,
  Snowflake,
  ml,
  Spinner,
  tools,
  tpl,
  wait
}
module.exports = exportObj
