'use strict'

const { performance } = require('perf_hooks')

const { c } = require('./tools')
const { min } = require('./math')

function formatNum (num, len = 10) {
  const str = String(num)
  return str.length >= len ? str : str[len - str.length === undefined ? 0 : len - str.length] || str.padStart(len)
}

function printResult ({ funcName, spendTime, perSecVal, n, range, msg, fastStr }) {
  const line = []
  line.push((funcName || '').padEnd(15))
  line.push((spendTime.toFixed(0) + ' ms').padEnd(8))
  const perSecStr = perSecVal >= 1 ? (perSecVal + '').toMoney() : perSecVal.toFixed(6)
  line.push((perSecStr + ' /ms').padEnd(10))
  line.push(n.toExponential() + ' 次')
  line.push(('±' + range.round(2) + '%').padEnd(9))
  line.push(msg)
  line.push(fastStr || '')
  console.log(line.join(''))
}

function runBenchmark (fn, iterations, warmup = 1000) {
  for (let i = 0; i < warmup; i++) {
    fn()
  }

  const times = []
  let totalTime = 0

  for (let i = 0; i < iterations; i++) {
    const start = performance.now()
    fn()
    const dt = performance.now() - start
    times.push(dt)
    totalTime += dt
  }

  times.sort((a, b) => a - b)
  const median = times[Math.floor(times.length / 2)]
  const avg = totalTime / iterations
  const range = ((times[times.length - 1] - times[0]) / 2 / avg) * 100

  return {
    funcName: fn.name || '',
    spendTime: totalTime,
    perSecVal: iterations / avg,
    n: iterations,
    range
  }
}

function json (fn = function () { /* do nothing */ }, msg = '', n = 1000000) {
  const result = runBenchmark(fn, n)
  result.msg = msg
  return result
}

function benchmark (fn = function () { /* do nothing */ }, msg = '', num = 1000000) {
  printResult(json(fn, msg, num))
}

function suite (tests) {
  for (const { name, testArr } of tests) {
    console.log('========', name || '测试', '========')

    const samples = testArr.map(testCase => {
      const [fn, msg, num] = Array.isArray(testCase) ? testCase : [testCase, '', 1000000]
      return json(fn, msg, num)
    })

    const perSecVals = samples.map(s => s.perSecVal)
    const minVal = min(perSecVals)

    samples.forEach(sample => {
      if (sample.perSecVal > minVal) {
        const ratio = sample.perSecVal / minVal
        sample.fastStr = c.g('x' + ratio.toFixed(2)) + ' fast'
      }
      printResult(sample)
    })
  }
}

const bench = {
  json,
  print: printResult,
  suite,
  benchmark
}

module.exports = bench
