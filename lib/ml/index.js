/* istanbul ignore file */

const $M = require('../math')

/**
 *
 * @param {Array} y
 * @param {Number} peridNum
 * @param {Number} nextPoint
 */

function peridForecast (y, peridNum = 7, nextPoint = 14) {
  const len = y.length
  const x = $M.genRange(0, len - 1)
  const { a, b } = $M.linearFitting(x, y) // 去除趋势影响
  const anormalIndex = [] // 异常点
  let yModArr = [] // 周期数组
  const quantile = $M.quantileAll(y) // 统计四分位算法
  const forecastArr = y.copy().map((x, idx) => x - a * idx - b)

  forecastArr.forEach((x, idx) => {
    const it = yModArr[idx % peridNum]
    if (it) {
      it.push(x)
    } else {
      yModArr[idx % peridNum] = []
      yModArr[idx % peridNum].push(x)
    }

    if (x < quantile.lower - a * idx - b || x > quantile.upper - a * idx - b) {
      anormalIndex.push(idx)
    }
  })
  yModArr = yModArr.map(x => $M.mean(x))
  for (let i = 0; i < nextPoint; i++) {
    const idx = len + i + 1
    forecastArr.push(yModArr[idx % peridNum])
  }
  return {
    forecast: forecastArr.map((x, idx) => x + a * idx + b),
    oriLen: len,
    nextPoint,
    peridNum,
    anormalIndex,
    yModArr,
    trend: { a, b }
  }
}
module.exports = {
  DecisionTree: require('./DecisionTree'),
  Knn: require('./Knn.js'),
  NaiveBayes: require('./NaiveBayes'),
  Pca: require('./Pca'),
  Svd: require('./Svd'),
  util: require('./util'),
  peridForecast
}
