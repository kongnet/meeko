const reg = require('./reg/index.js')

/**
 * @namespace Reg_prototype
 */

const gen = s => {
  /**
   * @memberof Reg_prototype#
   * @param {string} s - 正则表达式
   * @description 按照正则表达式输出相应内容
   * @function gen
   * @return {number}
   * @example
   * gen('-[1-9][0-9]{2,10}')
   * // -513
   */

  return reg.Handler.gen(reg.Parser.parse(s))
}

module.exports = {
  gen
}
