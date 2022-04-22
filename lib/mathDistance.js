'use strict'
// @ts-check
/**
 * @namespace mathDistance
 */

/**
 * @function euclidean
 * @memberof mathDistance
 * @description Euclidean Distance(欧式距离)
 * @param {Array} x
 * @param {Array} y
 * @returns {Number}
 */
function euclidean (x, y) {
  const len = x.length
  if (len !== y.length) {
    throw Error('元素长度不一致')
  }
  let sum = 0
  for (let i = 0; i < len; i++) {
    sum += (x[i] - y[i]) ** 2
  }
  return Math.sqrt(sum)
}
// Standardized Euclidean Distance(标准化欧氏距离)
function euclideans (x, y) {
  const len = x.length
  if (len !== y.length) {
    throw Error('元素长度不一致')
  }
  let sum = 0
  for (let i = 0; i < len; i++) {
    const avg = (x[i] - y[i]) / 2
    const si = Math.sqrt((x[i] - avg) ** 2 + (y[i] - avg) ** 2)
    sum += ((x[i] - y[i]) / si) ** 2
  }
  return Math.sqrt(sum)
}
// ManhattanDistance(曼哈顿距离)
function manhattan (x, y) {
  const len = x.length
  if (len !== y.length) {
    throw Error('元素长度不一致')
  }
  let sum = 0
  for (let i = 0; i < len; i++) {
    sum += Math.abs(x[i] - y[i])
  }
  return sum
}
// lanceDistance(兰氏距离)
function lance (x, y) {
  const len = x.length
  if (len !== y.length) {
    throw Error('元素长度不一致')
  }
  let sum = 0
  for (let i = 0; i < len; i++) {
    sum += i === 0 ? 0 : Math.abs(x[i] - y[i]) / Math.abs(x[i] + Math.abs(y[i]))
  }
  return sum
}
// Chebyshev Distance(切比雪夫距离)
function chebyshevn (x, y) {
  const len = x.length
  if (len !== y.length) {
    throw Error('元素长度不一致')
  }

  let dis = 0
  for (let i = 0; i < len; i++) {
    if (Math.abs(x[i] - y[i]) > dis) {
      dis = Math.abs(x[i] - y[i])
    }
  }
  return dis
}

/**
 * @description Edit Distance 编辑距离
 * @param {Array} a
 * @param {Array} b
 * @return {Object} {ld编辑距离,matchRate匹配度,matrix动态转义矩阵}
 */

function levenshtein (a = [], b = []) {
  a = typeof a === 'string' ? a.split('') : a
  b = typeof b === 'string' ? b.split('') : b
  const [aLen, bLen] = [a.length, b.length]
  if (aLen === 0) {
    return { ld: bLen, matchRate: 0, matrix: [] }
  }
  if (bLen === 0) {
    return { ld: aLen, matchRate: 0, matrix: [] }
  }
  const dis = Array(aLen + 1)
    .fill(0)
    .map(_ => Array(bLen + 1).fill(0))
  for (let i = 0; i <= aLen; i++) {
    dis[i][0] = i
  }
  for (let j = 0; j <= bLen; j++) {
    dis[0][j] = j
  }
  let cas
  for (let j = 1; j <= bLen; j++) {
    for (let i = 1; i <= aLen; i++) {
      cas = a[i - 1] === b[j - 1] ? 0 : 1
      const re = Math.min(dis[i - 1][j] + 1, dis[i][j - 1] + 1)
      dis[i][j] = Math.min(re, dis[i - 1][j - 1] + cas)
    }
  }

  const ld = dis[aLen][bLen]
  return { ld, matchRate: 1 - ld / Math.max(aLen, bLen), matrix: dis }
}
// HammingDistance 汉明距离
function hamming (x, y) {
  const len = x.length
  let n = 0
  for (let i = 0; i < len; i++) {
    if (x[i] !== y[i]) {
      n += 1
    }
  }

  return n
}
// dice系数
function diceCoefficient (x, y) {
  return (2 * x.intersect(y).length) / (x.length + y.length)
}
// 杰卡德相似系数
function jaccardCoefficient (x, y) {
  return x.intersect(y).length / x.union(y).length
}
// JaccardDistance(杰卡德距离)
function jaccardDistance (x, y) {
  return (x.union(y).length - x.intersect(y).length) / x.union(y).length
}
// Cos(Cosine 余弦相似度)
function cosn (x = [], y = []) {
  let [xy, xSq, ySq, len] = [0, 0, 0, x.length]
  for (let i = 0; i < len; i++) {
    xy += x[i] * y[i]
    xSq += x[i] ** 2
    ySq += y[i] ** 2
  }
  return xy / (Math.sqrt(xSq) * Math.sqrt(ySq))
}

module.exports = {
  euclidean,
  euclideans,
  manhattan,
  chebyshevn,
  hamming,
  diceCoefficient,
  jaccardCoefficient,
  jaccardDistance,
  cosn,
  lance,
  levenshtein,
  edit: levenshtein
}
