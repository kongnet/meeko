'use strict'

const tools = require('./tools')
const c = tools.c

const option = {
  logTime: true
}

const getStackTrace = function () {
  const obj = {}
  Error.captureStackTrace(obj, getStackTrace)
  return obj.stack
}

const re = /\\(.+)\.js:(\d+:\d+)/g
const trace = console

function getCallerLocation () {
  const stack = getStackTrace().split('\n')[2]
  const match = stack.match(re)
  return match ? { file: RegExp.$1, line: RegExp.$2 } : null
}

function formatArgs (args) {
  return args.map(item =>
    typeof item === 'object' ? JSON.stringify(item) : String(item)
  ).join(' ')
}

function createLogger (colorFn, outputFn) {
  return function (...args) {
    const loc = getCallerLocation()
    const timeStr = new Date().date2Str().replaceAll('-', '')
    const locStr = loc
      ? ` [${colorFn(`${loc.file}:${loc.line} ${timeStr}`)}]`
      : ''

    const content = formatArgs(args)
    outputFn(content + (option.logTime ? locStr : ''))
    return 1
  }
}

const log = createLogger(c.dimg, trace.log)
const err = createLogger(c.dimr, trace.error)

function strColor (k, v) {
  if (typeof v === 'function') {
    return `[function ${k}]`
  }
  if (Object.prototype.toString.call(v) === '[object RegExp]') {
    return '#cyan#' + v + '#none#'
  }
  return v
}

const dirReplacements = [
  [/\\"#cyan#/g, c.cyan],
  [/#none#"/g, c.none],
  [/"(.+)": /g, (_, key) => c.g(key) + ': '],
  [/(true)(,|'')\n/g, (_, val, end) => c.r(val + end) + '\n'],
  [/(false)(,|'')\n/g, (_, val, end) => c.r(val + end) + '\n'],
  [/"(.+)",\n/g, (_, val) => '"' + c.m(val) + '",\n'],
  [/"(.+)"\n/g, (_, val) => '"' + c.m(val) + '"\n'],
  [/([0-9.]+),\n/g, (_, num) => c.y(num) + ',\n'],
  [/([0-9.]+)\n/g, (_, num) => c.y(num) + '\n'],
  [/,\n/g, c.y(',\n')],
  [/"{|}|[|]/g, (_, char) => c.y(char)]
]

function applyReplacements (ss) {
  for (const [pattern, replacement] of dirReplacements) {
    ss = ss.replace(pattern, replacement)
  }
  return ss
}

const dir = function dir (...args) {
  for (const item of args) {
    const jsonStr = JSON.stringify(item, strColor, 4)
    const ss = applyReplacements(jsonStr || String(item))
    trace.log(ss)
  }
}

module.exports = {
  log,
  err,
  dir,
  getStackTrace,
  option,
  strColor
}
