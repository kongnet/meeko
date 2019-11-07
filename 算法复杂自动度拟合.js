/* istanbul ignore next */

'use strict'
const $ = require('./index')
const crypto = require('crypto')
const { PerformanceObserver, performance } = require('perf_hooks')
function test (n) {
  let x = 0
  const sortFunc = function (array, orderType = 'asc') {
    let i = 1
    let j
    let temp
    let key
    const len = array.length
    for (; i < len; i++) {
      temp = j = i
      key = array[j]
      while (--j > -1) {
        if (orderType === 'desc') {
          if (array[j] > key) {
            array[j + 1] = array[j]
          } else {
            break
          }
        } else {
          if (array[j] < key) {
            array[j + 1] = array[j]
          } else {
            break
          }
        }
      }
      array[j + 1] = key
    }
    return array
  }
  return sortFunc($.Mock.genList(n), 'desc')
  // x = $.math.lnFitting($.Mock.genList(10), $.Mock.genList(10))
  for (let i = 1; i < n; i++) {
    // for (let m = 1; m < n; m++) {
    for (let m1 = 1; m1 < n; m1++) {
      x++
    }
    // }
  }
}

function aglo (func) {
  const timesN = [10, 50, 100, 500, 1000, 5000, 10000, 100000]
  const costTime = timesN.map((item, idx) => {
    const t = performance.now()
    func(item)
    return performance.now() - t
  })
  const radOne = Math.PI / 180
  const n1 = $.math.linearFitting(timesN, costTime)
  const rad = Math.abs((Math.atan(n1.a) / Math.PI).toFixed(10))
  const radN = rad / radOne

  if (radN <= 0.000023) {
    // 0.0000697461524012751
    console.log('O(1) 常量级别')
    return radN
  }
  if (radN > 0.000023 && radN <= 0.00003) {
    console.log('O(log2(N)) 2为底对数')
    return radN
  }
  if (radN > 0.000028 && radN <= 0.0005) {
    console.log('O(N) N级别')
    return radN
  }
  if (radN > 0.0005 && radN <= 0.01) {
    console.log('O(N*log2(N)) N*log2(N)级别')
    return radN
  }
  if (radN > 0.01 && radN <= 2.1) {
    console.log('O(N^2) N^2级别')
    return radN
  }
  if (radN > 2.1) {
    console.log('O(N^2*log2(N))+ 非常糟糕，建议优化')
    return radN
  }

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

console.log(aglo(fn2))
