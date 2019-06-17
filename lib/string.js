'use strict'
/**
 * @namespace String_prototype
 */
const tpl = require('./tpl')
module.exports = {
  /**
  * @memberof String_prototype#
  * @param {Object} o - 渲染模板对象
  * @description html模板渲染
  * @function render
  * @return {string}
  * @example
  * '<{{d.tag}}></{{d.tag}}>'.render({ tag: 'div' })
  * // <div></div>
  */
  render (o) {
    return tpl(this).render(o)
  },

  /**
  * @memberof String_prototype#
  * @param {string} str - 填充字符
  * @param {number} len - 总长度
  * @param {number} pos - 1右面，-1左面
  * @description html模板渲染
  * @function fillStr
  * @return {string}
  * @example
  * 'bcdef'.fillStr('a', 8, 1)
  * // bcdefaaa
  */
  fillStr (str, len, pos = 1) { // 填入什么字符多少位,中文算2个字符,pos1右面，-1左面
    let l = (this + '').len()
    let s = (len - l > 0 ? str.times(len - l) : '')
    return ~pos ? this + s : s + this
  },

  /**
  * @memberof String_prototype#
  * @param {number} p - 精度
  * @description 数字转金额显示
  * @function toMoney
  * @return {string}
  * @example
  * '-9812345678.45678901'.toMoney(2)
  * // '-9,812,345,678.45'
  */
  toMoney (p) { // p精度
    let num = String(this)
    num = num.replace(new RegExp(',', 'g'), '')
    // 正负号处理
    let symble = ''
    if (/^([-+]).*$/.test(num)) {
      symble = num.replace(/^([-+]).*$/, '$1')
      num = num.replace(/^([-+])(.*)$/, '$2')
    }
    if (/^[-.0-9]+(\.[0-9]+)?$/.test(num)) {
      num = num.replace(new RegExp('^[0]+', 'g'), '')
      if (/^\./.test(num)) {
        num = '0' + num
      }
      let decimal = num.replace(/^[0-9]+(\.[0-9]+)?$/, '$1')
      let integer = num.replace(/^([0-9]+)(\.[0-9]+)?$/, '$1')
      let re = /(\d+)(\d{3})/
      while (re.test(integer)) {
        integer = integer.replace(re, '$1,$2')
      }
      if (Number(p)) {
        decimal = decimal.substr(0, Number(p) + 1)
      }
      if (p === 0) {
        decimal = ''
      }
      return symble + integer + decimal
    } else {
      return p
    }
  },

  /**
  * @memberof String_prototype#
  * @description 字符串转小写
  * @function toLow
  * @return {string}
  * @example
  * 'AsdF'.toLow()
  * // 'asdf'
  */
  toLow () {
    return this.toLowerCase()
  },

  /**
  * @memberof String_prototype#
  * @description 字符串转大写
  * @function toUp
  * @return {string}
  * @example
  * 'AsdF'.toUp()
  * // 'ASDF'
  */
  toUp () {
    return this.toUpperCase()
  },

  /**
  * @memberof String_prototype#
  * @description 转译成html
  * @function esHtml
  * @return {string}
  * @example
  * '&<>'.esHtml()
  * // '&amp;&lt;&gt;'
  */
  esHtml () {
    let o = { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', '\u00a0': '&nbsp;' }
    return this.replace(/[<>&"\\u00a0]/g, function (s) {
      return o[s]
    })
  },

  /**
  * @memberof String_prototype#
  * @description html转译
  * @function toHtml
  * @return {string}
  * @example
  * '&amp;&lt;&gt;'.toHtml()
  * // '&<>'
  */
  toHtml () {
    return this.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&nbsp;/g, '\u00a0')
  },

  /**
  * @memberof String_prototype#
  * @description html相关元素去掉
  * @function reHtml
  * @return {string}
  * @example
  * '<div><a>xx</a><div><div>yy</div>'.reHtml()
  * // xxyy
  */
  reHtml () {
    return this.replace(/<\/?[^>]+>/gi, '')
  },

  /**
  * @memberof String_prototype#
  * @description 字符串重复输出
  * @param {number} n - 重复次数
  * @function times
  * @return {string}
  * @example
  * 'abc'.times(2)
  * // 'abcabc'
  */
  times (n) { // NOTICE: 原生repeat 比times快一个数量级
    return this.repeat ? this.repeat(n) : (n > 0 ? new Array(n + 1).join(this) : '')
  },

  /**
  * @memberof String_prototype#
  * @description 字符串格式化替换输出
  * @function format
  * @return {string}
  * @example
  * 'a{0}c{1}e{2}g{3}'.format('b', 'd', 'f', 1)
  * // 'abcdefg1'
  */
  format () {
    let [s, a] = [this, []]
    for (let i = 0, l = arguments.length; i < l; i++) {
      a.push(arguments[i])
    }
    return s.replace(/\{(\d+)\}/g, function (m, i) {
      return a[i] || '{' + i + '}'
    })
  },

  /**
  * @memberof String_prototype#
  * @description 字符串占用空间大小
  * @function len
  * @return {number}
  * @example
  * '我a'.len()
  * // 3
  */
  len () {
    return this.replace(/[^\x00-\xff]/gm, '**').length //eslint-disable-line
  },

  /**
  * @memberof String_prototype#
  * @description 转化为int类型
  * @function toInt
  * @return {number}
  * @example
  * '12.3'.toInt()
  * // 12
  */
  toInt () {
    return parseInt(this)
  },

  /**
  * @memberof String_prototype#
  * @description 替换字符串
  * @param {string} s1 - 原字符串
  * @param {string} s2 - 新字符串
  * @function replaceAll
  * @return {string}
  * @example
  * 'aaabbbccc'.replaceAll('b', 'x')
  * // 'aaaxxxccc'
  */
  replaceAll (s1, s2) {
    let a = this.split(s1)
    return a.join(s2)
  },

  /**
  * @memberof String_prototype#
  * @description 字符串前后替换空格
  * @function trim
  * @return {string}
  * @example
  * ' x x x   '.trim()
  * // 'x x x'
  */
  trim () {
    return this.replace(/^\s+|\s+$/g, '')
  },

  /**
  * @memberof String_prototype#
  * @description -后字符大写转换一个字符
  * @function camelize
  * @return {string}
  * @example
  * 'a-b-c-d-da-d'.camelize()
  * // 'aBCDDaD'
  */
  camelize () {
    return this.replace(/(-[a-z])/g, function (s) {
      return s.substring(1).toUpperCase()
    })
  },

  /**
  * @memberof String_prototype#
  * @description - 判断是否存在s字符串 单独包含 用于class name操作
  * @param {string} s - 字符串
  * @function ec
  * @return {bool}
  * @example
  * ' as df '.ec('as')
  * // true
  */
  ec (s) {
    s = s.trim()
    return (new RegExp('(^' + s + '\\s)|(\\s' + s + '$)|(\\s' + s + '\\s)|(^' + s + '$)', 'g')).test(this)
  },

  /**
  * @memberof String_prototype#
  * @description - 增加 & 删除 s字符串内容 用于class name操作
  * @param {string} s - 字符串
  * @function tc
  * @return {string}
  * @example
  * ' as df '.tc('as').tc('dd')
  * // df dd
  */
  tc (s) {
    s = s.trim()
    if (this.ec(s)) {
      return this.dc(s)
    } else {
      return this.ac(s)
    }
  },

  /**
  * @memberof String_prototype#
  * @description - 删除 s字符串内容 用于class name操作
  * @param {string} s - 字符串
  * @function dc
  * @return {string}
  * @example
  * ' as df '.dc('as')
  * // df
  */
  dc (s) {
    if (this.ec(s)) {
      return this.trim().split(s).join('').replace(/\s{2,}/g, ' ').trim()
    } else {
      return this
    }
  },

  /**
  * @memberof String_prototype#
  * @description - 增加 s字符串内容 用于class name操作
  * @param {string} s - 字符串
  * @function ac
  * @return {string}
  * @example
  * ' as df '.ac('as')
  * // df as
  */
  ac (s) {
    return this.trim().dc(s) + ' ' + s
  },

  /**
  * @memberof String_prototype#
  * @description -首字母大写
  * @function upperFirst
  * @return {string}
  * @example
  * 'abcd'.upperFirst()
  * // 'Abcd'
  */
  upperFirst () { // 首字母大写
    let s = this.toLowerCase()
    return s.replace(/\b(\w)|\s(\w)/g, function (m) {
      return m.toUpperCase()
    })
  }
}
