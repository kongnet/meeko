'use strict'
// @ts-check

/**
 * @namespace MathRand
 */

let secRand
let crypto
const uniformRandInt = (a, b) => {
  /**
    * @memberof MathRand#
    * @description 返回相对均匀的[a,b]之间的整数
    * @function uniformRandInt
    * @param {Number} a - 范围最小值
    * @param {Number} b - 范围最大值
    * @return {Number}
    * $.tools.rnd(-100, -100)
    // -100
    */

  let num
  if (a > b) {
    ;[a, b] = [b, a]
  }
  const maxEx = b + 5
  do {
    num = Math.floor(Math.random() * (maxEx - a) + a)
    num -= 4
  } while (num < a || num > b)
  return num
  // return Math.round(Math.random() * (b - a)) + a // NOTICE: 传统方式会造成2端的值不平均
}
const randInt = uniformRandInt
try {
  crypto = require('crypto')
} catch (err) {
  console.log('crypto support is disabled!')
}
if (crypto !== undefined) {
  /*
 （1）首先找到样本数据Y的最小值Min及最大值Max
 （2）计算系数为：k=(b-a)/(Max-Min)
 （3）得到归一化到[a,b)区间的数据：norY=a+k(Y-Min)
  */
  secRand = (a, b) => {
    const r = crypto.randomBytes(4) // 0-4294967295
    return Math.floor(((b - a + 1) / 4294967295) * r.readUInt32LE(0)) + a
  }
} else {
  secRand = uniformRandInt
}

const E = Math.E
const PI = Math.PI
const PI_2 = PI / 2
const uniformBase = (a, b) => {
  /**
    * @memberof MathRand#
    * @description 返回[a,b)之间的数
    * @function uniformBase
    * @param {Number} a - 范围最小值
    * @param {Number} b - 范围最大值
    * @return {Number}
    * uniformBase(-1.1, 1.1)
    // -1.01

    function random(lower, upper) { // [a,b)
        return Math.floor(Math.random() * (upper - lower)) + lower
    }
    function random(lower, upper) { // [a,b]
        return Math.floor(Math.random() * (upper - lower + 1)) + lower
    }
    */

  return a + (b - a) * Math.random()
}

