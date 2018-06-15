'use strict'
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
const c = {
  /*
  http://stanislavs.org/helppc/ansi_codes.html
  */
  cls: '\x1b[0;0;H\x1b[0J',
  xy (x, y) {
    return `\x1b[${y};${x};H`
  },
  none: '\x1b[m',
  black: '\x1b[30m',
  red: '\x1b[31m\x1b[1m',
  green: '\x1b[32m\x1b[1m',
  yellow: '\x1b[33m\x1b[1m',
  blue: '\x1b[34m\x1b[1m',
  magenta: '\x1b[35m\x1b[1m',
  cyan: '\x1b[36m\x1b[1m',
  white: '\x1b[37m\x1b[1m',
  dimred: '\x1b[31m',
  dimgreen: '\x1b[32m',
  dimyellow: '\x1b[33m',
  dimblue: '\x1b[34m',
  dimmagenta: '\x1b[35m',
  dimcyan: '\x1b[36m',
  dimwhite: '\x1b[37m',
  r (s) { return this.red + s + this.none },
  g (s) { return this.green + s + this.none },
  y (s) { return this.yellow + s + this.none },
  b (s) { return this.blue + s + this.none },
  m (s) { return this.magenta + s + this.none },
  c (s) { return this.cyan + s + this.none },
  w (s) { return this.white + s + this.none },
  dimr (s) { return this.dimred + s + this.none },
  dimg (s) { return this.dimgreen + s + this.none },
  dimy (s) { return this.dimyellow + s + this.none },
  dimb (s) { return this.dimblue + s + this.none },
  dimm (s) { return this.dimmagenta + s + this.none },
  dimc (s) { return this.dimcyan + s + this.none },
  dimw (s) { return this.dimwhite + s + this.none }
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
  trace.log(str + (option.logTime ? s : ''))
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
    return (dir === 'desc') ? ~~(a[k] < b[k]) : ~~(a[k] > b[k])
  }
}
const wait = function (t) {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve()
      }, t)
    } catch (err) {
      reject(err)
    }
  })
}
const math = require('./lib/math')
const tools = require('./lib/tools')
const fake = require('./lib/fake')
const tpl = require('./lib/tpl')
const json = {
  parse: function (s) { return (Function('return ' + s))() },
  stringify: JSON.stringify
}
module.exports = {
  json,
  option,
  c,
  ext,
  log,
  err,
  dir,
  tools,
  fake,
  tpl,
  compare,
  wait,
  math
}
