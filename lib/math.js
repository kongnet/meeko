'use strict'
// 数组原型扩展
module.exports = {
  mean (a) {
    return a.mean()
  },
  median (a) {
    return a.median()
  },
  variance (a) {
    return a.variance()
  },
  stddev (a) {
    return a.stddev()
  },
  linearFitting (x, y) {
    let [len, xmean, ymean, sumx, sumy, sumxy] = [
      x.length, x.mean(), y.mean(), 0, 0, 0]
    for (let i = 0; i < len; i++) {
      sumx += (x[i] - xmean) * (x[i] - xmean)
      sumy += (y[i] - ymean) * (y[i] - ymean)
      sumxy += (y[i] - ymean) * (x[i] - xmean)
    }
    let slope = sumxy / sumx
    let intercept = ymean - slope * xmean
    let r = sumxy * sumxy / (sumx * sumy)
    return {
      slope, // 斜率
      intercept, // 截距
      r// 拟合度
    }
  }
}
