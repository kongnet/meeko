'use strict'
/**
 * @namespace Math_prototype
 */

const _stat = function (x, y) {
  let [len, xmean, ymean, sumx, sumy, sumxy] = [
    x.length, x.mean(), y.mean(), 0, 0, 0]
  for (let i = 0; i < len; i++) {
    sumx += (x[i] - xmean) * (x[i] - xmean)
    sumy += (y[i] - ymean) * (y[i] - ymean)
    sumxy += (y[i] - ymean) * (x[i] - xmean)
  }
  return { len, xmean, ymean, sumx, sumy, sumxy }
}
const sum = a => a.reduce((x, y) => x + y)

/**
* @memberof Math_prototype#
* @param {Array} a - 数组
* @description 方差
* @function variance
* @return {string}
* @example
* variance([2, 1, 8.1, 3, 4, 5.1, 6.7]).toFixed(6)
* // '5.542041'
*/
const variance = a => { // stddev 标准偏差/标准差/均方差 2.354154 方差开根号
  let mean = a.mean()
  let len = a.length
  return a.reduce(function (x, y) {
    return x + (y - mean) * (y - mean)
  }, 0) / len
}

/**
* @memberof Math_prototype#
* @param {Array} a - 数组
* @description 更正方差
* @function varianceCorrect
* @return {string}
* @example
* varianceCorrect([2, 1, 8.1, 3, 4, 5.1, 6.7]).toFixed(6)
* // '6.465714'
*/
const varianceCorrect = a => { // sqrt(varianceCorrect) 更正的标准偏差 2.542777 更正开根号
  let mean = a.mean()
  let len = a.length - 1
  return a.reduce(function (x, y) {
    return x + (y - mean) * (y - mean)
  }, 0) / len
}

/**
* @memberof Math_prototype#
* @param {Array} a - 数组
* @description 几何平均数
* @function gMean
* @return {string}
* @example
* gMean([2, 1, 8.1, 3, 4, 5.1, 6.7]).toFixed(6)
* // '3.515999'
*/
const gMean = a => {
  let len = 1 / a.length
  return a.reduce(function (x, y) { // 几何平均
    return x * Math.pow(y, len)
  }, 1)
}

/**
* @memberof Math_prototype#
* @param {Array} a - 数组
* @description 调和平均数
* @function hMean
* @return {string}
* @example
* hMean([2, 1, 8.1, 3, 4, 5.1, 6.7]).toFixed(6)
* // '2.742815'
*/
const hMean = a => { // 调和平均
  let len = a.length
  return len / a.reduce(function (x, y) {
    return x + 1 / y
  }, 0)
}

/**
* @memberof Math_prototype#
* @param {Array} a - 数组
* @description 平方平均数
* @function qMean
* @return {string}
* @example
* qMean([2, 1, 8.1, 3, 4, 5.1, 6.7]).toFixed(6)
* // '4.877206'
*/
const qMean = a => { // 平方平均
  let len = a.length
  return Math.sqrt(a.reduce(function (x, y) {
    return x + y * y
  }, 0) / len)
}

/**
* @memberof Math_prototype#
* @param {Array} a - 数组
* @description 最大值
* @function max
* @return {number}
* @example
* max([2, 1, 8.1, 3, 4, 5.1, 6.7])
* // 8.1
*/
const max = a => a.reduce((x, y) => x > y ? x : y)

/**
* @memberof Math_prototype#
* @param {Array} a - 数组
* @description 最小值
* @function min
* @return {number}
* @example
* min([2, 1, 8.1, 3, 4, 5.1, 6.7])
* // 1
*/
const min = a => a.reduce((x, y) => x < y ? x : y)

/**
* @memberof Math_prototype#
* @param {Array} a - 数组
* @description 极值
* @function range
* @return {number}
* @example
* range([2, 1, 8.1, 3, 4, 5.1, 6.7])
* // 7.1
*/
const range = a => max(a) - min(a) // 极差/范围误差/全距

/**
* @memberof Math_prototype#
* @param {Array} a - 数组
* @description 方差开根号
* @function stddev
* @return {number}
* @example
* stddev([1, 2, 3, 4, 5])
* // 1.4142135623730951
*/
const stddev = a => Math.sqrt(variance(a))// stddev 标准偏差/标准差/均方差 2.354154 方差开

