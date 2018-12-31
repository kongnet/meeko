'use strict'
// 数组原型扩展
const flatten = (arr) => arr.reduce((a, v) => a.concat(Array.isArray(v) ? flatten(v) : v), [])

module.exports = {
  copy () {
    return JSON.parse(JSON.stringify(this))
  },
  count () {
    return this.reduce(function (o, item) {
      o[item] = o[item] ? ++o[item] : 1
      return o
    }, {})
  },
  flatten () {
    return flatten(this)
  },
  orderBy (props, orders = ['asc']) {
    return [...this].sort((a, b) =>
      props.reduce((acc, prop, i) => {
        if (acc === 0) {
          const [p1, p2] = orders && orders[i] === 'desc' ? [b[prop], a[prop]] : [a[prop], b[prop]]
          acc = p1 > p2 ? 1 : p1 < p2 ? -1 : 0
        }
        return acc
      }, 0)
    )
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
