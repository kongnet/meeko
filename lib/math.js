'use strict'

/**
 * @namespace Math_prototype
 */

const mathRand = require('./mathRand')
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

  return a.reduce((x, y) => x > y ? x : y)
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

  return a.reduce((x, y) => x < y ? x : y)
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
const sum = a => a.reduce((x, y) => x + y)

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
const count = (a = []) => {
  /**
   * @memberof Math_prototype#
   * @description 统计每个value的个数
   * @function count
   * @return {Array}
   * @example
   * ['A', 'B', 'B', 'C', 'A', 'D'].count()
   * // {"A":2,"B":2,"C":1,"D":1}
   */

  return a.reduce(function (o, item) {
    o[item] = o[item] ? ++o[item] : 1
    return o
  }, {})
}
const _stat = function (x, y) {
  let [len, xmean, ymean, sumx, sumy, sumxy] = [
    x.length,
    mean(x),
    mean(y),
    0,
    0,
    0
  ]
  for (let i = 0; i < len; i++) {
    sumx += (x[i] - xmean) * (x[i] - xmean)
    sumy += (y[i] - ymean) * (y[i] - ymean)
    sumxy += (y[i] - ymean) * (x[i] - xmean)
  }
  return { len, xmean, ymean, sumx, sumy, sumxy }
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

  const m = mean(a)
  const len = a.length
  return (
    a.reduce(function (x, y) {
      return x + (y - m) * (y - m)
    }, 0) / len
  )
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

  const m = mean(a)
  const len = a.length - 1
  return (
    a.reduce(function (x, y) {
      return x + (y - m) * (y - m)
    }, 0) / len
  )
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
  const median = a.median(a.sort())
  const len = a.length
  return (
    a.reduce(function (x, y) {
      return x + Math.abs(y - median)
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
  return Math.sqrt(variance(a)) / m
}

const skew = a => {
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
  // skew 偏度 pandas模块 0.7826325504212567
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
  return v1 / v2 * Math.sqrt(len * (len - 1)) / (len - 2)
}

const kurt1 = a => {
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

  const len = a.length
  const m = mean(a)
  const v1 =
    a.reduce(function (x, y) {
      return x + (y - m) * (y - m) * (y - m) * (y - m)
    }, 0) /
    varianceCorrect(a) /
    varianceCorrect(a)

  return (
    v1 / (len - 1) / (len - 2) / (len - 3) * (len + 1) * len -
    3 * (len - 1) * (len - 1) / (len - 2) / (len - 3)
  )
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
  const v2 = 1.959964 * v1 / Math.sqrt(len)
  return [m - v2, m + v2]
}

// 数组原型扩展
module.exports = Object.assign(
  mathRand,
  {
    count,
    sum,
    max,
    min,
    range,
    num2e (num, fixNum) {
      const p = Math.floor(Math.log(num) / Math.LN10)
      const n = num * Math.pow(10, -p)
      return n.toFixed(fixNum || 4) + 'e' + p
    },
    // 调和平均数≤几何平均数≤算术平均数≤平方平均数
    hMean,
    gMean,
    mean,
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
    linearFitting (x = [], y = []) {
    // 线性拟合 y=a*x+b
      const { xmean, ymean, sumx, sumy, sumxy } = _stat(x, y)
      const a = sumxy / sumx
      const b = ymean - a * xmean
      const r = sumxy * sumxy / (sumx * sumy)
      return {
        a, // 斜率 slope
        b, // 截距 intercept
        r, // 拟合度 R^2
        f: `y=${a.toFixed(4)}*x+${b.toFixed(4)} R^2=${r.toFixed(4)}`
      }
    },
    exponentFitting (x = [], y = []) {
    // 指数拟合 y=a*e^(b*x)
      const rst = this.linearFitting(x, y.map(item => Math.log(item)))
      const [a, b, r] = [Math.pow(Math.E, rst.b), rst.a, rst.r]
      return {
        a,
        b,
        r,
        f: `y=${a.toFixed(4)}*e^(${b.toFixed(4)}*x) R^2=${r.toFixed(4)}`
      }
    },
    lnFitting (x = [], y = []) {
    // 对数拟合 y=a*ln(x)+b
      const rst = this.linearFitting(x.map(item => Math.log(item)), y)
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
      const p = sumxy / Math.sqrt(sumx * sumy)
      return p
    },
    spearman (x = [], y = []) {
      /**
       * @memberof Math_prototype#
       * @param {Array} x - 数组
       * @param {Array} y - 数组
       * @description 斯皮尔曼等级相关分析，适用不清楚数据符合什么分布
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
      const { len, sumxy } = _stat(x, y)
      const p = 1 - 6 * sumxy / (len * len * len - len)
      return p
    }
  })

function kendall (x = [], y = []) {
  /**
   * @memberof Math_prototype#
   * @param {Array} x - 数组
   * @param {Array} y - 数组
   * @description wiki上的算法 峰度/峰态系数
   * @function kendall
   * @return {Array}
   * @example
   * $.math.kendall([0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55], [1, 0.95, 0.95, 0.9, 0.85, 0.7, 0.65, 0.6, 0.55, 0.42])
   * 情况1：Xi>Xj且Yi>Yj，情况2：Xi<Xj且Yi<Yj，这两个元素就被认为是一致的。
   * 情况3：Xi>Xj且Yi<Yj，情况4：Xi<Xj且Yi>Yj，这两个元素被认为是不一致的。
   * 情况5：Xi=Xj，情况6：Yi=Yj，这两个元素既不是一致的也不是不一致的
   * 公式 tau-b  某研究喂食量对斑马鱼(zebrafish)存活的影响。在恒温下，投入饲料X (mg)，斑马鱼存活比例Y
   * v1 <- c(0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55)
   * v2 <- c(1, 0.95, 0.95, 0.9, 0.85, 0.7, 0.65, 0.6, 0.55, 0.42)
   */
  const { len } = _stat(x, y)

  const [countX, countY] = [count(x), count(y)]
  /*

  */
  let [n1, n2, C, D] = [0, 0, 0, 0]
  for (let i = 0; i < len; i++) {
    for (let k = 0; k < len; k++) {
      if (i === k) continue
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
      n1 += nCount * (nCount - 1) / 2
    }
  }
  for (const i in countY) {
    const nCount = countY[i]
    if (nCount > 1) {
      n2 += nCount * (nCount - 1) / 2
    }
  }

  const n3 = len * (len - 1) / 2
  const numerator = (C - D) / 2
  const denominator = Math.sqrt((n3 - n1) * (n3 - n2))
  return numerator / denominator
}