const normal = (mu = 0, sigma = 1) => {
  /**
    * @memberof MathRand#
    * @description 返回 默认参数下 [-无穷大，+无穷大] 在-1.96～+1.96范围内曲线下的面积等于0.9500，在-2.58～+2.58范围内曲线下面积为0.9900
    * @function normal
    * @param {Number} mu
    * @param {Number} sigma
    * @return {Number}
    * normal()
    // -100
    */

  let p, p1, p2
  do {
    p1 = uniformBase(-1, 1)
    p2 = uniformBase(-1, 1)
    p = p1 * p1 + p2 * p2
  } while (p >= 1)

  return mu + sigma * p1 * Math.sqrt((-2 * Math.log(p)) / p)
}
const arcsine = function (a, b) {
  const q = Math.sin(PI_2 * uniformBase(0, 1))
  return a + (b - a) * q * q
}
const exponential = function (a, b) {
  return a - b * Math.log(uniformBase(0, 1))
}
const gamma = function (a, b, c) {
  const A = 1 / Math.sqrt(2 * c - 1)
  const B = c - Math.log(4)
  const Q = c + 1 / A
  const T = 4.5
  const D = 1 + Math.log(T)
  const C = 1 + c / E

  if (c < 1) {
    while (true) {
      const p = C * uniformBase(0, 1)
      if (p > 1) {
        const y = -Math.log((C - p) / c)
        if (uniformBase(0, 1) <= Math.pow(y, c - 1)) {
          return a + b * y
        }
      } else {
        const y = Math.pow(p, 1 / c)
        if (uniformBase(0, 1) <= Math.exp(-y)) {
          return a + b * y
        }
      }
    }
  } else if (parseInt(c, 10) === 1) {
    return exponential(a, b)
  } else {
    while (true) {
      const p1 = uniformBase(0, 1)
      const p2 = uniformBase(0, 1)
      const v = A * Math.log(p1 / (1 - p1))
      const y = c * Math.exp(v)
      const z = p1 * p1 * p2
      const w = B + Q * v - y
      if (w + D - T * z > 0 || w >= Math.log(z)) {
        return a + b * y
      }
    }
  }
}
const beta = function (v, w, min, max) {
  if (v < w) {
    return max - (max - min) * beta(w, v, 0, 1)
  }
  const y1 = gamma(0, 1, v)
  const y2 = gamma(0, 1, w)

  return min + ((max - min) * y1) / (y1 + y2)
}
const cauchy = function (a, b) {
  return a + b * Math.tan(PI * uniformBase(-0.5, 0.5))
}
const bernoulli = function (p) {
  return uniformBase(0, 1) < p ? 1 : 0
}
const userSpecified = function (usf, xMin, xMax, yMin, yMax) {
  let x
  let y
  const areaMax = (xMax - xMin) * (yMax - yMin)

  do {
    x = uniformBase(0, areaMax) / (yMax - yMin) + xMin
    y = uniformBase(yMin, yMax)
  } while (y > usf(x, xMin, xMax))
  return x
}
const chiSquare = function (df) {
  return gamma(0, 2, 0.5 * df)
}
const cosine = function (min, max) {
  const a = 0.5 * (min + max)

  const b = (max - min) / PI
  return a + b * Math.asin(uniformBase(-1, 1))
}
const doubleLog = function (min, max) {
  const a = 0.5 * (min + max)

  let b = 0.5 * (max - min)
  if (bernoulli(0.5) === 0) {
    b = -b
  }
  return a + b * uniformBase(0, 1) * uniformBase(0, 1)
}
const erlang = function (b, c) {
  let prod = 1.0
  let i
  for (i = 1; i < c; i++) {
    prod *= uniformBase(0, 1)
  }
  return -b * Math.log(prod)
}
const extremeValue = function (a, b) {
  return a + b * Math.log(-Math.log(uniformBase(0, 1)))
}
const fRatio = function (v, w) {
  return chiSquare(v) / v / (chiSquare(w) / w)
}
const laplace = function (a, b) {
  if (bernoulli(0.5) === 1) {
    return a + b * Math.log(uniformBase(0, 1))
  } else {
    return a - b * Math.log(uniformBase(0, 1))
  }
}
const logarithmic = function (min, max) {
  const a = min
  const b = max - min

  return a + b * uniformBase(0, 1) * uniformBase(0, 1)
}
const logistic = function (a, b) {
  return a - b * Math.log(1 / uniformBase(0, 1) - 1)
}
const lognormal = function (a, mu, sigma) {
  return a + Math.exp(normal(mu, sigma))
}
const parabolic = function (min, max) {
  const parabola = function (x, min, max) {
    if (x < min || x > max) {
      return 0.0
    }
    const a = 0.5 * (min + max)
    const b = 0.5 * (max - min)
    const yMax = 3 / (4 * b)
    return yMax * (1 - ((x - a) * (x - a)) / (b * b))
  }

  const a = 0.5 * (min + max)
  const yMax = parabola(a, min + max)

  return userSpecified(parabola, min, max, 0, yMax)
}
const pareto = function (c) {
  return Math.pow(uniformBase(0, 1), -1 / c)
}
const pearson5 = function (b, c) {
  return 1 / gamma(0, 1 / b, c)
}
const pearson6 = function (b, v, w) {
  return gamma(0, b, v) / gamma(0, b, w)
}
const power = function (c) {
  return Math.pow(uniformBase(0, 1), 1 / c)
}
const rayleigh = function (a, b) {
  return a + b * Math.sqrt(-Math.log(uniformBase(0, 1)))
}
const studentT = function (df) {
  return normal(0, 1) / Math.sqrt(chiSquare(df) / df)
}
const triangular = function (min, max, c) {
  const p = uniformBase(0, 1)
  const q = 1 - p
  if (p <= (c - min) / (max - min)) {
    return min + Math.sqrt((max - min) * (c - min) * p)
  } else {
    return max - Math.sqrt((max - min) * (max - c) * q)
  }
}
const weibull = function (a, b, c) {
  return a + b * Math.pow(-Math.log(uniformBase(0, 1)), 1 / c)
}
const binomial = function (n, p) {
  let sum = 0
  for (let i = 0; i < n; i++) {
    sum += bernoulli(p)
  }
  return sum
}
const geometric = function (p) {
  return Math.floor(Math.log(uniformBase(0, 1)) / Math.log(1 - p))
}
const hypergeometric = function (n, N, K) {
  let count = 0
  for (let i = 0; i < n; i++, N--) {
    const p = K / N
    if (bernoulli(p)) {
      count++
      K--
    }
  }

  return count
}
const negativeBinomial = function (s, p) {
  let sum = 0
  for (let i = 0; i < s; i++) {
    sum += geometric(p)
  }

  return sum
}
const pascal = function (s, p) {
  return negativeBinomial(s, p) + s
}
const poisson = function (mu) {
  let b = 1
  let i
  for (i = 0; b >= Math.exp(-mu); i++) {
    b *= uniformBase(0, 1)
  }

  return i - 1
}
const uniformDiscrete = function (i, j) {
  return i + Math.floor((j - i + 1) * uniformBase(0, 1))
}
module.exports = {
  uniformBase, // [0,1) 分布
  uniformRandInt, // [a,b]整数均匀分布
  randInt,
  secRand, // 安全伪随机发生器
  normal, // 正态分布 https://reference.wolfram.com/language/ref/NormalDistribution.html
  arcsine, // 反正弦分布 https://reference.wolfram.com/language/ref/ArcSinDistribution.html
  beta, // https://reference.wolfram.com/language/ref/BetaDistribution.html
  gamma, // 一些设备的寿命服从此分布 https://reference.wolfram.com/language/ref/GammaDistribution.html
  cauchy, // 柯西分布 https://reference.wolfram.com/language/ref/CauchyDistribution.html
  bernoulli, // 伯努利分布 https://reference.wolfram.com/language/ref/BernoulliDistribution.html
  exponential,
  userSpecified,
  chiSquare,
  cosine,
  doubleLog,
  erlang,
  extremeValue,
  fRatio,
  laplace,
  logarithmic,
  logistic,
  lognormal,
  parabolic,
  pareto,
  pearson5,
  pearson6,
  power,
  rayleigh,
  studentT,
  triangular,
  weibull,
  binomial,
  geometric,
  hypergeometric,
  negativeBinomial,
  pascal,
  poisson,
  uniformDiscrete
}
