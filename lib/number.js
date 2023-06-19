'use strict'
// @ts-check
/**
 * @namespace Number_prototype
 */

module.exports = {
  round (p) {
    /**
     * @memberof Number_prototype#
     * @param {number} p - 保留小数点
     * @description 四舍五入到某一位
     * @function round
     * @return {number}
     * @example
     * 1.123456789.round(6)
     * // 1.123457
     */

    p = Math.pow(10, p || 0)
    return Math.round(this * p) / p
  },

  prettyBytes (precision = 3, addSpace = true, unit = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'], gap = 1000) {
    /**
     * @memberof Number_prototype#
     * @param {Number} precision - 精度
     * @param {Boolean} addSpace - 和单位之间是否有空格
     * @param {Array} unit - 单位后缀的数组
     * @param {Number} gap - 间隔默认1000
     * @description 美化字节输出
     * @function prettyBytes
     * @return {String}
     * @example
     * (1000).prettyBytes()
     * // 1 KB
     */

    if (Math.abs(this) < 1) {
      return this.round(precision) + (addSpace ? ' ' : '') + unit[0]
    }
    const exponent = Math.min(Math.floor(Math.log10(this < 0 ? -this : this) / 3), unit.length - 1)
    const n = Number(((this < 0 ? -this : this) / gap ** exponent).toPrecision(precision))
    return (this < 0 ? '-' : '') + n + (addSpace ? ' ' : '') + unit[exponent]
  },
  isPrime () {
    /**
     * @memberof Number_prototype#
     * @description 判断质数
     * @function isPrime
     * @return {bool}
     * @example
     * (15).isPrime()
     * // false
     */

    if (this === 2) {
      // 2是质数
      return true
    } else if (this % 2 === 0) {
      // 排除偶数
      return false
    }
    // 依次判断是否能被奇数整除，最大循环为数值的开方
    const squareRoot = Math.sqrt(this)
    // 因为2已经验证过，所以从3开始；且已经排除偶数，所以每次加2
    for (let i = 3; i <= squareRoot; i += 2) {
      if (this % i === 0) {
        return false
      }
    }
    return true
  },

  /**
   * @memberof Number_prototype#
   * @description 同String.fillStr
   * @function fillStr
   * @return {String}
   */

  fillStr: String.prototype.fillStr
}
