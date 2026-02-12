/* istanbul ignore next */

const { ext, array, date, number, string } = require('./lib/prototypeExt.js')
const bench = require('./lib/bench.js')
const Pack = require('./package.json')
const tools = require('./lib/tools')
const c = tools.c
const logLib = require('./lib/logBrowser')

const getGlobal = function () {
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
const globalThis = getGlobal()

/**
 * 返回一个sort函数，用于给对象数组根据某字段排序，类似sql中的order by
 * @param {String} k 排序根据的k
 * @param {String} order 可选 desc|asc
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
 * @param {Number} t 毫秒
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
const reg = require('./lib/reg')
const tpl = require('./lib/tpl')
const color = require('./lib/color')
const Snowflake = require('./lib/Snowflake.js')
const ml = require('./lib/ml') // requireAll({ dirname: path.join(__dirname, '.', 'lib', 'ml') })

const Spinner = require('./lib/Spinner.js')
const Mock = require('./lib/Mock.js')
const qrcode = require('./lib/qrcode.js')
const buf = require('./lib/buf.js')
const geo = require('./lib/geo.js')

/**
 * 把数组里的函数挨个执行，并且把前面函数的返回值传给下一个函数
 * @param {any} [funcs]
 * @return void 0
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

globalThis.isMeekoLoad &&
  console.log(
    c.g('✔'),
    `Meeko (${c.y(Pack.version)}) ${c.g(
      'https://github.com/kongnet/meeko.git'
    )}`
  )
globalThis.isMeekoLoad = true
const exportObj = {
  // _proto_,
  array,
  date,
  number,
  string,
  bench,
  benchmark: bench.benchmark,
  buf,
  c,
  color,
  compare,
  dir: logLib.dir,
  drawTable: tools.drawTable,
  err: logLib.err,
  ext,
  fake,
  getStackTrace: logLib.getStackTrace,
  geo,
  json,
  log: logLib.log,
  math,
  Mock,
  now,
  option: logLib.option,
  pipe,
  qrcode,
  reg,
  Snowflake,
  ml,
  Spinner,
  tools,
  tpl,
  wait
}
module.exports = exportObj
