'use strict'
// 日期原型扩展
/**
 * @namespace Date_prototype
 */
function getFirstWeekBegDay (year) {
  var tempdate = new Date(year, 0, 1)
  var temp = tempdate.getDay()
  if (temp === 1) {
    return tempdate
  }
  temp = temp === 0 ? 7 : temp
  tempdate = tempdate.setDate(tempdate.getDate() + (8 - temp))
  return new Date(tempdate)
}

function getWeekIndex (dateobj) {
  var firstDay = getFirstWeekBegDay(dateobj.getFullYear())
  if (dateobj < firstDay) {
    firstDay = getFirstWeekBegDay(dateobj.getFullYear() - 1)
  }
  var d = Math.floor((dateobj.valueOf() - firstDay.valueOf()) / 86400000)
  return Math.floor(d / 7) + 1
}

/**
 * @function [format&date2Str]
 * @description 格式化日期
 * @memberof Date_prototype#
 * @param {string} s - 日期模板 yyyy/YYYY mm/MM ww/WW dd/DD hh/HH mm ss SS(毫秒) q(季度) X(unix秒).
 * @return {string} 返回 日期模板的结果.
 * @example
 * $.now().format('yyyy-MM-dd hh:mm:ss')
 * // 2019-6-1 10:19:01
 */
let format = function (s = 'yyyy-MM-dd hh:mm:ss') {
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'w+': getWeekIndex(this), // 周
    'W+': getWeekIndex(this), // 周
    'd+': this.getDate(), // 日
    'D+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'H+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S': this.getMilliseconds(), // 毫秒
    'X': ((+this) / 1000) | 0 // unix秒
  }
  if (/([yY]+)/.test(s)) {
    s = s.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(s)) {
      s = s.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return s
}

/**
 * @function [dateAdd&offset]
 * @description 日期偏移操作.
 * @memberof Date_prototype#
 * @param {string} interval - 年月日时分秒周季 yMdhnswq.
 * @param {int} number - 时间间隔 可正负.
 * @return {string} 返回 得到日期年月日等加数字后的日期.
 * @example
 * $.now().offset('y',-1)
 * // 2018-6-1 10:19:01
 */
let dateOffset = function (interval, number) {
  let d = this
  let k = {
    'y': 'FullYear',
    'q': 'Month',
    'M': 'Month',
    'w': 'Date',
    'd': 'Date',
    'h': 'Hours',
    'm': 'Minutes',
    's': 'Seconds',
    'ms': 'MilliSeconds'
  }
  let n = {
    'q': 3,
    'w': 7
  }
  d['set' + k[interval]](d['get' + k[interval]]() + (n[interval] || 1) * number)
  return d
}

module.exports = {
  format (s) {
    return format.call(this, s)
  },
  getWeek () {
    return getWeekIndex(this)
  },
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
  dateAdd (i, n) {
    return dateOffset.call(this, i, n)
  },
  offset (i, n) {
    return dateOffset.call(this, i, n)
  }
}
