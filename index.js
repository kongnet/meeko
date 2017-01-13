'use strict'
const _s = require('./lib/string')
ext(String.prototype, _s)
const _d = require('./lib/date')
ext(Date.prototype, _d)
let option = {
  logTime: true
}

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

Array.prototype.copy = function () {
  return [].concat(this)
}

Number.prototype.round = function (p) {
  p = Math.pow(10, p || 0)
  return Math.round(this * p) / p
}
Number.prototype.fillStr = String.prototype.fillStr
Date.prototype.fillStr = String.prototype.fillStr
Buffer.prototype.contact = function (b) {
  /*
  utf8 有bom头
  EF BB BF [239 187 191]
  */
  let buf = new Buffer(this.length + b.length)
  this.copy(buf, 0, 0, this.length)
  b.copy(buf, this.length, 0, b.length)
  return buf
}
let c = {
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
  lred: '\x1b[31m',
  lgreen: '\x1b[32m',
  lyellow: '\x1b[33m',
  lblue: '\x1b[34m',
  lmagenta: '\x1b[35m',
  lcyan: '\x1b[36m',
  lwhite: '\x1b[37m'
}

let getStackTrace = function () {
  let obj = {}
  Error.captureStackTrace(obj, getStackTrace)
  return obj.stack
}

let re = /\\(.+)\.js:(\d+:\d+)/g
let trace = console
let log = function (...args) {
  getStackTrace().split('\n')[2].match(re)
  let s = c.none + ' [' + c.lgreen + RegExp.$1.split('\\').pop() + ':' + RegExp.$2 + ' ' + new Date().date2Str().replaceAll('-', '') + c.none + ']'
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
let err = function (...args) {
  getStackTrace().split('\n')[2].match(re)
  let s = c.none + ' [' + c.lred + RegExp.$1.split('\\').pop() + ':' + RegExp.$2 + ' ' + new Date().date2Str().replaceAll('-', '') + c.none + ']'
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

const tools = require('./lib/tools')
const fake = require('./lib/fake')
const tpl = require('./lib/tpl')

module.exports = {
  option,
  c,
  ext,
  log,
  err,
  tools,
  fake,
  tpl
}
