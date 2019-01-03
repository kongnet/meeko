'use strict'
const tpl = require('./tpl')
module.exports = {
  render (o) {
    return tpl(this).render(o)
  },
  fillStr (str, len) { // 填入什么字符多少位,中文算2个字符
    let l = (this + '').len()
    return this + (len - l > 0 ? str.times(len - l) : '')
  },
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
  toLow () {
    return this.toLowerCase()
  },
  toUp () {
    return this.toUpperCase()
  },
  esHtml () {
    let o = { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', '\u00a0': '&nbsp;' }
    return this.replace(/[<>&"\\u00a0]/g, function (s) {
      return o[s]
    })
  },
  toHtml () {
    return this.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&nbsp;/g, '\u00a0')
  },
  reHtml () {
    return this.replace(/<\/?[^>]+>/gi, '')
  },
  times (n) {
    return n > 0 ? new Array(n + 1).join(this) : ''
  },
  format () {
    let [s, a] = [this, []]
    for (let i = 0, l = arguments.length; i < l; i++) {
      a.push(arguments[i])
    }
    return s.replace(/\{(\d+)\}/g, function (m, i) {
      return a[i] || '{' + i + '}'
    })
  },
  len () {
    return this.replace(/[^\x00-\xff]/gm, '**').length //eslint-disable-line
  },
  toInt () {
    return parseInt(this)
  },
  replaceAll (s1, s2) {
    let a = this.split(s1)
    return a.join(s2)
  },
  trim () {
    return this.replace(/^\s+|\s+$/g, '')
  },
  camelize () {
    return this.replace(/(-[a-z])/g, function (s) {
      return s.substring(1).toUpperCase()
    })
  },
  ec (s) {
    s = s.trim()
    return (new RegExp('(^' + s + '\\s)|(\\s' + s + '$)|(\\s' + s + '\\s)|(^' + s + '$)', 'g')).test(this)
  },
  tc (s) {
    s = s.trim()
    if (this.ec(s)) {
      return this.dc(s)
    } else {
      return this.ac(s)
    }
  },
  dc (s) {
    if (this.ec(s)) {
      return this.trim().split(s).join('').replace(/\s{2,}/g, ' ').trim()
    } else {
      return this
    }
  },
  ac (s) {
    return this.trim().dc(s) + ' ' + s
  },
  upperFirst () { // 首字母大写
    let s = this.toLowerCase()
    return s.replace(/\b(\w)|\s(\w)/g, function (m) {
      return m.toUpperCase()
    })
  }
}
