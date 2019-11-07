const $ = require('./index')
const fs = require('fs')
const crypto = require('crypto')

function logTitle (s = '', strNum = 32) {
  console.log(`\n${'='.repeat(strNum)}${s}${'='.repeat(strNum)}\n`)
}

logTitle('阶乘比较')
function factorialize1 (num) {
  if (num < 0) {
    return -1
  } else if (num === 0 || num === 1) {
    return 1
  } else {
    return num * factorialize1(num - 1)
  }
}
function fac1 () {
  const ret = factorialize1(100)
}
function fac2 () {
  const ret = $.math.fac(100)
}

$.benchmark(fac1, '递归阶乘', 100000)
$.benchmark(fac2, '不递归阶乘', 100000)

logTitle('四舍五入比较')
const round1 = () =>
  (function (n, dec) {
    return n.round(dec)
  })(1.23456789, 4)
const round2 = () =>
  (function (n, dec) {
    return Number(`${Math.round(`${n}e${dec}`)}e-${dec}`)
  })(1.23456789, 4)
$.benchmark(round1, 'sky四舍五入到某一位', 100000)
$.benchmark(round2, '网上技巧es6实现任意位四舍五入', 100000)

logTitle('去重函数比较')
const uniq1 = function () {
  function uniq (array) {
    const temp = {}
    const r = []
    const len = array.length
    let val
    let type
    for (let i = 0; i < len; i++) {
      val = array[i]
      type = typeof val
      if (!temp[val]) {
        temp[val] = [type]
        r.push(val)
      } else if (temp[val].indexOf(type) < 0) {
        temp[val].push(type)
        r.push(val)
      }
    }
    return r
  }
  return uniq([undefined, null, 1, 1, '1', '1', null, undefined, NaN, NaN])
}
const uniq2 = function () {
  return [undefined, null, 1, 1, '1', '1', null, undefined, NaN, NaN].unique()
}

const uniq3 = function () {
  function uniq (array) {
    const n = [array[0]]
    let hasNaN = 0 // 结果数组
    for (let i = 1; i < array.length; i++) {
      if (array.indexOf(array[i]) === i) {
        n.push(array[i])
      }
      if (hasNaN === 0 && isNaN(array[i])) {
        hasNaN = 1
        n.push(NaN)
      }
    }
    return n
  }
  return uniq([undefined, null, 1, 1, '1', '1', null, undefined, NaN, NaN])
}
$.benchmark(uniq1, '对象键值法去重法,es5时代号称最快', 100000)
$.benchmark(uniq2, 'es6方案', 100000)
$.benchmark(uniq3, '最简单数组去重法,但结果可能有误差', 100000)

logTitle('累加比较')
const sum1 = function () {
  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  let s = 0
  for (let i = 0; i < a.length; i++) {
    s += a[i]
  }
  return s
}
const sum2 = function () {
  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  return $.math.sum(a)
}

$.benchmark(sum1, 'for循环累加', 1000000)
$.benchmark(sum2, 'reduce累加', 1000000)

logTitle('求max比较')
const max1 = function () {
  const arr = [7, 2, 0, -3, 5]
  return Math.max.apply(null, arr)
}
const max2 = function () {
  const arr = [7, 2, 0, -3, 5]
  return arr.sort(function (a, b) {
    return b - a
  })[0]
}
const max3 = function () {
  const arr = [7, 2, 0, -3, 5]
  return $.math.max(arr)
}
const max4 = function () {
  const arr = [7, 2, 0, -3, 5]
  return Math.max(...arr)
}
$.benchmark(max1, 'apply求max')
$.benchmark(max2, 'sort求max')
$.benchmark(max3, 'reduce求max')
$.benchmark(max4, 'es6解构求max')

logTitle('数组分组比较')
const chunk1 = function () {
  const a = [345, 45, 5, 58, 5, 325, 756, 86, 342, 62, 51, 56437, 34, 5]
  a.chunk(7)
}
const chunk2 = function () {
  function chunk (array, subGroupLength) {
    let idx = 0
    const newArray = []
    while (idx < array.length) {
      newArray.push(array.slice(idx, (idx += subGroupLength)))
    }
    return newArray
  }
  const a = [345, 45, 5, 58, 5, 325, 756, 86, 342, 62, 51, 56437, 34, 5]
  chunk(a, a.length / 7)
}
$.benchmark(chunk1, 'es6数组分组', 100000)
$.benchmark(chunk2, '普通数组分组', 100000)

logTitle('洗牌比较')

const shuffle1 = function () {
  const arr = [7, 2, 0, -3, 5]
  return arr.shuffle()
}
const shuffle2 = function () {
  return [7, 2, 0, -3, 5].fisherYates
}
$.benchmark(shuffle1, '普通洗牌算法')
$.benchmark(shuffle2, 'Fisher-Yates洗牌算法')

logTitle('唯一ID生成比较')
const tempSnowflake = new $.Snowflake(1, 1, 0)
const genSnowFlake = function () {
  return tempSnowflake.nextId()
}
const genUUID = function () {
  return $.tools.uuid()
}

const UUIDGen = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16)
  )
$.benchmark(genSnowFlake, 'sky SnowFlake函数', 100000)
$.benchmark(genUUID, 'sky gUID函数', 100000)

$.benchmark(UUIDGen, 'UUIDGen', 10000)
