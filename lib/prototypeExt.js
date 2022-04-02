'use strict'

function ext (a, b, isCall = false) {
  if (a && b) {
    for (const item in b) {
      if (!a.hasOwnProperty(item)) {
        if (isCall) {
          a[item] = (first, ...arg) => b[item].apply(first, arg)
        } else {
          // a[item] = b[item]
          Object.defineProperty(a, item, {
            configurable: false,
            enumerable: false,
            value: b[item]
          })
        }
      } else {
        // globalThis.isMeekoLoad && console.log(c.g(item.toUpperCase()), 'ES2015-2021 new method')
      }
    }
    return a
  }
  return null
}

const _s = require('./string.js')
ext(String.prototype, _s)
const string = {}
ext(string, _s, !0)

const _n = require('./number.js')
ext(Number.prototype, _n)
const number = {}
ext(number, _n, !0)

const _d = require('./date.js')
ext(Date.prototype, _d)
const date = {}
ext(date, _d, !0)

const _f = require('./function.js')
ext(Function.prototype, _f)

const _a = require('./array.js')
ext(Array.prototype, _a)
const array = {}
ext(array, _a, !0)

/**
 * @memberof Date_prototype#
 * @param {string} str - 填充字符
 * @param {number} len - 总长度
 * @param {number} pos - 1右面，-1左面
 * @description 给日期前后补充字符串
 * @function fillStr
 * @return {string}
 * @example
 * new Date()['fillStr']('a', 50)
 * // Tue Dec 29 2015 01:11:01 GMT+0800 (中国标准时间)aa
 */
Date.prototype['fillStr'] = String.prototype['fillStr'] //eslint-disable-line

/**
 * @namespace Buffer_prototype
 * */
/**
 * @memberof Buffer_prototype#
 * @description 合并两个Buffer
 * @function contact
 * @param {Buffer} b 另一Buffer
 * @return {Buffer}
 * @example
 * Buffer.from('123').contact(Buffer.from('456')).toString()
 * // "123456"
 * */
if (Buffer !== undefined) {
  Buffer.prototype.contact =
    Buffer.prototype.contact ||
    function (b) {
      /*
    utf8 有bom头
    EF BB BF [239 187 191]
    */

      const bf = Buffer.alloc(this.length + b.length)
      this.copy(bf, 0, 0, this.length)
      b.copy(bf, this.length, 0, b.length)
      return bf
    }
}

module.exports = {
  array,
  date,
  number,
  string,
  ext
}
