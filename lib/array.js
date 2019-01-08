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
  equals (a) {
    if (!a) { return false }
    if (this.length !== a.length) { return false }
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] instanceof Array && a[i] instanceof Array) {
        if (!this[i].equals(a[i])) { return false }
      } else if (this[i] !== a[i] && (!isNaN(this[i]) && !isNaN(a[i]))) {
        // NOTICE: {x:1} != {x:1} =>true  NaN!==NaN =>true
        return false
      }
    }
    return true
  },
  unique () {
    return Array.from(new Set(this))
  },
  intersect (a = []) { // 交集
    return this.filter(v => a.includes(v)).unique()
  },
  union (a = []) { // 并集
    return this.concat(a).unique()
  },
  except (a = []) { // AB差集 属于A不属于B BA差集 反之
    let aInter = this.filter(v => a.includes(v))
    return this.filter(v => !aInter.includes(v)).unique()
  },
  subset (a = []) { // 是否为子集
    return !this.some(v => !a.includes(v))
  },
  mean () {
    let me = this
    let len = me.length
    return me.reduce(function (x, y) {
      return x + y
    }) / len
  },
  median () {
    let me = this.sort()
    let len = me.length
    if (len === 0) return 0
    return len % 2 === 0 ? (me[len / 2] + me[len / 2 - 1]) / 2 : me[~~(len / 2)]
  },
  shuffle () {
    return this.sort(() => Math.random() - 0.5)
  },
  remove (idx = 0, len = 1) {
    this.splice(idx, len)
    return this
  }
}
