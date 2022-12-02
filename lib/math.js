'use strict'
// @ts-check
/**
 * @namespace Math_prototype
 */

const mathRand = require('./mathRand')
const mathAlgebra = require('./mathAlgebra')
const dist = require('./mathDistance')
const mat = require('./mathMatrix')
const MAX64_BIGINT = 2n ** 63n - 1n
const MIN64_BIGINT = -1n * MAX64_BIGINT
/**
 *
 * @param {Number} s
 * @param {Number} e
 * @param {Number} step
 */

const genRange = (start, stop, step = 1) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step)

//const genRange = (start, stop, step = 1) => new Array(Math.floor((stop - start) / step + 1)).fill(0).map((_, index) => index * step + start)

const max = a => {
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

  return a.reduce((x, y) => (x > y ? x : y))
}
const min = a => {
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

  return a.reduce((x, y) => (x < y ? x : y))
}
const range = a => {
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

  return max(a) - min(a)
} // 极差/范围误差/全距
const sum = a => (a.length ? a.reduce((x, y) => x + y) : 0)

const mean = a => {
  /**
   * @memberof Math_prototype#
   * @description 从数组值求平均数
   * @function mean
   * @return {integer}
   * @example
   * $.math.mean([1, 2, 3, 4, 5])
   * // 3
   */

  const len = a.length
  return sum(a) / len
}
const largek = function (a, k) {
  return a.sort((a, b) => b - a)[k - 1]
}
const smallk = function (a, k) {
  return a.sort((a, b) => a - b)[k - 1]
}
const median = a => {
  /**
   * @memberof Math_prototype#
   * @param {Array} a - 数组
   * @description 从数组值求中位数
   * @function median
   * @return {Number}
   * @example
   * $.math.median([1, 2, 3, 4, 5])
   * // 3
   */

  const meSort = a.copy().sort((a, b) => a - b)
  const len = meSort.length
  return len & 1 ? meSort[(len - 1) / 2] : (meSort[len / 2] + meSort[len / 2 - 1]) / 2
}

const quantile = (a, pos = 2, type = 'inc') => {
  /**
   * @memberof Math_prototype#
   * @param {Array} a - 数组
   * @param {integer} pos - 0min 1四分之一 2四分之二 3四分之三 4max
   * @param {integer} type - 求位置算法
   * @description 从数组值求四分位数
   * @function quantile
   * @return {Number}
   * @example
   * excel quartile.exc 只有 1,2中位数,3
   * quartile.inc 0,1,2,3
   * Q0 min
   * Q1的位置=[(n + 3) /4] 0.25,0.5,0.75 乘 上-下
   * Q2的位置= 中位数
   * Q3的位置=[(3*n+1)/4] 0.25,0.5,0.75 乘 上-下
   * Q4 max
   */
  const aCopy = a.copy()
  const meSort = aCopy.sort((a, b) => a - b)
  const len = meSort.length
  const lowSit = len + 3
  const upSit = 3 * len + 1
  const ratio = [0, 0.25, 0.5, 0.75]
  let sit = 0
  let up = -1
  switch (+pos) {
    case 0:
      return type === 'inc' ? min(meSort) : NaN
    case 1:
      sit = ((lowSit / 4) | 0) - 1
      up = meSort[sit + 1]
      if (up === undefined) {
        up = meSort[sit]
      }
      return meSort[sit] + (up - meSort[sit]) * ratio[type === 'inc' ? lowSit % 4 : 1]
    case 2:
      return median(meSort)
    case 3:
      sit = ((upSit / 4) | 0) - 1
      up = meSort[sit + 1]
      if (up === undefined) {
        up = meSort[sit]
      }
      return meSort[sit] + (up - meSort[sit]) * ratio[type === 'inc' ? upSit % 4 : 3]
    case 4:
      return type === 'inc' ? max(meSort) : NaN
    default:
      return median(meSort)
  }
}
const quantileAll = (a, outRatio = 1.5, type = 'inc') => {
  /**
   * @memberof Math_prototype#
   * @param {Array} a - 数组
   * @param {Number} outRatio - 异常点倍数 1.5普通异常 3极度异常
   * @param {integer} type - 求位置算法
   * @description 从数组值求四分位数全部位置
   * @function quantileAll
   * @return {Number}
   * @example
   * excel quartile.exc 只有 1,2中位数,3
   * quartile.inc 0,1,2,3
   * Q0 min
   * Q1的位置=[(n + 3) /4] 0.25,0.5,0.75 乘 上-下
   * Q2的位置= 中位数
   * Q3的位置=[(3*n+1)/4] 0.25,0.5,0.75 乘 上-下
   * Q4 max
   */
  const aCopy = a.copy()
  const meSort = aCopy.copy().sort((a, b) => a - b)
  const len = meSort.length
  const lowSit = len + 3
  const upSit = 3 * len + 1
  const ratio = [0, 0.25, 0.5, 0.75]
  let sit = 0
  let up = -1

  sit = ((lowSit / 4) | 0) - 1
  up = meSort[sit + 1]
  if (up === undefined) {
    up = meSort[sit]
  }
  const Q1 = meSort[sit] + (up - meSort[sit]) * ratio[type === 'inc' ? lowSit % 4 : 1]
  sit = ((upSit / 4) | 0) - 1
  up = meSort[sit + 1]
  if (up === undefined) {
    up = meSort[sit]
  }
  const Q3 = meSort[sit] + (up - meSort[sit]) * ratio[type === 'inc' ? upSit % 4 : 3]
  const IQR = Q3 - Q1
  const upper = Q3 + outRatio * IQR
  const lower = Q1 - outRatio * IQR
  return {
    min: meSort[0],
    Q1,
    Q2: median(meSort),
    Q3,
    max: meSort[len - 1],
    IQR,
    upper,
    lower
  }
}

