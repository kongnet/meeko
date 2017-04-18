'use strict'
// 数组原型扩展
module.exports = {
  copy () {
    return [].concat(this)
  },
  unique () {
    return Array.from(new Set(this))
  }
}
