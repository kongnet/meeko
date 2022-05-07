'use strict'

const tools = require('../tools/index')
const color = require('../color.js')

let [r, aFirst, aSecond, addrCodeArr] = [null, null, null, null]
// 身份证加权因子
const coefficientArray = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
// 身份证校验码
const lastNumberArray = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
function loadFakeFile () {
  if (addrCodeArr) {
    return
  }
  const rst = require('./fakeResource.json')
  /*
  r = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'fakeResource.dat'), 'utf-8')
  )
  */
  aFirst = rst.firstName.split('')
  aSecond = rst.secondName.split('')
  addrCodeArr = rst.addressCode
}

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

  loadFakeFile()
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

  loadFakeFile()
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
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${svgObj.width}" height="${svgObj.height}" viewBox="0 0 ${svgObj.width} ${svgObj.height}" preserveAspectRatio="none">
  <rect width="${svgObj.width}" height="${svgObj.height}" fill="${svgObj.bg}" />
  <text text-anchor="start" x="10" y="20" style="fill:${svgObj.fc};font-size:${svgObj.fs}px;font-family:Helvetica,sans-serif;dominant-baseline:central">${svgObj.text}</text>
  <text text-anchor="middle" x="${svgObj.textX}" y="${svgObj.textY}" style="fill:${svgObj.fc};font-size:${svgObj.fs}px;font-family:Helvetica,sans-serif;dominant-baseline:central">${svgObj.size}</text>
  </svg>`
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
  [134, 135, 136, 137, 138, 139, 144, 147, 148, 150, 151, 152, 157, 158, 159, 172, 178, 182, 183, 184, 187, 188, 195, 198], // 移动
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

  s = s.slice(0, 3)
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
  loadFakeFile()
  const addrCodeLen = addrCodeArr.length / 2
  let sIdNum = addrCodeArr[tools.rnd(0, addrCodeLen - 1) * 2]
  while (sIdNum % 100 === 0) {
    sIdNum = addrCodeArr[tools.rnd(0, addrCodeLen - 1) * 2]
  }
  const iNow = new Date().date2Str().slice(0, 10)
  const sr = randTime('1900-01-01', iNow).slice(0, 10)
  sIdNum += sr.slice(0, 10).replace(/-/gi, '')
  sIdNum += randNum(2) + randData('01', 1)

  const a = sIdNum.split('')
  let total = 0
  for (let i = 0, l = a.length; i < l; i++) {
    total += parseInt(a[i], 10) * coefficientArray[i]
  }
  return sIdNum + lastNumberArray[total % 11]
}

const checkIdCard = {
  /* 每位加权因子 */

  powers: coefficientArray,

  /* 第18位校检码 */

  parityBit: lastNumberArray,

  /* 性别 */

  genders: { male: '男', female: '女' },

  /* 校验地址码 */

  checkAddressCode: function (addressCode) {
    loadFakeFile()
    return addrCodeArr.includes(+addressCode)
  },

  /* 校验日期码 */

  checkBirthDayCode: function (birDayCode) {
    const yyyy = parseInt(birDayCode.slice(0, 4), 10)
    const mm = parseInt(birDayCode.slice(4, 6), 10)
    const dd = parseInt(birDayCode.slice(6), 10)
    const xdata = new Date(yyyy, mm - 1, dd)
    if (xdata > new Date()) {
      return false // 生日不能大于当前日期
    } else if (xdata.getFullYear() == yyyy && xdata.getMonth() == mm - 1 && xdata.getDate() == dd) {
      return true
    } else {
      return false
    }
  },

  /* 计算校检码 */

  getParityBit: function (idCardNo) {
    const id17 = idCardNo.slice(0, 17)

    /* 加权 */

    let power = 0
    for (let i = 0; i < 17; i++) {
      power += parseInt(id17.charAt(i), 10) * parseInt(checkIdCard.powers[i])
    }

    /* 取模 */

    const mod = power % 11
    return checkIdCard.parityBit[mod]
  },

  /* 验证校检码 */

  checkParityBit: function (idCardNo) {
    const parityBit = idCardNo.charAt(17).toUpperCase()
    return checkIdCard.getParityBit(idCardNo) == parityBit
  },

  /* 校验15位或18位的身份证号码 */

  check: function (idCardNo) {
    // 15位和18位身份证号码的基本校验
    const check = /^(\d{15}|\d{17}(\d|x|X))$/.test(idCardNo)
    if (!check) {
      return false
    }
    // 判断长度为15位或18位
    if (idCardNo.length == 15) {
      return checkIdCard.check15IdCardNo(idCardNo)
    } else if (idCardNo.length == 18) {
      return checkIdCard.check18IdCardNo(idCardNo)
    } else {
      return false
    }
  },

  // 校验15位的身份证号码
  check15IdCardNo: function (idCardNo) {
    // 15位身份证号码的基本校验
    let check = /^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2]\d)|(3[0-1]))\d{3}$/.test(idCardNo)
    if (!check) {
      return false
    }
    // 校验地址码
    const addressCode = idCardNo.slice(0, 6)
    check = checkIdCard.checkAddressCode(addressCode)
    if (!check) {
      return false
    }
    const birDayCode = '19' + idCardNo.slice(6, 12)
    // 校验日期码
    return checkIdCard.checkBirthDayCode(birDayCode)
  },

  // 校验18位的身份证号码
  check18IdCardNo: function (idCardNo) {
    // 18位身份证号码的基本格式校验
    let check = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2]\d)|(3[0-1]))\d{3}(\d|x|X)$/.test(idCardNo)
    if (!check) {
      return false
    }
    // 校验地址码
    const addressCode = idCardNo.slice(0, 6)
    check = checkIdCard.checkAddressCode(addressCode)
    if (!check) {
      return false
    }
    // 校验日期码
    const birDayCode = idCardNo.slice(6, 14)
    check = checkIdCard.checkBirthDayCode(birDayCode)
    if (!check) {
      return false
    }
    // 验证校检码
    return checkIdCard.checkParityBit(idCardNo)
  },

  formateDateCN: function (day) {
    const yyyy = day.slice(0, 4)
    const mm = day.slice(4, 6)
    const dd = day.slice(6)
    return yyyy + '-' + mm + '-' + dd
  },

  // 获取信息
  getInfo: function (idCardNo) {
    const idCardInfo = {
      gender: '', // 性别
      birthday: '' // 出生日期(yyyy-mm-dd)
    }
    if (idCardNo.length == 15) {
      const aday = '19' + idCardNo.slice(6, 12)
      idCardInfo.birthday = checkIdCard.formateDateCN(aday)
      if (parseInt(idCardNo.charAt(14)) % 2 == 0) {
        idCardInfo.gender = checkIdCard.genders.female
      } else {
        idCardInfo.gender = checkIdCard.genders.male
      }
    } else if (idCardNo.length == 18) {
      const aday = idCardNo.slice(6, 14)
      idCardInfo.birthday = checkIdCard.formateDateCN(aday)
      if (parseInt(idCardNo.charAt(16)) % 2 == 0) {
        idCardInfo.gender = checkIdCard.genders.female
      } else {
        idCardInfo.gender = checkIdCard.genders.male
      }
    }
    const address = idCardNo.slice(0, 6)
    idCardInfo.place = [
      addrCodeArr[addrCodeArr.indexOf(+(address.slice(0, 2) + '0000')) + 1],
      addrCodeArr[addrCodeArr.indexOf(+(address.slice(0, 4) + '00')) + 1],
      addrCodeArr[addrCodeArr.indexOf(+address) + 1]
    ].join(',')
    return idCardInfo
  },

  /* 18位转15位 */

  getId15: function (idCardNo) {
    if (idCardNo.length == 15) {
      return idCardNo
    } else if (idCardNo.length == 18) {
      return idCardNo.slice(0, 6) + idCardNo.slice(8, 17)
    } else {
      return null
    }
  },

  /* 15位转18位 */

  getId18: function (idCardNo) {
    if (idCardNo.length == 15) {
      const id17 = idCardNo.slice(0, 6) + '19' + idCardNo.slice(6)
      const parityBit = checkIdCard.getParityBit(id17)
      return id17 + parityBit
    } else if (idCardNo.length == 18) {
      return idCardNo
    } else {
      return null
    }
  }
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
  checkIdCard,
  whichNetwork // 手机号码是那个服务商
}
