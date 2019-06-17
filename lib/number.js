'use strict'

/**
 * @namespace Number_prototype
 */

module.exports = {
/**
* @memberof Number_prototype#
* @param {number} p - 保留小数点
* @description 四舍五入
* @function round
* @return {number}
* @example
* 1.123456789.round(6)
* // 1.123457
*/
  round (p) {
    p = Math.pow(10, p || 0)
    return Math.round(this * p) / p
  },

  /**
* @memberof Number_prototype#
* @description 判断质数
* @function isPrime
* @return {bool}
* @example
* (15).isPrime()
* // false
*/
  isPrime () {
    // 2是质数
    if (this === 2) {
      return true
    } else if (this % 2 === 0) { // 排除偶数
      return false
    }
    // 依次判断是否能被奇数整除，最大循环为数值的开方
    var squareRoot = Math.sqrt(this)
    // 因为2已经验证过，所以从3开始；且已经排除偶数，所以每次加2
    for (var i = 3; i <= squareRoot; i += 2) {
      if (this % i === 0) {
        return false
      }
    }
    return true
  },
  fillStr: String.prototype.fillStr
}
