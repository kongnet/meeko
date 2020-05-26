'use strict'

/**
 * @namespace mathDistance
 */
// Euclidean Distance(欧式距离)
function euclidean (x, y) {
  let len = x.length
  if (len !== y.length) {
    throw '元素长度不一致'
  }
  let sum = 0
  for (let i = 0; i < len; i++) {
    sum += (x[i] - y[i]) ** 2
  }
  const dis = Math.sqrt(sum)
  return dis
}
// Standardized Euclidean Distance(标准化欧氏距离)
function euclideans (x, y) {
  let len = x.length
  if (len !== y.length) {
    throw '元素长度不一致'
  }
  let sum = 0
  for (let i = 0; i < len; i++) {
    const avg = (x[i] - y[i]) / 2
    const si = Math.sqrt((x[i] - avg) ** 2 + (y[i] - avg) ** 2)
    sum += ((x[i] - y[i]) / si) ** 2
  }

  const dis = Math.sqrt(sum)
  return dis
}
// ManhattanDistance(曼哈顿距离)
function manhattan (x, y) {
  let len = x.length
  if (len !== y.length) {
    throw '元素长度不一致'
  }
  let sum = 0
  for (let i = 0; i < len; i++) {
    sum += Math.abs(x[i] - y[i])
  }
  const dis = sum
  return dis
}
// Chebyshev Distance(切比雪夫距离)
function chebyshevn (x, y) {
  let len = x.length
  if (len !== y.length) {
    throw '元素长度不一致'
  }
  const a = []
  let dis = 0
  for (let i = 0; i < len; i++) {
    if (Math.abs(x[i] - y[i]) > dis) {
      dis = Math.abs(x[i] - y[i])
    }
  }
  return dis
}
// HammingDistance/Edit Distance(汉明距离/编辑距离)
function hamming (x, y) {
  let len = x.length
  let n = 0
  for (let i = 0; i < len; i++) {
    if (x[i] !== y[i]) {
      n += 1
    }
  }

  return n
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
  jaccardCoefficient,
  jaccardDistance,
  cosn
}
