'use strict'
// const { performance } = require('perf_hooks')

const { c } = require('./tools')
const { min } = require('./math')
const print = function print ({ funcName, spendTime, perSecVal, n, range, msg, fastStr }) {
  console.log(
    c.y(funcName.fillStr(' ', 15)),
    (spendTime.toFixed(0) + ' ms').fillStr(' ', 8, -1),
    ((+perSecVal >= 1 ? (perSecVal + '').toMoney() : perSecVal.toFixed(6)) + ' /ms').fillStr(' ', 10, -1),
    n.toExponential() + ' 次',
    ('±' + range.round(2) + '%').fillStr(' ', 9, -1),
    msg,
    fastStr || ''
  )
}
const json = function json (
  fn = function () {
    /* do nothing */
  },
  msg = '',
  n = 1000000
) {
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
  const spendTime = diffTime
  const perSec = ((n / diffTime) * 10000) / 10000
  const funcName = fn.name || ''
  const perSecVal = perSec >= 1 ? perSec | 0 : perSec.toFixed(6)
  const range = ((maxDt - minDt) / 2 / (spendTime / n)) * 100

  // 只输出json对象
  return { funcName, spendTime, perSecVal: +perSecVal, n, range, msg }
}
/**
 * benchmark，性能测试函数.
 * @param {function} fn - 被执行的函数.
 * @param {String} msg - 后面的说明
 * @param {number} n - 执行次数.
 * @param {*} isJson  - 是否json返回
 * @return {void} 返回 [函数名] [执行时间] 毫秒 [每毫秒运行次数]/ms [执行次数] 次.
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
  num = 1000000
) {
  print(json(fn, msg, num))
}

function suite (a) {
  for (let i = 0; i < a.length; i++) {
    const testSample = []
    const len = a[i].testArr.length
    for (let k = 0; k < len; k++) {
      testSample[k] = json.apply(null, a[i].testArr[k])
    }
    console.log('========', a[i].name || '测试' + (i + 1), '========')
    const perSecArr = testSample.map(x => x.perSecVal)

    const minVal = min(perSecArr)

    testSample.forEach((item, idx) => {
      if (testSample[idx].perSecVal > minVal) {
        item.fastStr = c.g('x' + (testSample[idx].perSecVal / minVal).toFixed(2)) + ' fast'
      }
      print(item)
    })
    // console.log(perSecArr,maxIdx)
  }
}
const bench = {
  json,
  print,
  suite,
  benchmark
}
module.exports = bench
