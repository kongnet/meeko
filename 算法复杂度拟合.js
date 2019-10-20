/* istanbul ignore next */

'use strict'
const $ = require('./index')
const crypto = require('crypto')
const { PerformanceObserver, performance } = require('perf_hooks')
function test (n) {
  let x = 0
  for (let i = 1; i < n; i++) {
    for (let m = 1; m < n; m *= 2) {
      // for (let m1 = 1; m1 < n; m1++) {
      x++
    }
    // }
  }
}

function aglo (func) {
  const timesN = [1, 10, 100, 200, 1000, 2000, 10000]//, 20000]
  const costTime = timesN.map((item, idx) => {
    const t = performance.now()
    func(item)
    return performance.now() - t
  })
  // console.log(costTime)
  // const costTime = [1, 1, 1, 1, 1, 1.5]
  // const costTime = [Math.log2(1), Math.log2(10), Math.log2(100), Math.log2(1000), Math.log2(10000), Math.log2(100000)]
  // const costTime = [1, 10, 100, 1000, 10000, 100000]
  // const costTime = [Math.log2(1), Math.log2(10) * 10, Math.log2(100) * 100, Math.log2(1000) * 1000, Math.log2(10000) * 10000, Math.log2(100000) * 100000]
  // const costTime = [1, 1e3, 1e6, 1e9, 1e12, 1e15]

  const radOne = Math.PI / 180
  const n1 = $.math.linearFitting(timesN, costTime)
  const rad = Math.abs((Math.atan(n1.a) / Math.PI).toFixed(10))
  const radN = rad / radOne

  if (radN <= 0.000004) { // 0.0000697461524012751
    console.log('O(1) 常量级别')
    return radN
  }
  if (radN > 0.000004 && radN <= 0.0000168) {
    console.log('O(log2(N)) 2为底对数')
    return radN
  }
  if (radN > 0.0000168 && radN <= 0.00068) {
    console.log('O(N) N级别')
    return radN
  }
  if (radN > 0.00068 && radN <= 0.1) {
    console.log('O(N*log2(N)) N级别')
    return radN
  }
  if (radN > 0.1 && radN <= 2.9) {
    console.log('O(N^2) N^2级别')
    return radN
  }
  if (radN > 2.9) {
    console.log('O(N^3)+ 非常糟糕，建议优化')
    return radN
  }
  // O(1)  0 - 0.00011459155902616463
  // O(log2(N)) 0.0020053522829578813
  // O(N) 14.32394487827058
  // O(N*log2(N)) 27.554628987652038
  // O(N^2) 28.647717869202623
  // O(N^3) 28.64788975654116

  // console.log(rad + 'π', rad, rad / radOne, radOne)

  /*
  方法二 通过 meeko的拟合函数R^2判断,较复杂
  console.log($.math.exponentFitting([1, 2, 3, 4, 5, 6, 7], [1, 2, 3, 4, 5, 6, 7]))
  console.log($.math.lnFitting([1, 2, 3, 4, 5, 6, 7], [1, 2, 3, 4, 5, 6, 7]))
  console.log($.math.powerFitting([1, 2, 3, 4, 5, 6, 7], [1, 2, 3, 4, 5, 6, 7]))
  console.log($.math.polyFitting([1, 2, 3, 4, 5, 6, 7], [1, 2, 3, 4, 5, 6, 7])) */
  return radN
}
/*
const timeArr = []
for (let i = 0; i < 10000; i++) {
  timeArr.push(aglo(test))
}
console.log(Math.min.apply(null, timeArr), Math.max.apply(null, timeArr)) */
console.log(aglo(test))
// 0.000091
//
