'use strict'
// 数组原型扩展
module.exports = {
  max (a) {
    return Math.max.apply(Math, a)
  },
  min (a) {
    return Math.min.apply(Math, a)
  },
  num2e (num, fixNum) {
    let p = Math.floor(Math.log(num) / Math.LN10)
    let n = num * Math.pow(10, -p)
    return n.toFixed(fixNum || 4) + 'e' + p
  },
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
  linearFitting (x, y) { // 线性拟合 y=a*x+b
    let [len, xmean, ymean, sumx, sumy, sumxy] = [
      x.length, x.mean(), y.mean(), 0, 0, 0]
    for (let i = 0; i < len; i++) {
      sumx += (x[i] - xmean) * (x[i] - xmean)
      sumy += (y[i] - ymean) * (y[i] - ymean)
      sumxy += (y[i] - ymean) * (x[i] - xmean)
    }
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
  exponentFitting (x, y) { // 指数拟合 y=a*e^(b*x)
    let rst = this.linearFitting(x, y.map(item => Math.log(item)))
    let [a, b, r] = [Math.pow(Math.E, rst.b), rst.a, rst.r]
    return {
      a,
      b,
      r,
      f: `y=${a.toFixed(4)}*e^(${b.toFixed(4)}*x) R^2=${r.toFixed(4)}`
    }
  },
  lnFitting (x, y) { // 对数拟合 y=a*ln(x)+b
    let rst = this.linearFitting(x.map(item => Math.log(item)), y)
    let [a, b, r] = [rst.a, rst.b, rst.r]
    return {
      a,
      b,
      r,
      f: `y=${a.toFixed(4)}*ln(x)+${b.toFixed(4)} R^2=${r.toFixed(4)}`
    }
  },
  powerFitting (x, y) { // 幂函数拟合 y=a*x^b
    let rst = this.linearFitting(x.map(item => Math.log(item)), y.map(item => Math.log(item)))
    let [a, b, r] = [Math.pow(Math.E, rst.b), rst.a, rst.r]
    return {
      a,
      b,
      r,
      f: `y=${a.toFixed(4)}*x^${b.toFixed(4)} R^2=${r.toFixed(4)}`
    }
  },
  pearson (x, y) {
  /*
  0.8-1.0 极强相关
  0.6-0.8 强相关
  0.4-0.6 中等程度相关
  0.2-0.4 弱相关
  0.0-0.2 极弱相关或无相关
  */
    let [len, xmean, ymean, sumx, sumy, sumxy] = [
      x.length, x.mean(), y.mean(), 0, 0, 0]
    for (let i = 0; i < len; i++) {
      sumx += (x[i] - xmean) * (x[i] - xmean)
      sumy += (y[i] - ymean) * (y[i] - ymean)
      sumxy += (y[i] - ymean) * (x[i] - xmean)
    }
    let p = sumxy / Math.sqrt(sumx * sumy)
    return p
  }

}
