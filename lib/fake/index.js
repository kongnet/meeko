'use strict'
let fs = require('fs')
let tools = require('../tools/index')
let path = require('path')
let r = JSON.parse(fs.readFileSync(path.join(__dirname, 'fakeResource.dat'), 'utf-8'))
let aFirst = r.firstName.split('')
let aSecond = r.secondName.split('')
let adrsCodeArr = r.addressCode
// console.log(tools.rnd(0,10))
// 随机生成长度为n的字符串，参数o为数据源
function randData (o, n) {
  if (!o) {
    return ''
  }
  let a = o instanceof Array ? o : (String(o)).split('')
  let len = a.length - 1
  let str = ''
  for (let i = 0; i < n; i++) {
    str += a[tools.rnd(0, len)]
  }
  return str
}

// 随机生成长度为n的数字,返回值类型为字符串
function randNum (n) {
  let sNum = ''
  for (let i = 0; i < n; i++) {
    sNum += tools.rnd(0, 9)
  }
  return sNum
}

// 随机生成长度为n的小写字母
function randStr (n) {
  return randData('abcdefghijklmnopqrstuvwxyz', n)
}

// 在某一时间段内随机生成日期,"2013-02-15 21:00:00"
function randTime (startTime, endTime) {
  let secStart = new Date(startTime).getTime() / 1000
  let secDiff = 0
  if (secStart < 0) {
    secDiff = new Date(endTime) / 1000 + Math.abs(secStart)
  } else {
    secDiff = ~~((new Date(endTime) - new Date(startTime)) / 1000)
  }
  let randSec = tools.rnd(0, secDiff)
  let resultSec = (new Date(startTime)).getTime() + randSec * 1000
  return new Date(resultSec).date2Str()
}

function randfirstName () {
  return randData(aFirst, 1)
}
function randSecName () {
  return randData(aSecond, tools.rnd(1, 2))
}
// 随机生成姓名，长度为2或3
function randName () {
  return `${randfirstName()}${randSecName()}`
}

// 随机生成颜色,参数二选一[null or rgba]
function randColor (colorType) {
  if (colorType === 'rgba') {
    let a = []
    for (let i = 0; i < 3; i++) {
      a.push(tools.rnd(0, 255))
    }
    a.push(Math.round(Math.random() * 10) / 10)
    return `rgba(${a[0]},${a[1]},${a[2]},${a[3]})`
  } else {
    return `#${randData('0123456789abcdef', 6)}`
  }
}

// 随机生成价格
function price (beforeDot, afterDot) {
  return `${randNum(beforeDot)}.${randNum(afterDot)}`
}

// 随机生成长度为n的小写字母+数字
function smallAndNum (n) {
  n = Number(n) || 1
  return randData('0123456789abcdefghijklmnopqrstuvwxyz', n)
}

// 随机生成url,a为域名长度
function randUrl (n) {
  n = Number(n) || 1
  return `http://www.${smallAndNum(tools.rnd(1, n))}.com/`
}

// 随机生成ip地址
function randIp () {
  let aIp = []
  for (let i = 0; i < 4; i++) {
    aIp.push(tools.rnd(0, 255))
  }
  return aIp.join('.')
}

// 随机生成中国手机号

// 手机号码
let mobile = [
  [134, 135, 136, 137, 138, 139, 147, 148, 150, 151, 152, 157, 158, 159, 172, 178, 182, 183, 184, 187, 188, 198], // 移动
  [130, 131, 132, 145, 146, 155, 156, 166, 171, 175, 176, 185, 186], // 联通
  [133, 149, 153, 173, 174, 177, 180, 181, 189, 199]// 电信
]

function whichNetwork (s) {
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
  let adrsCodeLen = adrsCodeArr.length
  let sIdNum = adrsCodeArr[tools.rnd(0, adrsCodeLen - 1)]
  let iNow = new Date().date2Str().substring(0, 10)
  let sr = randTime('1900-01-01', iNow).substring(0, 10)
  sIdNum += sr.substring(0, 10).replace(/-/ig, '')
  sIdNum += randNum(3)
  // 加权因子
  let coefficientArray = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  // 校验码
  let lastNumberArray = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
  let a = sIdNum.split('')
  let total = 0
  for (let i = 0, l = a.length; i < l; i++) {
    total += parseInt(a[i]) * coefficientArray[i]
  }
  return sIdNum + lastNumberArray[total % 11]
}
module.exports = {
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
