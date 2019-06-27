'use strict'
// 数组原型扩展
/**
 * @namespace Array_prototype
 */
const flatten = arr =>
  arr.reduce((a, v) => a.concat(Array.isArray(v) ? flatten(v) : v), [])

module.exports = {
  copy () {
    /**
     * @memberof Array_prototype#
     * @description 一般深度复制数组
     * @function copy
     * @return {Object}
     * @example
     * let a = [1,2,3]
     * let b = a.copy()
     */
    return JSON.parse(JSON.stringify(this))
  },

  count () {
    /**
     * @memberof Array_prototype#
     * @description 统计每个value的个数
     * @function count
     * @return {Array}
     * @example
     * ['A', 'B', 'B', 'C', 'A', 'D'].count()
     * // {"A":2,"B":2,"C":1,"D":1}
     */
    return this.reduce(function (o, item) {
      o[item] = o[item] ? ++o[item] : 1
      return o
    }, {})
  },
  flatten () {
    /**
     * @memberof Array_prototype#
     * @description 展开嵌套数组到一层
     * @function flatten
     * @return {Array}
     * @example
     * [1, [2, [3, [4, 5], 6], 7], 8].flatten().join('')
     * // '12345678'
     */
    return flatten(this)
  },
  groupBy (groupCol, aggregateCol = [], aggregateOpt = []) {
    let groupObj = {}
    let groupAry = []
    for (let i = 0; i < this.length; i++) {
      let groupKey = ''
      let groupKeyAry = []
      let aItem = this[i]
      for (let col = 0; col < groupCol.length; col++) {
        groupKeyAry.push(aItem[groupCol[col]] || '<Null>')
      }
      groupKey = groupKeyAry.join(',')
      let keyObj = groupObj[groupKey]
      if (keyObj) {
        let idx = 0
        aggregateCol.forEach(item => {
          let opt = aggregateOpt[idx] || 'count'
          switch (opt) {
            case 'count':
              keyObj[`count(${item})`]++
              break
            case 'sum':
              keyObj[`sum(${item})`] += aItem[item]
              break
            case 'avg':
              keyObj[`avg(${item})`] =
                (keyObj[`avg(${item})`] + aItem[item]) / 2
              break
            case 'max':
              keyObj[`max(${item})`] =
                keyObj[`max(${item})`] < aItem[item]
                  ? aItem[item]
                  : keyObj[`max(${item})`]
              break
            case 'min':
              keyObj[`min(${item})`] =
                keyObj[`min(${item})`] > aItem[item]
                  ? aItem[item]
                  : keyObj[`min(${item})`]
              break
            default:
          }
          idx++
        })
      } else {
        groupObj[groupKey] = {}
        keyObj = groupObj[groupKey]
        let idx = 0
        aggregateCol.forEach(item => {
          let opt = aggregateOpt[idx] || 'count'
          switch (opt) {
            case 'count':
              keyObj[`count(${item})`] = 1
              break
            case 'sum':
              keyObj[`sum(${item})`] = aItem[item]
              break
            case 'avg':
              keyObj[`avg(${item})`] = aItem[item]
              break
            case 'max':
              keyObj[`max(${item})`] = aItem[item]
              break
            case 'min':
              keyObj[`min(${item})`] = aItem[item]
              break
            default:
          }
          idx++
        })
      }
    }
    for (let i in groupObj) {
      let groupColKey = i.split(',')
      let o = {}
      for (let d = 0; d < groupColKey.length; d++) {
        o[groupCol[d]] = groupColKey[d]
      }
      for (let k in groupObj[i]) {
        o[k] = groupObj[i][k]
      }
      groupAry.push(o)
    }
    return groupAry
  },
  orderBy (props, orders = ['asc']) {
    return [...this].sort((a, b) =>
      props.reduce((acc, prop, i) => {
        if (acc === 0) {
          const [p1, p2] =
            orders && orders[i] === 'desc'
              ? [b[prop], a[prop]]
              : [a[prop], b[prop]]
          acc = p1 > p2 ? 1 : p1 < p2 ? -1 : 0
        }
        return acc
      }, 0)
    )
  },
  equals (a) {
    if (!a) {
      return false
    }
    if (this.length !== a.length) {
      return false
    }
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] instanceof Array && a[i] instanceof Array) {
        if (!this[i].equals(a[i])) {
          return false
        }
      } else if (this[i] !== a[i] && (!isNaN(this[i]) && !isNaN(a[i]))) {
        // NOTICE: {x:1} != {x:1} =>true  NaN!==NaN =>true
        return false
      }
    }
    return true
  },
  unique () {
    /**
     * @memberof Array_prototype#
     * @description 数组去重
     * @function unique
     * @return {Array}
     * @example
     * [undefined, null, 1, 1, '1', '1', null, undefined, NaN, NaN].unique()
     * // [ undefined, null, 1, '1', NaN ]
     */
    return Array.from(new Set(this))
  },
  intersect (a = []) {
    /**
     * @memberof Array_prototype#
     * @description 交集
     * @function intersect
     * @param {Array} a 另一数组
     * @return {Array}
     * @example
     * [1, 2, 3].intersect([3, 4, 5])
     * // [3]
     */
    return this.filter(v => a.includes(v)).unique()
  },
  union (a = []) {
    /**
     * @memberof Array_prototype#
     * @description 并集
     * @function union
     * @param {Array} a 另一数组
     * @return {Array}
     * @example
     * [1, 2, 3].union([3, 4, 5])
     * // [1, 2, 3, 4, 5]
     */
    return this.concat(a).unique()
  },
  except (a = []) {
    /**
     * @memberof Array_prototype#
     * @description AB差集 属于A不属于B BA差集 反之
     * @function except
     * @param {Array} a 另一数组
     * @return {Array}
     * @example
     * [1, 2, 3, 4].except([2, 3, 5])
     * // [1, 4]
     */
    let aInter = this.filter(v => a.includes(v))
    return this.filter(v => !aInter.includes(v)).unique()
  },
  subset (a = []) {
    /**
     * @memberof Array_prototype#
     * @description 数组是否为另一数组的子集
     * @function subset
     * @param {Array} a 另一数组
     * @return {Boolean}
     * @example
     * [undefined, null, NaN, undefined, undefined].subset([undefined, null, 1, 1, '1', '1', null, undefined, NaN, NaN])
     * // true
     */
    // 是否为子集
    return !this.some(v => !a.includes(v))
  },
  mean () {
    /**
     * @memberof Array_prototype#
     * @description 从数组值求平均数
     * @function mean
     * @return {integer}
     * @example
     * [1, 2, 3, 4, 5].mean()
     * // 3
     */
    let me = this
    let len = me.length
    return (
      me.reduce(function (x, y) {
        return x + y
      }) / len
    )
  },
  median () {
    /**
     * @memberof Array_prototype#
     * @description 从数组值求中位数
     * @function median
     * @return {integer}
     * @example
     * [1, 2, 3, 4, 5].median()
     * // 3
     */
    let me = this.sort()
    let len = me.length
    if (len === 0) {
      return 0
    }
    return len % 2 === 0 ? (me[len / 2] + me[len / 2 - 1]) / 2 : me[~~(len / 2)]
  },
  shuffle () {
    /**
     * @memberof Array_prototype#
     * @description 随机打乱数组的值
     * @function shuffle
     * @return {Array}
     * @example
     * [1, 2, 3, 4, 5].shuffle()
     * // [随机]
     */
    return this.sort(() => Math.random() - 0.5)
  },
  remove (idx = 0, len = 1) {
    /**
     * @memberof Array_prototype#
     * @description 删除数组某一下标起的n个值
     * @function remove
     * @param {integer} idx 下标
     * @param {integer} len 个数
     * @return {Array}
     * @example
     * [1, 2, 3, 4, 5].remove()[0]
     * // 2
     */
    this.splice(idx, len)
    return this
  }
}
