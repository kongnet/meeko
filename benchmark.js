const $ = require('./index')

const crypto = require('crypto')

function logTitle (s = '', strNum = 32) {
  console.log(`\n${'='.repeat(strNum)}${s}${'='.repeat(strNum)}\n`)
}

const propExistObj = { name: 'sky' }
const propExist1 = () => 'name' in propExistObj
const propExist2 = () => propExistObj.name !== undefined
const propExist3 = () => propExistObj.hasOwnProperty('name')

const strOri =
  '9999nas56765d.n.kasdkskdnfkjsdfkjhsdfiuhsdfiusadfiuhsdfiöhsdifhsäodfskyjiosdfisdfsdfnosdfiosdf89sdfs98pdfzp98sdf98psfzp8sfzp8sfzp89szfp8snasd.n.kasdkskdskynfkjsdfkjhsdfiuhsdfiusadfiuhsdfiöhsdifhsäodfjiosdfisdfsdfnosdfiosdf89sdfs98pdfzp98sdf98psfzp8sfzp8sfzp89szfp8snasd.n.kasdkskdnfkjsdfkjhsdfiuhsdfiusadfiuhsdfiöhsdifhsäodfjiosdfisdfsdfnosdfiosdf89sdfs98pdfzp98sdf98psfzp8sfzp8sfzp89szfp8snasd.hellon.kasdkskdnfkjsdfkjhsdfiuhsdfiusadfiuhsdfiöhsdifhsäodfjiosdfisdfsdfnosdfiosdf89sdfs98pdfzp98sdf98psfzp8sfzp8sfzp89szfp8s'
const needle = 'sky'
const needleRegex = /sky/g
const strExist1 = () => strOri.indexOf(needle) > -1
const strExist2 = () => needleRegex.test(strOri)
const strExist3 = () => strOri.match(needleRegex)
const strExist4 = () => strOri.includes(needle)
const strExist5 = () => strOri.search(needleRegex)

const cloneArray = [
  29,
  27,
  28,
  838,
  22,
  2882,
  2,
  93,
  84,
  74,
  7,
  933,
  3754,
  3874,
  22838,
  38464,
  3837,
  82424,
  2927,
  2625,
  63,
  27,
  28,
  838,
  22,
  2882,
  2,
  93,
  84,
  74,
  7,
  933,
  3754,
  3874,
  22838,
  38464,
  3837,
  82424,
  2927,
  2625,
  63,
  27,
  28,
  838,
  22,
  2882,
  2,
  93,
  84,
  74,
  7,
  933,
  3754,
  3874,
  22838,
  38464,
  3837,
  82424,
  2927,
  2625,
  63,
  27,
  28,
  838,
  22,
  2882,
  2,
  93,
  84,
  74,
  7,
  933,
  3754,
  3874,
  22838,
  38464,
  3837,
  82424,
  2927,
  2625,
  63
]
const cloneArr1 = () => cloneArray.slice()
const cloneArr2 = () => [].concat(cloneArray)
const cloneArr3 = () => {
  const a = []
  for (let i = cloneArray.length; i > 0; i--) {
    a.unshift(cloneArray[i])
  }
  return a
}
const cloneArr4 = () => {
  const a = []
  for (let i = 0, l = cloneArray.length; i < l; i++) {
    a.push(cloneArray[i])
  }
  return a
}
const cloneArr5 = () => {
  const l = cloneArray.length
  const a = new Array(l)
  for (let i = 0; i < l; i++) {
    a[i] = cloneArray[i]
  }
  return a
}
const cloneArr6 = () => Array.apply(undefined, cloneArray)
const cloneArr7 = () =>
  cloneArray.map(function (i) {
    return i
  })
const cloneArr8 = () => JSON.parse(JSON.stringify(cloneArray))

logTitle('基础-delete undefined null')
const delObj1 = {
  name: 'sky',
  lastName: 'kong'
}
const delObj2 = {
  name: 'sky',
  lastName: 'kong'
}
const delObj3 = {
  name: 'sky',
  lastName: 'kong'
}
const del1 = () => {
  delete delObj1.name
  return 1
}
const del2 = () => {
  delObj2.name = undefined
  return 1
}
const del3 = () => {
  delObj3.name = null
  return 1
}

