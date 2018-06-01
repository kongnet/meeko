'use strict'
// 数组原型扩展
module.exports = {
  copy () {
    return [].concat(this)
  },
  unique () {
    return Array.from(new Set(this))
  },
  mean () {
    let me = this
    let len = me.length
    return me.reduce(function (x, y) {
      return x + y
    }) / len
  },
  median () {
    let me = this
    let len = me.length
    if (len === 0) return 0
    return len % 2 === 0 ? (me[len / 2] + me[len / 2 - 1]) / 2 : me[~~(len / 2)]
  },
  variance () {
    let me = this
    let mean = me.mean()
    let len = me.length
    return me.map(function (item) {
      return (item - mean) * (item - mean)
    }).reduce(function (x, y) {
      return x + y
    }) / len
  },
  stddev () {
    return Math.sqrt(this.variance())
  }
}
