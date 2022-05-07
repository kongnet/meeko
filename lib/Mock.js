'use strict'
// @ts-check
const tools = require('./tools/index')
const fake = require('./fake/index')

/**
 * @namespace Mock
 */

function genEnum (a = []) {
  /**
   * @memberof Mock#
   * @param {Array} a - 数组
   * @description 随机获取数组中元素
   * @function genEnum
   * @return {string}
   * @example
   * genEnum([2, 1, 8.1, 3, 4, 5.1, 6.7])
   * // 3
   */

  return a[tools.rnd(0, a.length - 1)]
}
function genBool () {
  /**
   * @memberof Mock#
   * @description 随机bool值
   * @function genBool
   * @return {number}
   * @example
   * genBool()
   * // 1
   */

  return genEnum([0, 1])
}
function genWord (n = 1) {
  /**
   * @memberof Mock#
   * @description n个随机汉字
   * @param {number} n - 汉字个数
   * @function genWord
   * @return {string}
   * @example
   * genWord(5)
   * // 用们生到作
   */

  const word =
    '的一是在不了有和人这中大为上个国我以要他时来用们生到作地于出就分对成会可主发年动同工也能下过子说产种面而方后多定行学法所民得经十三之进着等部度家电力里如水化高自二理起小物现实加量都两体制机当使点从业本去把性好应开它合还因由其些然前外天政四日那社义事平形相全表间样与关各重新线内数正心反你明看原又么利比或但质气第向道命此变条只没结解问意建月公无系军很情者最立代想已通并提直题党程展五果料象员革位入常文总次品式活设及管特件长求老头基资边流路级少图山统接知较将组见计别她手角期根论运农指几九区强放决西被干做必战先回则任取据处队南给色光门即保治北造百规热领七海口东导器压志世金增争济阶油思术极交受联什认六共权收证改清己美再采转更单风切打白教速花带安场身车例真务具万每目至达走积示议声报斗完类八离华名确才科张信马节话米整空元况今集温传土许步群广石记需段研界拉林律叫且究观越织装影算低持音众书布复容儿须际商非验连断深难近矿千周委素技备半办青省列习响约支般史感劳便团往酸历市克何除消构府称太准精值号率族维划选标写存候毛亲快效斯院查江型眼王按格养易置派层片始却专状育厂京识适属圆包火住调满县局照参红细引听该铁价严龙飞'
  return fake.randData(word, n)
}
function genText (n = 20) {
  /**
   * @memberof Mock#
   * @description n个随机汉字
   * @param {number} n - 汉字个数
   * @function genText
   * @return {string}
   * @example
   * genText(5) //默认是长度为20的一段文字
   * // 用社员际个
   */

  if (n >= 20) {
    const len1 = ~~(n / 3)
    const len2 = ~~((n - len1) / 2)
    const len3 = n - len1 - len2 - 3
    return genWord(len1) + '，' + genWord(len2) + '，' + genWord(len3) + '。'
  }
  return genWord(n)
}
function genConstellation () {
  /**
   * @memberof Mock#
   * @description 随机星座
   * @function genConstellation
   * @return {string}
   * @example
   * genConstellation()
   * // 狮子座
   */

  return genEnum(['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'])
}
function genBeautyText () {
  /**
   * @memberof fake#
   * @description 随机抽取一句唯美句子
   * @function genBeautyText
   * @return {String}
   * @example
   * console.log($.fake.genBeautyText())
   */

  const text = require('./fake/beautySentence.json')
  return text.pick()
}
const extObj = {
  genUUID: tools.uuid,
  genDatetime: function (startTime, endTime) {
    /**
     * @memberof Mock#
     * @description 在某一时间段内随机生成日期,"2013-02-15 21:00:00",返回值类型为字符串
     * @function genDatetime
     * @param {String|Date} startTime - 开始时间
     * @param {String|Date} endTime - 结束时间
     * @return {String}
     * @example
     * console.log($.fake.randTime("2013-02-15 21:00:00", "2014-02-15 21:00:00"))
     */

    return fake.randTime(startTime, endTime)
  },
  genData: function (o = 'abcdefghijklmnopqrstuvwxyz', n = 10) {
    /**
     * @memberof Mock#
     * @description 随机生成长度为n的字符串
     * @function randData
     * @param {Number} o - 数据源
     * @param {Number} n - 长度
     * @return {String}
     * @example
     * console.log($.fake.randData(0,10))
     */

    return fake.randData(o, n)
  },
  genName: function (params) {
    /**
     * @memberof Mock#
     * @description 随机生成姓名,长度为2或3
     * @function randName
     * @return {String}
     * @example
     * console.log($.fake.randName())
     */

    return fake.randName(params)
  },
  genCard: function (params) {
    /**
     * @memberof Mock#
     * @description 随机生成中国身份证号码
     * @function idCard
     * @return {String}
     * @example
     * console.log($.fake.idCard())
     */

    return fake.idCard(params)
  },
  genIp: function (params) {
    /**
     * @memberof Mock#
     * @description 随机生成ip地址
     * @function randIp
     * @return {String}
     * @example
     * console.log($.fake.randIp())
     */

    return fake.randIp(params)
  },
  genUrl: function (params) {
    /**
     * @memberof Mock#
     * @description 随机生成url
     * @function randUrl
     * @param {Number} n - 域名长度
     * @return {String}
     * @example
     * console.log($.fake.randUrl(12))
     */

    return fake.randUrl(params)
  },
  genPhone: function (params) {
    /**
     * @memberof Mock#
     * @description 随机生成中国手机号
     * @function phoneNum
     * @return {String}
     * @example
     * console.log($.fake.phoneNum())
     */

    return fake.phoneNum(params)
  },
  genColor: function (params) {
    /**
     * @memberof Mock#
     * @description 随机生成颜色,
     * @function randColor
     * @param {String | null} colorType - 参数二选一  [null|'rgba']
     * @return {String}
     * @example
     * console.log($.fake.randColor('rgba'))
     */

    return fake.randColor(params)
  },
  genImg: fake.genImg,
  genWord: genWord,
  genText: genText,
  genConstellation: genConstellation,
  genBool: genBool,
  genEnum: genEnum,
  genBeautyText: genBeautyText,
  genList: function (length, step = 1) {
    return Array.from({ length }, (_, index) => index * step)
  }
}
module.exports = extObj