const strConcat1 = () => {
  const t = 'x'
  let tt = ''
  for (let i = 0; i < 1000; i++) {
    tt += t
  }
  return tt
}
const strConcat2 = () => {
  const t = 'x'
  const tt = []
  for (let i = 0; i < 1000; i++) {
    tt.push(t)
  }
  return tt.join('')
}
const strConcat3 = () => {
  const t = 'x'
  const tt = []
  for (let i = 0; i < 1000; i++) {
    tt[i] = t
  }
  return tt.join('')
}

function secRand (a, b) {
  // （1）首先找到样本数据Y的最小值Min及最大值Max
  // （2）计算系数为：k=(b-a)/(Max-Min)
  // （3）得到归一化到[a,b)区间的数据：norY=a+k(Y-Min)

  const r = crypto.randomBytes(4) // 0-4294967295
  return Math.floor(((b - a + 1) / 4294967295) * r.readUInt32LE(0)) + a
}
const rand1 = function () {
  return $.math.uniformRandInt(0, 10000)
}
const rand2 = function () {
  return secRand(0, 10000)
}

const thousand = function (number, p = 3) {
  const sign = Math.sign(number)
  const arr = (Math.abs(number) + '').split('.')
  const int = arr[0] + ''
  const fraction = arr[1] || ''
  const f = int.length % 3
  let r = int.substring(0, f)

  for (let i = 0; i < Math.floor(int.length / 3); i++) {
    r += ',' + int.substring(f + i * 3, f + (i + 1) * 3)
  }

  if (f === 0) {
    r = r.substring(1)
  }

  return (sign < 0 ? '-' : '') + r + (fraction ? '.' + fraction.slice(0, p) : '')
}

const thousandFormatWithMod = function (number, p = 3) {
  const sign = Math.sign(number)
  let n = Math.abs(number)
  let r = ''
  let mod
  do {
    mod = n % 1000
    n = n / 1000
    r = ~~mod + (r ? ',' + r : '')
  } while (n > 1)

  let strNumber = number + ''
  let index = strNumber.indexOf('.')
  if (index > 0) {
    r += strNumber.substring(index).slice(0, p + 1)
  }
  return (sign < 0 ? '-' : '') + r
}
const isEmpty = function () {
  const o = {}
  return !!Object.keys(o).length
}
const isEmpty2 = function () {
  const o = {}
  return JSON.stringify(o) === '{}'
}
const invSqrt = function (f) {
  return 1 / Math.sqrt(f)
}

const buf = new ArrayBuffer(4) // Float32Array.BYTES_PER_ELEMENT
const f32 = new Float32Array(buf)
const u32 = new Uint32Array(buf)
function invSqrt2 (x) {
  f32[0] = x
  const x2 = 0.5 * f32[0]
  u32[0] = 0x5f3759df - (u32[0] >> 1)
  let y = f32[0]
  y = y * (1.5 - x2 * y ** 2) // 1st iteration
  return y
}

const invSqrtTest = function () {
  return invSqrt(3277)
}
const invSqrtTest2 = function () {
  return invSqrt2(3277)
}

const testSuite = [
  {
    name: '基础-判断对象为空',
    testArr: [
      [isEmpty, 'Object.keys判断空', 1e6],
      [isEmpty2, 'JSON.stringify判断为空', 1e6]
    ]
  },
  {
    name: '基础-判断属性存在',
    testArr: [
      [propExist1, 'key in 方式', 1e6],
      [propExist2, '直接判断undefined', 1e6],
      [propExist3, 'hasOwnProperty判断', 1e6]
    ]
  },
  {
    name: '基础-字符串存在判断',
    testArr: [
      [strExist1, 'indexOf查找'],
      [strExist2, '正则'],
      [strExist3, 'match判断'],
      [strExist4, 'es6 includes判断'],
      [strExist5, 'search判断']
    ]
  },
  {
    name: '基础-克隆数组',
    testArr: [
      [cloneArr1, 'slice克隆', 1e5],
      [cloneArr2, 'concat克隆', 1e5],
      [cloneArr3, 'unshift克隆', 1e5],
      [cloneArr4, 'push克隆', 1e5],
      [cloneArr5, 'index克隆', 1e5],
      [cloneArr6, '数组apply克隆', 1e5],
      [cloneArr7, 'map克隆', 1e5],
      [cloneArr8, 'JSON.stringify克隆', 1e5]
    ]
  },
  {
    name: '基础-delete undefined null',
    testArr: [
      [del1, 'delete删', 1e6],
      [del2, '赋值undefined', 1e6],
      [del3, '赋值null', 1e6]
    ]
  },
  {
    name: '基础-字符串拼接',
    testArr: [
      [strConcat1, '直接+=', 1e4],
      [strConcat2, 'join字符串', 1e4],
      [strConcat3, 'length-join', 1e4]
    ]
  },
  {
    name: '随机整数生成比较',
    testArr: [
      [rand1, '普通包含两端随机函数', 1e5],
      [rand2, '安全包含两端随机函数randomBytes实现', 1e5]
    ]
  },
  {
    name: '千分位显示',
    testArr: [
      [
        function 原生 () {
          return (123456789.123456789).toLocaleString()
        },
        '',
        100000
      ],
      [
        function 普通切割 () {
          return thousand(123456789.123456789)
        },
        '',
        100000
      ],
      [
        function 数值取模法 () {
          return thousandFormatWithMod(123456789.123456789)
        },
        '',
        100000
      ]
    ]
  },
  {
    name: '倒数平方',
    testArr: [
      [invSqrtTest, '平方倒数1', 1e6],
      [invSqrtTest2, '魔法数0x5f3759df平方倒数2', 1e6]
    ]
  }
]

