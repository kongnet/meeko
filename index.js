/* istanbul ignore next */

'use strict'
const Pack = require('./package.json')
function ext (a, b) {
  if (a && b) {
    for (let c in b) {
      if (b.hasOwnProperty(c)) {
        a[c] = b[c]
      }
    }
    return a
  }
  return null
}
const _s = require('./lib/string')
ext(String.prototype, _s)
const _d = require('./lib/date')
ext(Date.prototype, _d)
const _a = require('./lib/array')
ext(Array.prototype, _a)
let option = {
  logTime: true
}

Number.prototype.round = function (p) {  //eslint-disable-line
  p = Math.pow(10, p || 0)
  return Math.round(this * p) / p
}
Number.prototype.fillStr = String.prototype.fillStr  //eslint-disable-line
Date.prototype.fillStr = String.prototype.fillStr  //eslint-disable-line
Buffer.prototype.contact = function (b) {
  /*
  utf8 有bom头
  EF BB BF [239 187 191]
  */
  let buf = Buffer.alloc(this.length + b.length)
  this.copy(buf, 0, 0, this.length)
  b.copy(buf, this.length, 0, b.length)
  return buf
}
const cFn = function (fc, dimNum, bc, isUnderline) {
  return `\x1b[0;${isUnderline ? '4;' : ''}${dimNum ? dimNum + ';' : ''}${bc ? bc + ';' : ''}${fc || ''}m`
}
const c = {
  /*
  http://stanislavs.org/helppc/ansi_codes.html
  */
  cls: '\x1b[0;0;H\x1b[0J',
  xy (x, y) {
    return `\x1b[${y};${x};H`
  },
  none: cFn(),
  black: cFn(30, 1),
  red: cFn(31, 1),
  green: cFn(32, 1),
  yellow: cFn(33, 1),
  blue: cFn(34, 1),
  magenta: cFn(35, 1),
  cyan: cFn(36, 1),
  white: cFn(37, 1),
  dimred: cFn(31, 2),
  dimgreen: cFn(32, 2),
  dimyellow: cFn(33, 2),
  dimblue: cFn(34, 2),
  dimmagenta: cFn(35, 2),
  dimcyan: cFn(36, 2),
  dimwhite: cFn(37, 2),
  r (s, bc, u) { return cFn(31, 1, bc, u) + s + cFn() },
  g (s, bc, u) { return cFn(32, 1, bc, u) + s + cFn() },
  y (s, bc, u) { return cFn(33, 1, bc, u) + s + cFn() },
  b (s, bc, u) { return cFn(34, 1, bc, u) + s + cFn() },
  m (s, bc, u) { return cFn(35, 1, bc, u) + s + cFn() },
  c (s, bc, u) { return cFn(36, 1, bc, u) + s + cFn() },
  w (s, bc, u) { return cFn(37, 1, bc, u) + s + cFn() },
  dimr (s, bc, u) { return cFn(31, 2, bc, u) + s + cFn() },
  dimg (s, bc, u) { return cFn(32, 2, bc, u) + s + cFn() },
  dimy (s, bc, u) { return cFn(33, 2, bc, u) + s + cFn() },
  dimb (s, bc, u) { return cFn(34, 2, bc, u) + s + cFn() },
  dimm (s, bc, u) { return cFn(35, 2, bc, u) + s + cFn() },
  dimc (s, bc, u) { return cFn(36, 2, bc, u) + s + cFn() },
  dimw (s, bc, u) { return cFn(37, 2, bc, u) + s + cFn() }
}
const getStackTrace = function () {
  let obj = {}
  Error.captureStackTrace(obj, getStackTrace)
  return obj.stack
}
let os = process.platform
const re = os.includes('win32') ? /\\(.+)\.js:(\d+:\d+)/g : /\/(.+)\.js:(\d+:\d+)/g
const trace = console
const log = function (...args) {
  getStackTrace().split('\n')[2].match(re)
  let s = c.none + ' [' + c.dimgreen + RegExp.$1 + ':' + RegExp.$2 + ' ' + new Date().date2Str().replaceAll('-', '') + c.none + ']'
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
const err = function (...args) {
  getStackTrace().split('\n')[2].match(re)
  let s = c.none + ' [' + c.dimred + RegExp.$1 + ':' + RegExp.$2 + ' ' + new Date().date2Str().replaceAll('-', '') + c.none + ']'
  let str = ''
  for (let i = 0; i < args.length; i++) {
    if (typeof args[i] === 'object') {
      str = str + JSON.stringify(args[i]) + ' '
    } else {
      str = str + args[i] + ' '
    }
  }
  trace.err(str + (option.logTime ? s : ''))
  return 1
}

function strColor (k, v) {
  if (typeof v === 'function') {
    return (`[function ${k}]`)
  }
  if (Object.prototype.toString.call(v) === '[object RegExp]') {
    return ('#cyan#' + v + '#none#')
  }
  return v
}

const dir = function (...args) {
  for (let i = 0; i < args.length; i++) {
    let ss = JSON.stringify(args[i], strColor, 4)
    ss = ss.replaceAll('"#cyan#', c.cyan)
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
function compare (k, dir) {
  return function (a, b) {
    return (dir === 'desc') ? (b[k] - a[k]) : (a[k] - b[k]) // ~~(a[k] < b[k]) : ~~(a[k] > b[k])
  }
}
const wait = function (t) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, t)
  })
}
const math = require('./lib/math')
const tools = require('./lib/tools')
const fake = require('./lib/fake')
const reg = require('./lib/reg')
const tpl = require('./lib/tpl')
const requireAll = require('./lib/requireDir')
let Snowflake = require('./lib/Snowflake.js')
const pipe = (...funcs) => arg => funcs.reduce((p, fn) => fn(p), arg)
const json = {
  parse: function (s) { return (Function('return ' + s))() }, // 为了解决key没有双引号
  stringify: JSON.stringify
}
const now = () => new Date()
// 画字符串表格
function drawLine (colWidth) {
  let s = ''
  for (let i = 0; i < colWidth.length; i++) {
    s += '+'
    for (let j = 0; j < colWidth[i]; j++) {
      s += '-'
    }
  }
  console.log(s + '+')
}
function drawTable (data, colWidth, option = { color: 0 }) {
  let len = data.length
  let s = ''
  let keys = Object.keys(data[0])
  let keysLen = keys.length
  for (let i = 0; i < keysLen; i++) {
    if (option.color) {
      s += c.dimg(keys[i].fillStr(' ', colWidth[i]).toUpperCase()) + '|'
    } else {
      s += keys[i].fillStr(' ', colWidth[i]).toUpperCase() + '|'
    }
  }
  drawLine(colWidth)
  console.log('|' + s)
  drawLine(colWidth)
  for (let i = 0; i < len; i++) {
    s = ''
    for (let k = 0; k < keysLen; k++) {
      let v = data[i][keys[k]]
      let valueType = typeof v
      v = v + ''
      if (option.color) {
        switch (valueType) {
          case 'number':
            s += c.dimy(v.fillStr(' ', colWidth[k])) + '|'
            break
          case 'boolean':
            s += c.dimr(v.fillStr(' ', colWidth[k])) + '|'
            break
          default:
            s += c.dimm(v.fillStr(' ', colWidth[k])) + '|'
        }
      } else {
        s += v.fillStr(' ', colWidth[k]) + '|'
      }
    }
    console.log('|' + s)
  }
  drawLine(colWidth)
}
console.log(c.g('✔'), `Meeko (${c.y(Pack.version)}) ${'\x1b[2;4;32m' + 'https://github.com/kongnet/meeko.git' + cFn()}`)
module.exports = {
  c,
  compare,
  dir,
  drawTable,
  err,
  ext,
  fake,
  json,
  log,
  math,
  now,
  option,
  pipe,
  reg,
  requireAll,
  Snowflake,
  tools,
  tpl,
  wait
}
