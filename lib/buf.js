'use strict'
// @ts-check
/**
 * @namespace buf
 */

const zero = Buffer.from([0x0]) // 0x0
// 按指定字符拆分buffer
const split = (a = [], spl = zero) => {
  const arr = []
  let [cur, n] = [0, 0]
  while ((n = a.indexOf(spl, cur)) !== -1) {
    arr.push(a.slice(cur, n))
    cur = n + spl.length
  }
  arr.push(a.slice(cur))
  return arr
}
// 按指定字符合并buffer
const join = (a = [], splitElm = zero) => {
  return a.reduce((x, y) => x.contact(splitElm).contact(y))
}

module.exports = {
  join,
  split,
  zero
}