$.bench.suite(testSuite)

logTitle('基础-数组对象查找')
const findArr = [{ id: 29938 }, { id: 32994 }, { id: 38428 }, { id: 20395 }, { id: 32949 }]

const oFind = {}
oFind['29938'] = { id: 29938 }
oFind['32994'] = { id: 32994 }
oFind['38428'] = { id: 38428 }
oFind['20395'] = { id: 20395 }
oFind['32949'] = { id: 32949 }

const keyToFind = '38428'
const findId1 = () => {
  let result

  for (let item of findArr) {
    if (item.id === +keyToFind) {
      result = item.id
      break
    }
  }
  return result
}
const findId2 = () => findArr.find(item => item.id === +keyToFind)
const findId3 = () => oFind[keyToFind]
$.benchmark(findId1, 'for循环查找', 1e6)
$.benchmark(findId2, 'find迭代函数查找', 1e6)
$.benchmark(findId3, 'hash直接查找', 1e6)

logTitle('基础-判断整数')

const isInt1 = () => {
  const value = 0.15
  return (
    !isNaN(value) &&
    (function (x) {
      return (x | 0) === x
    })(parseFloat(value))
  )
}

const isInt2 = () => $.tools.isInt(0.15)
$.benchmark(isInt1, '普通判断整数', 1e6)
$.benchmark(isInt2, '正则判断整数', 1e6)

logTitle('基础-数组最大最小值')
const minMaxArr = [82, 28, 2726, 28, 29, 19, 282737, 88, 2827, 917, 2, 2828, 999, 827, 82, 928272, 2826, 373636, 278, 2282, 292727, 282, 23, 833, 92829, 282, 2, 939, 111, 8382, 238]
const minMax1 = () => [Math.min(...minMaxArr), Math.max(...minMaxArr)]
const minMax2 = () => [minMaxArr.reduce((a, b) => Math.min(a, b)), minMaxArr.reduce((a, b) => Math.max(a, b))]
const minMax3 = () => [Math.min.apply(null, minMaxArr), Math.max.apply(null, minMaxArr)]
const minMax4 = () => [$.math.min(minMaxArr), $.math.max(minMaxArr)]
$.benchmark(minMax1, 'es6 解构查找数组最值', 1e6)
$.benchmark(minMax2, 'reduce查找数组最值', 1e6)
$.benchmark(minMax3, '普通方式查找数组最值', 1e6)
$.benchmark(minMax4, 'reduce查找数组最值2', 1e6)

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
  return ret + 0
}
function fac2 () {
  const ret = $.math.fac(100)
  return ret + 0
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
  for (let item of a) {
    s += item
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

const UUIDGen = () => ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16))
$.benchmark(genSnowFlake, 'sky SnowFlake函数', 100000)
$.benchmark(genUUID, 'sky gUID函数', 100000)
$.benchmark(UUIDGen, 'UUIDGen', 10000)

logTitle('生成序列比较')
const arr1 = function () {
  return new Array(9).fill(0).map((item, index) => index + 1)
}

const arr2 = function () {
  return Array.from(Array(9), (v, k) => k + 1)
}

const arr3 = function () {
  return [...Array(9).keys()]
}
$.benchmark(arr1, 'arr1', 100000)
$.benchmark(arr2, 'arr2', 100000)
$.benchmark(arr3, 'arr3', 100000)