/**
* @memberof Math_prototype#
* @param {Array} a - 数组
* @description 更正开根号
* @function stddevCorrect
* @return {string}
* @example
* stddevCorrect([2, 1, 8.1, 3, 4, 5.1, 6.7]).toFixed(6)
* // '2.542777'
*/
const stddevCorrect = a => Math.sqrt(varianceCorrect(a))// 更正的标准偏差

/**
* @memberof Math_prototype#
* @param {Array} a - 数组
* @description 平均偏差
* @function meanDev
* @return {string}
* @example
* meanDev([2, 1, 8.1, 3, 4, 5.1, 6.7]).toFixed(6)
* // '2.024490'
*/
const meanDev = a => { // mean Deviation 平均偏差 2.024490
  let mean = a.mean()
  let len = a.length
  return a.reduce(function (x, y) {
    return x + Math.abs(y - mean)
  }, 0) / len
}

/**
* @memberof Math_prototype#
* @param {Array} a - 数组
* @description 中位数偏差
* @function medianDev
* @return {string}
* @example
* medianDev([2, 1, 8.1, 3, 4, 5.1, 6.7]).toFixed(6)
* // '1.985714'
*/
const medianDev = a => { // medianDev 中位数偏差 1.985714
  let median = a.median(a.sort())
  let len = a.length
  return a.reduce(function (x, y) {
    return x + Math.abs(y - median)
  }, 0) / len
}

/**
* @memberof Math_prototype#
* @param {Array} a - 数组
* @description 标准误差
* @function stdErr
* @return {string}
* @example
* stdErr([2, 1, 8.1, 3, 4, 5.1, 6.7]).toFixed(6)
* // '0.961079'
*/
const stdErr = a => { // Standard error 标准误差 0.961079
  let len = a.length
  return Math.sqrt(variance(a) / (len - 1)) // also equal Math.sqrt(varianceCorrect(a) / len)
}

/**
* @memberof Math_prototype#
* @param {Array} a - 数组
* @description 变异系数/离散系数
* @function coeVariation
* @return {string}
* @example
* coeVariation([2, 1, 8.1, 3, 4, 5.1, 6.7]).toFixed(6)
* // '0.551140'
*/
const coeVariation = a => { // Coefficient of Variation 变异系数/离散系数 0.551140
  let mean = a.mean()
  return Math.sqrt(variance(a)) / mean
}

/**
* @memberof Math_prototype#
* @param {Array} a - 数组
* @description 偏度 pandas模块
* @function skew
* @return {string}
* @example
* skew([53, 61, 49, 66, 78, 47]).toFixed(6)
* // '0.782633'
*/
const skew = a => { // skew 偏度 pandas模块 0.7826325504212567
  let len = a.length
  let mean = a.mean()
  let v1 = a.reduce(function (x, y) {
    return x + (y - mean) * (y - mean) * (y - mean)
  }, 0) / len
  let v2 = Math.pow(a.reduce(function (x, y) {
    return x + (y - mean) * (y - mean)
  }, 0) / len, 1.5)
  return ((v1 / v2) * Math.sqrt(len * (len - 1)) / (len - 2))
}

/**
* @memberof Math_prototype#
* @param {Array} a - 数组
* @description 峰度/峰态系数 pandas模块
* @function kurt1
* @return {number}
* @example
* kurt1([53, 61, 49, 66, 78, 47])
* // -0.2631655441038472
*/
const kurt1 = a => {
  let len = a.length
  let mean = a.mean()
  let v1 = a.reduce(function (x, y) {
    return x + (y - mean) * (y - mean) * (y - mean) * (y - mean)
  }, 0) / varianceCorrect(a) / varianceCorrect(a)

  return v1 / (len - 1) / (len - 2) / (len - 3) * (len + 1) * len - 3 * (len - 1) * (len - 1) / (len - 2) / (len - 3)
}

/**
* @memberof Math_prototype#
* @param {Array} a - 数组
* @description >3 =3 <3 峰度/峰态系数
* @function kurt2
* @return {number}
* @example
* kurt2([53, 61, 49, 66, 78, 47])
* // 1.7105241302560437
*/
const kurt2 = a => { // 另一种算法
  let len = a.length
  let mean = a.mean()
  let v1 = a.reduce(function (x, y) {
    return x + (y - mean) * (y - mean) * (y - mean) * (y - mean)
  }, 0) / varianceCorrect(a) / varianceCorrect(a)

  return v1 / (len - 1)
}

