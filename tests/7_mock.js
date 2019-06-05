/* istanbul ignore next */

'use strict'
const $ = require('../index')
const Mock = require('mockjs')

Mock.Random.extend($.Mock)

let data = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'list|1-2': [{
    // 属性 id 是一个自增数，起始值为 1，每次增 1
    'id|+1': 100,
    'name': `@genName`,
    str: `@genData('abcdefghijklmnopqrstuvwxyz',10)`,
    datetime: `@genDatetime('2016-1-1', '2016-2-2')`,
    card: `@genCard`,
    url: `@genUrl(5)`,
    phoneNum: `@genPhone`,
    color: `@genColor`,
    colorRGBA: `@genColor('rgba')`,
    ip: `@genIp`,
    word: '@genWord(10)',
    word0: '@genWord',
    sentence: `@genText(20)`,
    sentence20: `@genText(20)`,
    sentence10: `@genText(10)`,
    sentence0: `@genText`,
    constellation: `@genConstellation`,
    bool: `@genBool`,
    genEnum1: `@genEnum(['5',6,7])`, // NOTICE key不能和函数名一样
    genEnum0: `@genEnum`,
    genEnum2: `@genEnum(['5x','6x','7x'])`,
    genEnum3: `@genEnum([[],null,''])`,
    img: `@genEnum(['https://','http://'])/resource.aijiatui.com/@genData('0123456789',11)/company/moments/@genData('abcdefghijklmnopqrstuvwxyz0123456789',32).jpeg`,
    skuCode: null
  }]
})
$.dir(data)
