'use strict'
// @ts-check
// 日期原型扩展
/**
 * @namespace Date_prototype
 */

const getYearWeek = function (dateObj, isUTC = false) {
  const [a, b, c] = [dateObj[`get${isUTC ? 'UTC' : ''}FullYear`](), dateObj[`get${isUTC ? 'UTC' : ''}Month`]() + 1, dateObj[`get${isUTC ? 'UTC' : ''}Date`]()]

  /* 
    d1是当前日期
    d2是当年第一天
    d是当前日期是今年第多少天
    用d + 当前年的第一天的周差距的和在除以7就是本年第几周
    */

  const d1 = new Date(a, parseInt(b) - 1, c)
  const d2 = new Date(a, 0, 1)
  const d = Math.round((d1.valueOf() - d2.valueOf()) / 86400000)
  return Math.ceil((d + (d2.getDay() + 1 - 1)) / 7)
}

const format = function (s = 'yyyy-MM-dd hh:mm:ss', isUTC = false) {
  const o = {
    'M+': this[`get${isUTC ? 'UTC' : ''}Month`]() + 1, // 月份
    'w+': getYearWeek(this, isUTC), // 周
    'W+': getYearWeek(this, isUTC), // 周
    'd+': this[`get${isUTC ? 'UTC' : ''}Date`](), // 日
    'D+': this[`get${isUTC ? 'UTC' : ''}Date`](), // 日
    'h+': this[`get${isUTC ? 'UTC' : ''}Hours`](), // 小时
    'H+': this[`get${isUTC ? 'UTC' : ''}Hours`](), // 小时
    'm+': this[`get${isUTC ? 'UTC' : ''}Minutes`](), // 分
    's+': this[`get${isUTC ? 'UTC' : ''}Seconds`](), // 秒
    'q+': Math.floor((this[`get${isUTC ? 'UTC' : ''}Month`]() + 3) / 3), // 季度
    S: this[`get${isUTC ? 'UTC' : ''}Milliseconds`](), // 毫秒
    X: (+this / 1000) | 0 // unix秒
  }
  let m1 = s.match(/([yY]+)/)
  if (m1) {
    s = s.replace(m1[0], (this[`get${isUTC ? 'UTC' : ''}FullYear`]() + '').slice(4 - m1[0].length))
  }
  for (const k in o) {
    let m2 = s.match(new RegExp('(' + k + ')'))
    if (m2) {
      s = s.replace(m2[0], m2[0].length === 1 ? o[k] : ('00' + o[k]).slice(('' + o[k]).length))
    }
  }
  return s
}
const dateOffset = function (interval, number) {
  const me = this
  const k = {
    y: 'FullYear',
    q: 'Month',
    M: 'Month',
    w: 'Date',
    d: 'Date',
    h: 'Hours',
    m: 'Minutes',
    s: 'Seconds',
    ms: 'MilliSeconds'
  }
  const n = {
    q: 3,
    w: 7
  }
  me['set' + k[interval]](me['get' + k[interval]]() + (n[interval] || 1) * number)
  return me
}

const isLeap = d => new Date(d.getFullYear(), 1, 29).getDate() === 29

const myDate = {
  /**
   * @function isLeap
   * @description 是否闰年
   * @memberof Date_prototype#
   * @return {Boolean} 返回 true/false
   * @param {Date} d
   */

  isLeap () {
    return isLeap(this)
  },

  /**
   * @function format
   * @type {Function}
   * @description 格式化日期
   * @memberof Date_prototype#
   * @param {string} s - 日期模板 yyyy/YYYY mm/MM ww/WW dd/DD hh/HH mm ss SS(毫秒) q(季度) X(unix秒).
   * @return {string} 返回 日期模板的结果.
   * @example
   * $.now().format('yyyy-MM-dd hh:mm:ss')
   * // 2019-6-1 10:19:01
   */

  format (s) {
    return format.call(this, s)
  },
  formatUTC (s) {
    return format.call(this, s, true)
  },

  /**
   * @function getWeek
   * @description 本年的第几周
   * @memberof Date_prototype#
   * @return {number}
   * @param {Date} d
   */

  getWeek () {
    return getYearWeek(this)
  },

  /**
   * @function getQuarter
   * @description 本年的第几季度
   * @memberof Date_prototype#
   * @return {number}
   * @param {Date} d
   */
  getQuarter () {
    return (Math.log10(2 ** (this.getMonth() + 1)) | 0) + 1
  },
  /**
   * @function date2Str
   * @description 格式化日期
   * @memberof Date_prototype#
   * @param {string} s - 日期模板 yyyy/YYYY mm/MM ww/WW dd/DD hh/HH mm ss SS(毫秒) q(季度) X(unix秒).
   * @return {string} 返回 日期模板的结果.
   * @example
   * $.now().date2Str('yyyy-MM-dd hh:mm:ss')
   * // 2019-6-1 10:19:01
   */

  date2Str () {
    return format.call(this)
  },

  /**
   * @memberof Date_prototype#
   * @function date8
   * @description 日期格式化8位函数.
   * @param {string} s - 分隔符.
   * @return {string} 返回 格式化结果.
   * @example
   * $.now().date8()
   * $.date.date8(new Date())
   * // 20190601
   */

  date8 (s = '') {
    let m = this.getMonth() + 1
    let d = this.getDate()
    m = m <= 9 ? '0' + m : m
    d = d <= 9 ? '0' + d : d
    s = s || ''
    return [this.getFullYear(), m, d].join(s)
  },

  /**
   * @function dateAdd
   * @description 日期偏移操作.
   * @memberof Date_prototype#
   * @param {string} i interval 年月日时分秒周季 yMdhnswq.
   * @param {number} n 时间间隔 可正负.
   * @return {string} 返回 得到日期年月日等加数字后的日期.
   * @example
   * $.now().dateAdd('y',-1)
   * $.date.dateAdd(new Date())
   * // 2018-6-1 10:19:01
   */

  dateAdd (i, n) {
    return dateOffset.call(this, i, n)
  },

  /**
   * @function offset
   * @description 日期偏移操作.
   * @memberof Date_prototype#
   * @param {string} i interval 年月日时分秒周季 yMdhnswq.
   * @param {number} n 时间间隔 可正负.
   * @return {string} 返回 得到日期年月日等加数字后的日期.
   * @example
   * $.now().offset('y',-1)
   * $.date.offset(new Date())
   * // 2018-6-1 10:19:01
   */

  offset (i, n) {
    return dateOffset.call(this, i, n)
  }
}

module.exports = myDate
