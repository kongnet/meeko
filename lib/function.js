'use strict'
// @ts-check
/**
 * @namespace Function_prototype
 */

module.exports = {
  /**
   * @memberof Function_prototype#
   * @param {number} s - 开始的字符串
   * @param {number} e - 结束的字符串
   * @description 获取函数内部注解
   * @function help
   * @return {String}
   * @example
   * (function(){\/* comment1 *\/}).help()
   * // 'comment1'
   */

  help (s = '/*', e = '*/') {
    let l = '' + this
    l = l.substring(l.indexOf(s) + 3, l.lastIndexOf(e))
    return l.trim()
  }
}