/**
 * @memberof Math_prototype#
 * @description 统计每个value的个数
 * @function count
 * @param {Array} a
 * @param {Boolean} isKV 是否以数组kvw形式返回
 * @return {Array|Object}
 * @example
 * ['A', 'B', 'B', 'C', 'A', 'D'].count()
 * // {"A":2,"B":2,"C":1,"D":1}
 */

const count = (a = []) => {
  return a.reduce(function (o, item) {
    o[item] = o[item] ? ++o[item] : 1
    return o
  }, {})
}
const countAdv = (a = []) => {
  const len = a.length
  const countObj = []
  const obj = count(a)
  for (const i in obj) {
    countObj.push({ k: i, v: obj[i], w: obj[i] / len })
  }
  return countObj
}
const mode = a => {
  /**
   * @memberof Math_prototype#
   * @param {Array} a - 数组
   * @description 从数组值求众数,出现次数>[n/2]
   * @function mode
   * @return {integer}
   * @example
   * $.math.mode([1, 1, 1, 2, 3])
   * // []
   */

  const arr = []
  const o = count(a)
  let max = 1 // 只有1次没有众数
  for (const i in o) {
    if (o[i] > max) {
      max = o[i]
      arr.length = 0
      arr.push(+i)
    }
  }
  return arr
}
const _stat = function (x, y, xMean, yMean) {
  let [len, xmean, ymean, sumx, sumy, sumxy] = [x.length, xMean || mean(x), yMean || mean(y), 0, 0, 0]
  for (let i = 0; i < len; i++) {
    sumx += (x[i] - xmean) * (x[i] - xmean)
    sumy += (y[i] - ymean) * (y[i] - ymean)
    sumxy += (y[i] - ymean) * (x[i] - xmean)
  }
  return { len, xmean, ymean, sumx, sumy, sumxy }
}
const covariance = (x = [], y = []) => {
  // 全体协方差
  /**
   * @memberof Math_prototype#
   * @param {Array} a - 数组
   * @description 方差
   * @function covariance
   * @return {string}
   * @example
   * covariance([2, 1, 8.1, 3, 4, 5.1, 6.7],[2, 1, 8.1, 3, 4, 5.1, 6.7]).toFixed(6)
   * // '5.542041'
   */

  const { len, sumxy } = _stat(x, y)
  return sumxy / len
}
const covarianceCorrect = (x = [], y = []) => {
  // 样本协方差
  /**
   * @memberof Math_prototype#
   * @param {Array} a - 数组
   * @description 方差
   * @function covarianceCorrect
   * @return {string}
   * @example
   * covariance([2, 1, 8.1, 3, 4, 5.1, 6.7],[2, 1, 8.1, 3, 4, 5.1, 6.7]).toFixed(6)
   * // '5.542041'
   */

  const { len, sumxy } = _stat(x, y)
  return sumxy / (len - 1) || 0
}

