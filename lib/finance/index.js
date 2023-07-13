const math = require('../math')

/**
 * Beta系数
 * @param {Array} a1
 * @param {Array} a2
 * @returns
 */
function betaRate (a1, a2) {
  return math.covariance(a1, a2) / math.variance(a2)
}
/**
 * 夏普比率
 * @param {Array} a1
 * @param {Number} offeredRate 拆借利率
 * @param {Number} tadeDay 有效交易日
 * @returns
 */
function sharpeRate (a1, offeredRate = 0.04, tadeDay = 252) {
  const a1Adjust = math.mean(a1.map(x => x - offeredRate / tadeDay))
  return (a1Adjust * Math.sqrt(tadeDay)) / math.stddev(a1)
}

/**
 * 对数收益率
 * @param {Array} a
 * @returns
 */
function logReturn (a) {
  let r = []
  a.map((x, idx) => {
    if (a[idx + 1]) {
      // b.push((a[idx + 1] - a[idx]) / a[idx])
      r.push(Math.log(a[idx + 1] / a[idx]))
    }
  })
  return r
}
/*
    一组时序数据,清理需求如下
    1.前后都有,取平均值
    2.前有后无,取前
    3.后有前无,取后
    4.使用reduce
  */
/**
 *
 * @param {Array} a
 * @returns
 */
function tsClean (a) {
  return a.reduce((x, y, idx, ori) => {
    x.push(y ? y : ((x.at(-1) || ori[idx + 1] || 0) + (ori[idx + 1] || x.at(-1) || 0)) / 2)
    return x
  }, [])
}

const fi = {
  logReturn,
  betaRate,
  sharpeRate,
  tsClean
}

module.exports = { fi }
