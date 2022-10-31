'use strict'
// @ts-check
// 数组原型扩展
/**
 * @namespace Array_prototype
 */

const $M = require('./math.js')
const flatten = arr => arr.reduce((a, v) => a.concat(Array.isArray(v) ? flatten(v) : v), [])

const publishObj = {
  allCheck (fn = Boolean) {
    /**
     * @memberof Array_prototype#
     * @description 用函数判断每个数组值,默认判断真值
     * @function allCheck
     * @return {Any}
     * @example
     * let a = [1,2,3]
     * console.log(a.allCheck())
     * // true
     */

    return this.every(fn)
  },
  indexOfAll (val) {
    /**
     * @memberof Array_prototype#
     * @description 找到所有的值得下标
     * @function indexOfAll
     * @return {Any}
     * @example
     * let a = [1,2,3,1]
     * console.log(a.indexOfAll(1))
     * // [0,3]
     */

    return this.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), [])
  },
  pick () {
    /**
     * @memberof Array_prototype#
     * @description 数组中随机抽取1个值
     * @function pick
     * @return {Any}
     * @example
     * let a = [1,2,3]
     * console.log(a.pick())
     * // 1
     */

    const n = $M.uniformRandInt(0, this.length - 1)
    return this[n]
  },
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
    return $M.count(this)
  },
  countAdv () {
    return $M.countAdv(this)
  },
  mode () {
    return $M.mode(this)
  },
  countBy (fn) {
    /**
     * @memberof Array_prototype#
     * @description 根据函数计数
     * @function countBy
     * @return {Object}
     * @example
     * countBy([5.2, 4.2, 5.3], Math.floor); // {4: 1, 5: 2}
     */

    return this.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1
      return acc
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
  findMaxMin () {
    return $M.findMaxMin(this)
  },
  /**
   *
   * @param {Array} groupCol 显示的列
   * @param {Array} aggregateCol 聚合列
   * @param {Array} aggregateOpt 聚合列的操作
   * @param {Array} aggregateColAlias 聚合列别名
   * @param {Array} colFunc 列聚合前操作函数
   * @returns {Array}
   */
  groupBy (groupCol, aggregateCol = [], aggregateOpt = [], aggregateColAlias = [], colFunc = []) {
    const groupObj = {}
    const groupAry = []
    for (let i = 0; i < this.length; i++) {
      let groupKey = ''
      const groupKeyAry = []
      const aItem = this[i]
      for (let col = 0; col < groupCol.length; col++) {
        groupKeyAry.push((typeof colFunc[col] === 'function' ? colFunc[col](aItem, aItem[groupCol[col]]) : aItem[groupCol[col]]) ?? '<Null>')
      }
      groupKey = groupKeyAry.join(',')
      let keyObj = groupObj[groupKey]
      if (keyObj) {
        let idx = 0
        aggregateCol.forEach(item => {
          const opt = aggregateOpt[idx] || 'count'
          switch (opt) {
            case 'count':
              keyObj[aggregateColAlias[idx] ?? `count(${item})`]++
              break
            case 'sum':
              keyObj[aggregateColAlias[idx] ?? `sum(${item})`] += aItem[item]
              break
            case 'avg':
              keyObj[`_avgCount(${item})`]++
              keyObj[aggregateColAlias[idx] ?? `avg(${item})`] = (keyObj[aggregateColAlias[idx] ?? `avg(${item})`] * (keyObj[`_avgCount(${item})`] - 1) + aItem[item]) / keyObj[`_avgCount(${item})`]
              break
            case 'max':
              keyObj[aggregateColAlias[idx] ?? `max(${item})`] = keyObj[aggregateColAlias[idx] ?? `max(${item})`] < aItem[item] ? aItem[item] : keyObj[aggregateColAlias[idx] ?? `max(${item})`]
              break
            case 'min':
              keyObj[aggregateColAlias[idx] ?? `min(${item})`] = keyObj[aggregateColAlias[idx] ?? `min(${item})`] > aItem[item] ? aItem[item] : keyObj[aggregateColAlias[idx] ?? `min(${item})`]
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
          const opt = aggregateOpt[idx] || 'count'
          switch (opt) {
            case 'count':
              keyObj[aggregateColAlias[idx] ?? `count(${item})`] = 1
              break
            case 'sum':
              keyObj[aggregateColAlias[idx] ?? `sum(${item})`] = aItem[item]
              break
            case 'avg':
              keyObj[`_avgCount(${item})`] = 1
              keyObj[aggregateColAlias[idx] ?? `avg(${item})`] = aItem[item]
              break
            case 'max':
              keyObj[aggregateColAlias[idx] ?? `max(${item})`] = aItem[item]
              break
            case 'min':
              keyObj[aggregateColAlias[idx] ?? `min(${item})`] = aItem[item]
              break
            default:
          }
          idx++
        })
      }
    }
    for (const i in groupObj) {
      const groupColKey = i.split(',')
      const o = {}
      for (let d = 0; d < groupColKey.length; d++) {
        if (groupCol[d]) {
          o[groupCol[d]] = groupColKey[d]
        }
      }
      for (const k in groupObj[i]) {
        if (!k.includes('_avgCount')) {
          o[k] = groupObj[i][k]
        }
      }
      groupAry.push(o)
    }
    return groupAry
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
    if (!a) {
      return false
    }
    if (this.length !== a.length) {
      return false
    }
    for (let i = 0, l = this.length; i < l; i++) {
      if (this[i] instanceof Array && a[i] instanceof Array) {
        if (!this[i].equals(a[i])) {
          return false
        }
      } else if (this[i] !== a[i] && !isNaN(this[i]) && !isNaN(a[i])) {
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

    const aInter = this.filter(v => a.includes(v))
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
  max: function () {
    return $M.max(this)
  },
  min: function () {
    return $M.min(this)
  },
  sum: function () {
    return $M.sum(this)
  },
  mean: function () {
    return $M.mean(this)
  },
  median: function () {
    return $M.median(this)
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
  fisherYates () {
    let i = this.length
    while (i) {
      const j = Math.floor(Math.random() * i--)
      ;[this[i], this[j]] = [this[j], this[i]]
    }
    return this
  },
  chunk (perGroupLen) {
    let idx = 0
    const a = []
    while (idx < this.length) {
      a.push(this.slice(idx, (idx += perGroupLen)))
    }
    return a
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
module.exports = publishObj