/*
 * 计算协方差
 *
 * @param {Array} arr
 * @param {Bool} isSample
 */

const cov = function (mat) {
  const len = mat.length
  const a = []
  for (let i = 0; i < len; i++) {
    a[i] = []
    for (let j = 0; j < len; j++) {
      a[i][j] = covarianceCorrect(mat[i], mat[j]) // / len
    }
  }
  return a
}
const variance = a => {
  // stddev 标准偏差/标准差/均方差 2.354154 方差开根号
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

  return covariance(a, a)
}

const varianceCorrect = a => {
  // sqrt(varianceCorrect) 标准偏差 2.542777 更正开根号
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
  /*
  const m = mean(a)
  const len = a.length - 1
  return (
    a.reduce(function (x, y) {
      return x + (y - m) * (y - m)
    }, 0) / len
  ) */

  return covarianceCorrect(a, a)
}

const gMean = a => {
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

  const len = 1 / a.length
  return a.reduce(function (x, y) {
    // 几何平均
    return x * Math.pow(y, len)
  }, 1)
}

const hMean = a => {
  // 调和平均
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

  const len = a.length
  return (
    len /
    a.reduce(function (x, y) {
      return x + 1 / y
    }, 0)
  )
}

const qMean = a => {
  // 平方平均
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

  const len = a.length
  return Math.sqrt(
    a.reduce(function (x, y) {
      return x + y * y
    }, 0) / len
  )
}

const stddev = a => {
  /**
   * @memberof Math_prototype#
   * @param {Array} a - 数组
   * @description 方差开根号 总体标准偏差(population)
   * @function stddev
   * @return {number}
   * @example
   * stddev([1, 2, 3, 4, 5])
   * // 1.4142135623730951
   */

  return Math.sqrt(variance(a))
} // stddev 总体标准偏差(population)/标准差/均方差 2.354154 方差开

const stddevCorrect = a => {
  /**
   * @memberof Math_prototype#
   * @param {Array} a - 数组
   * @description 标准偏差(sample)
   * @function stddevCorrect
   * @return {string}
   * @example
   * stddevCorrect([2, 1, 8.1, 3, 4, 5.1, 6.7]).toFixed(6)
   * // '2.542777'
   */

  return Math.sqrt(varianceCorrect(a))
} // 标准偏差(sample)

const meanDev = a => {
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
  // mean Deviation 平均偏差 2.024490
  const len = a.length
  return (
    a.reduce(function (x, y) {
      return x + Math.abs(y - mean(a))
    }, 0) / len
  )
}

const medianDev = a => {
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
  // medianDev 中位数偏差 1.985714
  const med = a.median(a.sort((a, b) => a - b))
  const len = a.length
  return (
    a.reduce(function (x, y) {
      return x + Math.abs(y - med)
    }, 0) / len
  )
}

const stdErr = a => {
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
  // Standard error 标准误差 0.961079
  const len = a.length
  return Math.sqrt(variance(a) / (len - 1)) // also equal Math.sqrt(varianceCorrect(a) / len)
}

const coeVariation = a => {
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
  // Coefficient of Variation 变异系数/离散系数 0.551140
  const m = mean(a)
  return stddev(a) / m
}

const skew = a => {
  /**
   * @memberof Math_prototype#
   * @param {Array} a - 数组
   * @description 偏度 同excel skew函数
   * @function skew
   * @return {string}
   * @example
   * skew([53, 61, 49, 66, 78, 47]).toFixed(6)
   * // '0.782633'
   */

  const len = a.length
  const m = mean(a)
  const v1 =
    a.reduce(function (x, y) {
      return x + (y - m) * (y - m) * (y - m)
    }, 0) / len
  const v2 = Math.pow(
    a.reduce(function (x, y) {
      return x + (y - m) * (y - m)
    }, 0) / len,
    1.5
  )
  return ((v1 / v2) * Math.sqrt(len * (len - 1))) / (len - 2)
}

