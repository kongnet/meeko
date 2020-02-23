'use strict'

const fs = require('fs')
const tools = require('../tools/index')
const color = require('../color.js')
const path = require('path')
const r = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'fakeResource.dat'), 'utf-8')
)
const aFirst = r.firstName.split('')
const aSecond = r.secondName.split('')
const addrCodeArr = r.addressCode

function randData (o, n) {
  if (!o) {
    return ''
  }
  const a = o instanceof Array ? o : String(o).split('')
  const len = a.length - 1
  let str = ''
  for (let i = 0; i < n; i++) {
    str += a[tools.rnd(0, len)]
  }
  return str
}

function randNum (n) {
  /**
   * @memberof fake#
   * @description 随机生成长度为n的数字,返回值类型为字符串
   * @function randNum
   * @param {Number} n - 长度
   * @return {String}
   * @example
   * console.log($.fake.randNum(10))
   */

  let sNum = ''
  for (let i = 0; i < n; i++) {
    sNum += tools.rnd(0, 9)
  }
  return sNum
}
function randStr (n) {
  /**
   * @memberof fake#
   * @description 随机生成长度为n的小写字母,返回值类型为字符串
   * @function randStr
   * @param {Number} n - 长度
   * @return {String}
   * @example
   * console.log($.fake.randStr(10))
   */

  return randData('abcdefghijklmnopqrstuvwxyz', n)
}

function randTime (startTime, endTime) {
  const secStart = new Date(startTime).getTime() / 1000
  let secDiff = 0
  if (secStart < 0) {
    secDiff = new Date(endTime) / 1000 + Math.abs(secStart)
  } else {
    secDiff = ~~((new Date(endTime) - new Date(startTime)) / 1000)
  }
  const randSec = tools.rnd(0, secDiff)
  const resultSec = new Date(startTime).getTime() + randSec * 1000
  return new Date(resultSec).date2Str()
}

function randfirstName () {
  /**
   * @memberof fake#
   * @description 随机生成一个姓氏
   * @function randfirstName
   * @return {String}
   * @example
   * console.log($.fake.randfirstName())
   */

  return randData(aFirst, 1)
}

function randSecName () {
  /**
   * @memberof fake#
   * @description 随机生成名字,长度为1或2
   * @function randSecName
   * @return {String}
   * @example
   * console.log($.fake.randSecName())
   */

  return randData(aSecond, tools.rnd(1, 2))
}

function randName () {
  return `${randfirstName()}${randSecName()}`
}