/**
* @memberof Math_prototype#
* @param {Array} a - 数组
* @description wiki上的算法 峰度/峰态系数
* @function kurt3
* @return {number}
* @example
* kurt3([53, 61, 49, 66, 78, 47])
* // -0.9473710436927472
*/
const kurt3 = a => { // wiki 上的算法
  let len = a.length
  let mean = a.mean()
  let v1 = a.reduce(function (x, y) {
    return x + (y - mean) * (y - mean) * (y - mean) * (y - mean)
  }, 0) / len
  let v2 = a.reduce(function (x, y) {
    return x + (y - mean) * (y - mean)
  }, 0) / len
  return v1 / v2 / v2 - 3
}

/**
* @memberof Math_prototype#
* @param {Array} a - 数组
* @description wiki上的算法 峰度/峰态系数
* @function confidenceIntervals
* @return {Array}
* @example
* confidenceIntervals([2, 1, 8.1, 3, 4, 5.1, 6.7])
* // [0.1659026888164572 , 8.376954454040686]
*/
const confidenceIntervals = a => { // 置信区间
  let len = a.length
  let mean = a.mean()
  let v1 = variance(a)
  let v2 = 1.959964 * v1 / Math.sqrt(len)
  return [mean - v2, mean + v2]
}
// 数组原型扩展
module.exports = {
  sum,
  max,
  min,
  range,
  num2e (num, fixNum) {
    let p = Math.floor(Math.log(num) / Math.LN10)
    let n = num * Math.pow(10, -p)
    return n.toFixed(fixNum || 4) + 'e' + p
  },
  // 调和平均数≤几何平均数≤算术平均数≤平方平均数
  hMean,
  gMean,
  mean (a) {
    return a.mean()
  },
  qMean,
  median (a) {
    return a.median()
  },
  variance,
  varianceCorrect,
  stddev,
  stddevCorrect,
  meanDev,
  medianDev,
  stdErr,
  coeVariation,
  skew,
  kurt1,
  kurt2,
  kurt3,
  confidenceIntervals,
  linearFitting (x = [], y = []) { // 线性拟合 y=a*x+b
    let { xmean, ymean, sumx, sumy, sumxy } = _stat(x, y)
    let a = sumxy / sumx
    let b = ymean - a * xmean
    let r = sumxy * sumxy / (sumx * sumy)
    return {
      a, // 斜率 slope
      b, // 截距 intercept
      r, // 拟合度 R^2
      f: `y=${a.toFixed(4)}*x+${b.toFixed(4)} R^2=${r.toFixed(4)}`
    }
  },
  exponentFitting (x = [], y = []) { // 指数拟合 y=a*e^(b*x)
    let rst = this.linearFitting(x, y.map(item => Math.log(item)))
    let [a, b, r] = [Math.pow(Math.E, rst.b), rst.a, rst.r]
    return { a,
      b,
      r,
      f: `y=${a.toFixed(4)}*e^(${b.toFixed(4)}*x) R^2=${r.toFixed(4)}`
    }
  },
  lnFitting (x = [], y = []) { // 对数拟合 y=a*ln(x)+b
    let rst = this.linearFitting(x.map(item => Math.log(item)), y)
    let [a, b, r] = [rst.a, rst.b, rst.r]
    return { a,
      b,
      r,
      f: `y=${a.toFixed(4)}*ln(x)+${b.toFixed(4)} R^2=${r.toFixed(4)}`
    }
  },
  powerFitting (x = [], y = []) { // 幂函数拟合 y=a*x^b
    let rst = this.linearFitting(x.map(item => Math.log(item)), y.map(item => Math.log(item)))
    let [a, b, r] = [Math.pow(Math.E, rst.b), rst.a, rst.r]
    return { a,
      b,
      r,
      f: `y=${a.toFixed(4)}*x^${b.toFixed(4)} R^2=${r.toFixed(4)}`
    }
  },
  pearson (x = [], y = []) {
  /*
  0.8-1.0 极强相关
  0.6-0.8 强相关
  0.4-0.6 中等程度相关
  0.2-0.4 弱相关
  0.0-0.2 极弱相关或无相关
  */
    let { sumx, sumy, sumxy } = _stat(x, y)
    let p = sumxy / Math.sqrt(sumx * sumy)
    return p
  }

}
