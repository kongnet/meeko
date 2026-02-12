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

const isWin32 = typeof process !== 'undefined' && process.platform === 'win32'
const re = isWin32 ? /\\(.+)\.js:(\d+:\d+)/g : /\/(.+)\.js:(\d+:\d+)/g
const trace = console

function getCallerLocation () {
  const stack = getStackTrace().split('\n')[2]
  const match = stack.match(re)
  return match ? { file: RegExp.$1, line: RegExp.$2 } : null
}

function formatArgs (args) {
  return args.map(item => (typeof item === 'object' ? JSON.stringify(item) : String(item))).join(' ')
}

function createLogger (colorFn, outputFn) {
  return function (...args) {
    const loc = getCallerLocation()
    const timeStr = new Date().date2Str().replaceAll('-', '')
    const locStr = loc ? ` [${colorFn(`${loc.file}:${loc.line} ${timeStr}`)}]` : ''

    const content = formatArgs(args)
    outputFn(content + (option.logTime ? locStr : ''))
    return 1
  }
}

const log = createLogger(c.dimg, trace.log)
const err = createLogger(c.dimr, trace.error)

function preprocessDir (obj) {
  if (obj === null || typeof obj === 'undefined') {
    return obj
  }

  if (typeof obj === 'symbol') {
    return '__SYMBOL__' + obj.toString() + '__'
  }

  if (typeof obj === 'function') {
    const name = obj.name || ''
    return '__FUNC__' + name + '__'
  }

  if (typeof obj === 'bigint') {
    return '__BIGINT__' + obj.toString() + '__'
  }

  if (typeof obj !== 'object') {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map(preprocessDir)
  }

  const result = {}
  for (const key of Object.keys(obj)) {
    const value = obj[key]

    if (value === undefined) {
      result[key] = '__UNDEFINED__'
    } else if (typeof value === 'bigint') {
      result[key] = '__BIGINT__' + value.toString() + '__'
    } else if (typeof value === 'symbol') {
      result[key] = '__SYMBOL__' + value.toString() + '__'
    } else if (value instanceof RegExp) {
      result[key] = '__REGEXP__' + value.toString() + '__'
    } else if (value instanceof Date) {
      result[key] = '__DATE__' + value.toISOString() + '__'
    } else if (value instanceof Map) {
      result[key] = '__MAP__'
    } else if (value instanceof Set) {
      result[key] = '__SET__'
    } else if (typeof value === 'function') {
      const name = value.name || ''
      result[key] = '__FUNC__' + name + '__'
    } else if (typeof value === 'object' && value !== null) {
      result[key] = preprocessDir(value)
    } else {
      result[key] = value
    }
  }
  return result
}

function strColor (k, v) {
  if (v === '__UNDEFINED__') {
    return 'undefined'
  }

  if (typeof v === 'string') {
    if (v.startsWith('__SYMBOL__')) {
      return v.replace('__SYMBOL__', '').replace('__', '')
    }
    if (v.startsWith('__BIGINT__')) {
      return v.replace('__BIGINT__', '').replace('__', '') + 'n'
    }
    if (v.startsWith('__REGEXP__')) {
      return v.replace('__REGEXP__', '').replace('__', '')
    }
    if (v.startsWith('__DATE__')) {
      return v.replace('__DATE__', '').replace('__', '')
    }
    if (v === '__MAP__') {
      return '[Map]'
    }
    if (v === '__SET__') {
      return '[Set]'
    }
    if (v.startsWith('__FUNC__')) {
      const name = v.replace('__FUNC__', '').replace('__', '')
      return '[function' + (name ? ' ' + name : '') + ']'
    }
  }

  if (v === Infinity) {
    return 'Infinity'
  }

  if (v === -Infinity) {
    return '-Infinity'
  }

  if (Number.isNaN(v)) {
    return 'NaN'
  }

  if (Object.is(v, -0)) {
    return '-0'
  }

  return v
}

const dirReplacements = [
  [/#none#/g, c.none],
  [/#cyan#/g, c.cyan],
  [/#green#/g, c.green],
  [/"(.+)": /g, (_, key) => c.g(key) + ': '],
  [/(true)(,|'')\n/g, (_, val, end) => c.r(val + end) + '\n'],
  [/(false)(,|'')\n/g, (_, val, end) => c.r(val + end) + '\n'],
  [/"(.+)",\n/g, (_, val) => '"' + c.m(val) + '",\n'],
  [/"(.+)"\n/g, (_, val) => '"' + c.m(val) + '"\n'],
  [/([0-9.]+),\n/g, (_, num) => c.y(num) + ',\n'],
  [/([0-9.]+)\n/g, (_, num) => c.y(num) + '\n'],
  [/,\n/g, c.y(',\n')]
]

function applyReplacements (ss) {
  for (const [pattern, replacement] of dirReplacements) {
    ss = ss.replace(pattern, replacement)
  }
  return ss
}

const dir = function dir (...args) {
  for (const item of args) {
    const processed = preprocessDir(item)
    let jsonStr = JSON.stringify(processed, strColor, 4)
    if (jsonStr === undefined) {
      jsonStr = String(item)
    }
    const ss = applyReplacements(jsonStr)
    console.log(ss)
  }
  return args
}

module.exports = {
  log,
  err,
  dir,
  getStackTrace,
  option,
  strColor
}