function randColor (colorType) {
  if (colorType === 'rgba') {
    const a = []
    for (let i = 0; i < 3; i++) {
      a.push(tools.rnd(0, 255))
    }
    a.push(Math.round(Math.random() * 10) / 10)
    return `rgba(${a[0]},${a[1]},${a[2]},${a[3]})`
  } else {
    return `#${randData('0123456789abcdef', 6)}`
  }
}
function genImg (option = {}) {
  /**
   * @memberof fake#
   * @description 随机size的svg图片
   * @function genImg
   * @return {String}
   * @example
   * ctx.type = 'image/svg+xml'
   * ctx.body=$.Mock.genImg({ bg: $.fake.randColor(), fc: '#fff' })
   */

  const objDefaut = {
    size: '128x128',
    text: '占位符',
    textX: 0,
    textY: 0,
    bg: '#EEEEEE',
    fs: '14',
    fc: '#AAAAAA',
    isText: 'y'
  }
  const svgObj = Object.assign(objDefaut, option)

  const size = svgObj.size ? svgObj.size.split('x') : []
  if (size.length !== 2) {
    return 0
  }
  svgObj.text = svgObj.text ? decodeURIComponent(svgObj.text) : ''
  svgObj.width = size[0]
  svgObj.height = size[1]
  svgObj.size = svgObj.width + 'x' + svgObj.height
  svgObj.textX = (svgObj.width / 2) | 0
  svgObj.textY = (svgObj.height / 2) | 0

  if (svgObj.isText === 'n') {
    svgObj.text = ''
    svgObj.size = ''
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${svgObj.width}" height="${svgObj.height}" viewBox="0 0 ${svgObj.width} ${svgObj.height}" preserveAspectRatio="none">
  <rect width="${svgObj.width}" height="${svgObj.height}" fill="${svgObj.bg}" />
  <text text-anchor="start" x="10" y="20" style="fill:${svgObj.fc};font-size:${svgObj.fs}px;font-family:Helvetica,sans-serif;dominant-baseline:central">${svgObj.text}</text>
  <text text-anchor="middle" x="${svgObj.textX}" y="${svgObj.textY}" style="fill:${svgObj.fc};font-size:${svgObj.fs}px;font-family:Helvetica,sans-serif;dominant-baseline:central">${svgObj.size}</text>
  </svg>`
  return svg
}
function price (beforeDot, afterDot) {
  /**
   * @memberof fake#
   * @description 随机生成价格, beforeDot为,
   * @function price
   * @param {Number} beforeDot - 整数长度
   * @param {Number} afterDot - 小数长度
   * @return {String}
   * @example
   * console.log($.fake.price(2, 2))
   */

  return `${randNum(beforeDot)}.${randNum(afterDot)}`
}

function smallAndNum (n) {
  /**
   * @memberof fake#
   * @description 随机生成长度为n的小写字母+数字
   * @function smallAndNum
   * @param {Number} n - 长度
   * @return {String}
   * @example
   * console.log($.fake.smallAndNum(4))
   */

  n = Number(n) || 1
  return randData('0123456789abcdefghijklmnopqrstuvwxyz', n)
}

function randUrl (n) {
  n = Number(n) || 1
  return `http://www.${smallAndNum(tools.rnd(1, n))}.com/`
}

function randIp () {
  const aIp = []
  for (let i = 0; i < 4; i++) {
    aIp.push(tools.rnd(0, 255))
  }
  return aIp.join('.')
}

// 手机号码
const mobile = [
  [
    134,
    135,
    136,
    137,
    138,
    139,
    144,
    147,
    148,
    150,
    151,
    152,
    157,
    158,
    159,
    172,
    178,
    182,
    183,
    184,
    187,
    188,
    198
  ], // 移动
  [130, 131, 132, 140, 145, 146, 155, 156, 166, 167, 171, 175, 176, 185, 186], // 联通
  [133, 149, 153, 173, 174, 177, 180, 181, 189, 191, 199], // 电信
  [165, 170] // 虚拟
]

function whichNetwork (s) {
  /**
   * @memberof fake#
   * @description 检查手机号是哪个服务商的,
   * @function whichNetwork
   * @param {Number | String} s - 手机号
   * @return {String} i - 返回值是数字(-1:不存在, 0:移动, 1:联通, 2: 电信)
   * @example
   * console.log($.fake.whichNetwork(13713833331))
   */

  s = s.substring(0, 3)
  for (let i = 0; i < mobile.length; i++) {
    if (mobile[i].includes(+s)) {
      return i
    }
  }
  return -1
}

function phoneNum () {
  return `${randData(mobile[tools.rnd(0, 2)], 1)}${randNum(8)}`
}

function idCard () {
  const addrCodeLen = addrCodeArr.length
  let sIdNum = addrCodeArr[tools.rnd(0, addrCodeLen - 1)]
  const iNow = new Date().date2Str().substring(0, 10)
  const sr = randTime('1900-01-01', iNow).substring(0, 10)
  sIdNum += sr.substring(0, 10).replace(/-/gi, '')
  sIdNum += randNum(3)
  // 加权因子
  const coefficientArray = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  // 校验码
  const lastNumberArray = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
  const a = sIdNum.split('')
  let total = 0
  for (let i = 0, l = a.length; i < l; i++) {
    total += parseInt(a[i], 10) * coefficientArray[i]
  }
  return sIdNum + lastNumberArray[total % 11]
}
module.exports = {
  genImg,
  randData,
  randNum,
  randStr,
  randTime,
  randName,
  randfirstName,
  randSecName,
  randColor,
  price,
  smallAndNum,
  randUrl,
  randIp,
  phoneNum,
  idCard, // 随机生成身份证
  whichNetwork // 手机号码是那个服务商
}