const kurt1 = a => {
  /**
   * @memberof Math_prototype#
   * @param {Array} a - 数组
   * @description 峰度/峰态系数 同excel kurt函数
   * @function kurt1
   * @return {number}
   * @example
   * kurt1([53, 61, 49, 66, 78, 47])
   * // -0.2631655441038472
   */

  const len = a.length
  const m = mean(a)
  const v1 =
    a.reduce(function (x, y) {
      return x + (y - m) * (y - m) * (y - m) * (y - m)
    }, 0) /
    varianceCorrect(a) /
    varianceCorrect(a)

  return (v1 / (len - 1) / (len - 2) / (len - 3)) * (len + 1) * len - (3 * (len - 1) * (len - 1)) / (len - 2) / (len - 3)
}

const kurt2 = a => {
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
  // 另一种算法
  const len = a.length
  const m = mean(a)
  const v1 =
    a.reduce(function (x, y) {
      return x + (y - m) * (y - m) * (y - m) * (y - m)
    }, 0) /
    varianceCorrect(a) /
    varianceCorrect(a)

  return v1 / (len - 1)
}

const kurt3 = a => {
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
  // wiki 上的算法
  const len = a.length
  const m = mean(a)
  const v1 =
    a.reduce(function (x, y) {
      return x + (y - m) * (y - m) * (y - m) * (y - m)
    }, 0) / len
  const v2 =
    a.reduce(function (x, y) {
      return x + (y - m) * (y - m)
    }, 0) / len
  return v1 / v2 / v2 - 3
}

const confidenceIntervals = a => {
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
  // 置信区间
  const len = a.length
  const m = mean(a)
  const v1 = variance(a)
  const v2 = (1.959964 * v1) / Math.sqrt(len)
  return [m - v2, m + v2]
}
// 组合数学相关
const fac = num => {
  if (num < 0) {
    return -1
  } else if (num === 0 || num === 1) {
    return 1
  } else {
    for (let i = num - 1; i >= 1; i--) {
      num *= i
    }
    return num
  }
}
const arrangement = (n, m) => fac(n) / fac(n - m)
const combination = (n, m) => fac(n) / fac(m) / fac(n - m)
// N种数中取M个数的可重复组合 N次有放回无序抽样 H(n,m)=C(n+m-1,m)
const hCombin = (n, m) => combination(n + m - 1, m)

/**
 * @memberof Math_prototype#
 * @description 排列数组输出
 * @param {Array} arr 要全排列的数组
 * @param {Number} num 每次拿出的值
 */

const arrangeList = (arr, num) => {
  const r = []
  ;(function f (t, a, n) {
    if (n === 0) {
      return r.push(t)
    }
    for (let i = 0, l = a.length; i < l; i++) {
      f(t.concat(a[i]), a.slice(0, i).concat(a.slice(i + 1)), n - 1)
    }
  })([], arr, num)
  return r
}

/**
 * @memberof Math_prototype#
 * @description 组合数组输出
 * @param {*} arr
 * @param {*} num
 */

const combinList = (arr, num) => {
  const r = []
  ;(function f (t, a, n) {
    if (n === 0) {
      return r.push(t)
    }
    for (let i = 0, l = a.length; i <= l - n; i++) {
      f(t.concat(a[i]), a.slice(i + 1), n - 1)
    }
  })([], arr, num)
  return r
}

/**
 * @memberof Math_prototype#
 * @description 数组下标全排列输出
 * @param {*} len
 * @param {*} num
 */

const allList = (len, num) => {
  const point = new Array(num).fill(0)
  let pointSum = 0
  const a = []
  a.push(point.copy())
  while (pointSum ^ ((len - 1) * num)) {
    point[0]++
    point[0] = point[0] % len
    if (point[0] === 0) {
      for (let i = 1; i < num; i++) {
        point[i]++
        point[i] = point[i] % len
        if (point[i] % len === 0) {
          // do nothing
        } else {
          break
        }
      }
    }
    a.push(point.copy())

    pointSum = sum(point)
  }
  return a
}

