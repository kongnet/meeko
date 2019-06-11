'use strict'
module.exports = {
  round (p) {
    p = Math.pow(10, p || 0)
    return Math.round(this * p) / p
  },
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