/**
 * @description 找到count对象中最大的
 * @param {Object} o
 */

const findMax = o => {
  let max = 0
  let maxKey = ''
  for (const i in o) {
    if (o[i] > max) {
      max = o[i]
      maxKey = i
    }
  }
  return { tag: maxKey, maxValue: max }
}
/**
 * 找到数组中最大最小值
 * @param {Array} a
 * @returns {Object}
 */
const findMaxMin = a => {
  let max, min, maxIdx, minIdx, sum, count
  if (typeof a[0] === 'bigint') {
    ;[max, min, maxIdx, minIdx, sum, count] = [MIN64_BIGINT, MAX64_BIGINT, -1, -1, 0n, a.length]
  } else {
    ;[max, min, maxIdx, minIdx, sum, count] = [-Infinity, Infinity, -1, -1, 0, a.length]
  }

  for (let i = 0; i < count; i++) {
    if (a[i] > max) {
      max = a[i]
      maxIdx = i
    }
    if (a[i] < min) {
      min = a[i]
      minIdx = i
    }
    sum += a[i]
  }
  return { max, min, maxIdx, minIdx, count, sum }
}
const murmurHash = (key, seed = 0xee6b27eb) => {
  // ver3
  let remainder, bytes, h1, h1b, c1, c2, k1, i //c1b ,c2b
  remainder = key.length & 3 // key.length % 4
  bytes = key.length - remainder
  h1 = seed
  c1 = 0xcc9e2d51
  c2 = 0x1b873593
  i = 0

  while (i < bytes) {
    k1 = (key.charCodeAt(i) & 0xff) | ((key.charCodeAt(++i) & 0xff) << 8) | ((key.charCodeAt(++i) & 0xff) << 16) | ((key.charCodeAt(++i) & 0xff) << 24)
    ++i

    k1 = ((k1 & 0xffff) * c1 + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff
    k1 = (k1 << 15) | (k1 >>> 17)
    k1 = ((k1 & 0xffff) * c2 + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff

    h1 ^= k1
    h1 = (h1 << 13) | (h1 >>> 19)
    h1b = ((h1 & 0xffff) * 5 + ((((h1 >>> 16) * 5) & 0xffff) << 16)) & 0xffffffff
    h1 = (h1b & 0xffff) + 0x6b64 + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16)
  }

  k1 = 0

  switch (remainder) {
    case 3:
      k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16
      break
    case 2:
      k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8
      break
    case 1:
      k1 ^= key.charCodeAt(i) & 0xff

      k1 = ((k1 & 0xffff) * c1 + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff
      k1 = (k1 << 15) | (k1 >>> 17)
      k1 = ((k1 & 0xffff) * c2 + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff
      h1 ^= k1
  }

  h1 ^= key.length

  h1 ^= h1 >>> 16
  h1 = ((h1 & 0xffff) * 0x85ebca6b + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff
  h1 ^= h1 >>> 13
  h1 = ((h1 & 0xffff) * 0xc2b2ae35 + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16)) & 0xffffffff
  h1 ^= h1 >>> 16

  return h1 >>> 0
}
/**
 * 傅里叶分析函数
 * @memberof Math_prototype#
 * @function fourierAnalysis
 * @param {Array} a
 * @returns {{period:Number}}
 */
function fourierAnalysis (a) {
  const PI2 = Math.PI * 2
  let arr = a.copy()
  const meanData = mean(arr)
  arr = arr.map(x => x - meanData)
  const len = arr.length
  const fillNum = 2 ** (Math.log2(len) | 0) // 2^N
  arr = arr.concat(genRange(0, fillNum - len - 1, 1)) // fill => 2^N
  let fourierArr = []
  for (let idx = 0; idx < fillNum; idx++) {
    fourierArr[idx] = [0, 0, 0] // 实部 虚部 共轭相乘
    // 时域=>频域
    for (let k = 0; k < fillNum; k++) {
      fourierArr[idx][0] += arr[k] * Math.cos((PI2 * k * idx) / fillNum)
      fourierArr[idx][1] += arr[k] * Math.sin((PI2 * k * idx) / fillNum)
    }
    fourierArr[idx][2] = fourierArr[idx][0] ** 2 + fourierArr[idx][1] ** 2
  }
  // console.log(fourierArr.map(x => x[2] / fillNum).join('\n'))
  fourierArr = fourierArr
    .map(x => x[2] / fillNum) // 算出功率
    .slice(0, fillNum / 2) // 取一半
  const maxFreq = max(fourierArr) // 取最大值，计算频率的倒数 即为 周期
  return { period: fillNum / fourierArr.findIndex(x => x === maxFreq) }
}
/**
 * 自相关系数
 * @memberof Math_prototype#
 * @function autoCorrelation
 * @param {Array} a 数据
 * @param {Number} lag 延后值
 * @returns {Number}
 */
function autoCorrelation (arr, lag = 1) {
  let [sumSq, sumXy, len] = [0, 0, arr.length]
  const mean = sum(arr) / len

  for (let i = 0; i < len; i++) {
    sumSq += (arr[i] - mean) ** 2
    if (i < len - lag) {
      sumXy += (arr[i] - mean) * (arr[i + lag] - mean)
    }
  }
  return sumXy === sumSq ? 1 : sumXy / sumSq
}
module.exports = Object.assign.call(null, mathAlgebra, mathRand, mat, {
  fac,
  arrangement,
  combination,
  combinList,
  arrangeList,
  hCombin,
  allList,
  approximatelyEqual (v1, v2, epsilon = 0.001) {
    return Math.abs(v1 - v2) < epsilon
  }, // 约等于
  count,
  countAdv,
  dist,
  findMax,
  findMaxMin,
  fourierAnalysis,
  autoCorrelation,
  mode,
  sum,
  max,
  min,
  smallk,
  largek,
  num2e (num, fixNum) {
    const p = Math.floor(Math.log(num) / Math.LN10)
    const n = num * Math.pow(10, -p)
    return n.toFixed(fixNum || 4) + 'e' + p
  },
  // 调和平均数≤几何平均数≤算术平均数≤平方平均数
  hMean,
  gMean,
  genRange,
  mean,
  qMean,
  median,
  quantile,
  quantileAll,
  covariance,
  covarianceCorrect,
  cov,
  variance,
  varianceCorrect,
  stddev,
  stddevCorrect,
  meanDev,
  medianDev,
  range,
  stat: _stat,
  stdErr,
  coeVariation,
  skew,
  kurt1,
  kurt2,
  kurt3,
  confidenceIntervals,
  murmurHash,
  exponentialSmoothing (y, a = 0.5, nextPoint = 0) {
    // 观察值，平滑系数，预测多少点
    const yArr = []
    for (let i = 0; i < y.length + nextPoint; i++) {
      yArr[i] = i === 0 ? y[0] : (y[i] || 0) * a + (1 - a) * yArr[i - 1]
    }
    return yArr
  },
  linearFitting (x = [], y = []) {
    // 线性拟合 y=a*x+b
    const { xmean, ymean, sumx, sumy, sumxy } = _stat(x, y)
    const a = sumxy / sumx
    const b = ymean - a * xmean
    const r = (sumxy * sumxy) / (sumx * sumy)
    return {
      a, // 斜率 slope
      b, // 截距 intercept
      r, // 拟合度 R^2
      f: `y=${a.toFixed(4)}*x+${b.toFixed(4)} R^2=${r.toFixed(4)}`,
      latex: `y=${a.toFixed(4)}\times x+${b.toFixed(4)}  R^{2}=${r.toFixed(4)}`
    }
  },
  exponentFitting (x = [], y = []) {
    // 指数拟合 y=a*e^(b*x)
    const rst = this.linearFitting(
      x,
      y.map(item => Math.log(item))
    )
    const [a, b, r] = [Math.pow(Math.E, rst.b), rst.a, rst.r]
    return {
      a,
      b,
      r,
      f: `y=${a.toFixed(4)}*e^(${b.toFixed(4)}*x) R^2=${r.toFixed(4)}`,
      latex: `y=${a.toFixed(4)}\times e^{ (${b.toFixed(4)}\times x)} R^{2}=${r.toFixed(4)}`
    }
  },
  lnFitting (x = [], y = []) {
    // 对数拟合 y=a*ln(x)+b
    const rst = this.linearFitting(
      x.map(item => Math.log(item)),
      y
    )
    const [a, b, r] = [rst.a, rst.b, rst.r]
    return {
      a,
      b,
      r,
      f: `y=${a.toFixed(4)}*ln(x)+${b.toFixed(4)} R^2=${r.toFixed(4)}`
    }
  },
  powerFitting (x = [], y = []) {
    // 幂函数拟合 y=a*x^b
    const rst = this.linearFitting(
      x.map(item => Math.log(item)),
      y.map(item => Math.log(item))
    )
    const [a, b, r] = [Math.pow(Math.E, rst.b), rst.a, rst.r]
    return {
      a,
      b,
      r,
      f: `y=${a.toFixed(4)}*x^${b.toFixed(4)} R^2=${r.toFixed(4)}`
    }
  },
  polyFitting (x = [], y = [], n = 2) {
    // 多项式拟合
    // https://www.jianshu.com/p/af0a4f71c05a
    const a = []
    const { ymean } = _stat(x, y)
    for (let i = 0; i < n + 1; i++) {
      let [row, rowY] = [[], 0]
      for (let j = 0; j < n + 1; j++) {
        let sx = 0
        let sxy = 0
        for (let d = 0; d < x.length; d++) {
          sx += x[d] ** (j + i)
          sxy += x[d] ** i * y[d]
        }
        if (j === 0) {
          rowY = sxy
        }
        row.push(sx)
      }
      a.push([...row, rowY])
    }
    const fitArr = mathAlgebra.gaussian(a)
    let sst = 0 // 回归平方
    let ssr = 0 // 占总误差平方
    const formula = []
    for (let i = 0; i < x.length; i++) {
      let fitSumY = 0
      fitArr.forEach((it, idx) => {
        fitSumY += it * x[i] ** idx
        if (i === 0) {
          formula.push(`${it.toFixed(4)}${idx ? '*x^' + idx : ''}`)
        }
      })
      ssr += (fitSumY - ymean) ** 2
      sst += (y[i] - ymean) ** 2
    }
    const r = ssr / sst
    return {
      r,
      f: `y=${formula.reverse().join('+').replace('^1+', '+').replace(/\+-/g, '-')} R^2=${+r.toFixed(4)}`,
      formula
    }
  },
  pearson (x = [], y = []) {
    /**
     * @memberof Math_prototype#
     * @param {Array} x - 数组
     * @param {Array} y - 数组
     * @description 皮尔逊相关分析，适用数据默认服从正态分布
     * @function pearson
     * @return {number}
     * @example
     * $.math.pearson([2.5, 3.5, 3.0, 3.5, 2.5, 3.0], [3.0, 3.5, 1.5, 5.0, 3.5, 3.0])
     *
     * 0.8-1.0 极强相关
     * 0.6-0.8 强相关
     * 0.4-0.6 中等程度相关
     * 0.2-0.4 弱相关
     * 0.0-0.2 极弱相关或无相关
     * 当两个变量的标准差都不为零时，相关系数才有定义，皮尔逊相关系数适用于：
     * (1)、两个变量之间是线性关系，都是连续数据。
     * (2)、两个变量的总体是正态分布，或接近正态的单峰分布。
     * (3)、两个变量的观测值是成对的，每对观测值之间相互独立。
     */

    const { sumx, sumy, sumxy } = _stat(x, y)
    return sumxy / Math.sqrt(sumx * sumy)
  },
  spearman (x = [], y = []) {
    /**
     * @memberof Math_prototype#
     * @param {Array} x - 数组
     * @param {Array} y - 数组
     * @description 斯皮尔曼等级相关分析，适用不清楚数据符合什么分布，强调数据在所在组中位置的吻合度
     * @function spearman
     * @return {number}
     * @example
     * $.math.spearman([3, 1, 5, 4, 2], [4, 1, 5, 2, 3])
     *
     * 斯皮尔曼等级相关系数同时也被认为是经过排行的两个随即变量的皮尔逊相关系数，要先排序
     * 相对于皮尔森相关系数，斯皮尔曼相关系数对于数据错误和极端值的反应不敏感
     * 这里需要注意：当变量的两个值相同时，它们的排行是通过对它们位置进行平均而得到的
     * 不论两个变量的总体分布形态、样本容量的大小如何，都可以用斯皮尔曼等级相关系数来进行研究
     * 0.8-1.0 极强相关
     * 0.6-0.8 强相关
     * 0.4-0.6 中等程度相关
     * 0.2-0.4 弱相关
     * 0.0-0.2 极弱相关或无相关
     * https://baike.baidu.com/item/%E6%96%AF%E7%9A%AE%E5%B0%94%E6%9B%BC%E7%AD%89%E7%BA%A7%E7%9B%B8%E5%85%B3/1858796
     * https://blog.csdn.net/zhaozhn5/article/details/78392220
     */

    const len = x.length
    const xRank = x.map(
      it =>
        x
          .copy()
          .sort((a, b) => b - a)
          .findIndex(item => item === it) // x，y排序后在原序列中的位置 TODO:如果数值相同，要平均相同的个数
    )

    const yRank = y.map(it =>
      y
        .copy()
        .sort((a, b) => b - a)
        .findIndex(item => item === it)
    )
    const d = xRank.map((item, idx) => (item - yRank[idx]) ** 2)

    return 1 - (sum(d) * 6) / (len * len * len - len)
  },

  kendall (x = [], y = []) {
    /**
     * @function kendall
     * @memberof Math_prototype#
     * @param {Array} x - 数组
     * @param {Array} y - 数组
     * @description kendall强调固定数据从大到小排列后，对另一组数据排位的影响
     * @return {Array}
     * @example kendall
     * $.math.kendall([0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55], [1, 0.95, 0.95, 0.9, 0.85, 0.7, 0.65, 0.6, 0.55, 0.42])
     * 情况1：Xi>Xj且Yi>Yj，情况2：Xi<Xj且Yi<Yj，这两个元素就被认为是一致的。
     * 情况3：Xi>Xj且Yi<Yj，情况4：Xi<Xj且Yi>Yj，这两个元素被认为是不一致的。
     * 情况5：Xi=Xj，情况6：Yi=Yj，这两个元素既不是一致的也不是不一致的       *
     * 公式 tau-b  http://hi.csdn.net/attachment/201009/17/19961_1284717925V2Xb.gif
     * 某研究喂食量对斑马鱼(zebrafish)存活的影响。在恒温下，投入饲料X (mg)，斑马鱼存活比例Y
     * v1 <- c(0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55)
     * v2 <- c(1, 0.95, 0.95, 0.9, 0.85, 0.7, 0.65, 0.6, 0.55, 0.42)
     * -0.9888265
     * 身高体重排名后，相关性分析
     */
    const { len } = _stat(x, y)

    const [countX, countY] = [count(x), count(y)]

    /*

      */

    let [n1, n2, C, D] = [0, 0, 0, 0]
    for (let i = 0; i < len; i++) {
      for (let k = 0; k < len; k++) {
        if (i === k) {
          continue
        }
        if ((x[i] > x[k] && y[i] > y[k]) || (x[i] < x[k] && y[i] < y[k])) {
          C++
        }
        if ((x[i] > x[k] && y[i] < y[k]) || (x[i] < x[k] && y[i] > y[k])) {
          D++
        }
      }
    }
    for (const i in countX) {
      const nCount = countX[i]
      if (nCount > 1) {
        n1 += (nCount * (nCount - 1)) / 2
      }
    }
    for (const i in countY) {
      const nCount = countY[i]
      if (nCount > 1) {
        n2 += (nCount * (nCount - 1)) / 2
      }
    }

    const n3 = (len * (len - 1)) / 2
    const numerator = (C - D) / 2
    const denominator = Math.sqrt((n3 - n1) * (n3 - n2))
    return numerator / denominator
  }
})
