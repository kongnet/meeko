/* istanbul ignore next */

'use strict'
const $ = require('../index')
const assert = require('assert')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}
const Mock = require('mockjs')

Mock.Random.extend($.Mock)

const data = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'list|2-2': [
    {
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      'id|+1': 100,
      name: '@genName',
      str: "@genData('abcdefghijklmnopqrstuvwxyz',10)",
      datetime: "@genDatetime('2016-1-1', '2016-2-2')",
      card: '@genCard',
      url: '@genUrl(5)',
      phoneNum: '@genPhone',
      color: '@genColor',
      colorRGBA: "@genColor('rgba')",
      ip: '@genIp',
      word: '@genWord(10)',
      word0: '@genWord',
      sentence: '@genText(20)',
      sentence20: '@genText(20)',
      sentence10: '@genText(10)',
      sentence0: '@genText',
      sentence1: '@genBeautyText',
      constellation: '@genConstellation',
      bool: '@genBool',
      genEnum1: "@genEnum(['5',6,7])", // NOTICE key不能和函数名一样
      genEnum0: '@genEnum',
      genEnum2: "@genEnum(['5x','6x','7x'])",
      status: "@genEnum([[],null,''])",
      img: "@genEnum(['https://','http://'])/resource.aijiatui.com/@genData('0123456789',11)/company/moments/@genData('abcdefghijklmnopqrstuvwxyz0123456789',32).jpeg",
      skuCode: null,
      arrList: '@genList(10)',
      arrList2: '@genList(10,2)',
      svg: '@genImg()',
      svg1: '@genImg({isText:"n"})',
      svg2: '@genImg({size:"100"})'
    }
  ]
})

describe('Mock数据', function () {
  it('Mock数据', function () {
    $.dir(data)
  })
})
// 真实的例子
// $.dir({ 'code': 0, 'errorCode': null, 'msg': null, 'data': { 'reqEndPoint': null, 'companyId': null, 'loginName': null, 'userId': null, 'cardId': null, 'appId': null, 'openId': null, 'unionId': null, 'scenes': null, 'departmentId': null, 'departmentName': null, 'customerMobile': null, 'companyName': null, 'cardName': null, 'userName': null, 'oldCompanyId': null, 'activity': { 'activityId': '576361380488151040', 'companyId': '487691313471291392', 'productId': '522089653373763584', 'productName': 'test4', 'imageUrl': 'https://resource.xxxx.com/13632945694/company/mall/banner/1106b0659649e9252f6e9d026dfb24a6.jpeg', 'startTime': '1557417600000', 'startTimeStr': '2019-05-10 00:00:00', 'endTime': '1560960000000', 'endTimeStr': '2019-06-20 00:00:00', 'peopleNumber': 2, 'validityTime': 90, 'salesAmount': 0, 'activityPrice': 400, 'singlePrice': 300, 'serviceText': '[{"title":"拼图","content":"拼图"},{"title":"qwe","content":"QWEQW"}]', 'attrText': 'null', 'status': 1, 'createTime': '1557456861404', 'createTimeStr': '2019-05-10 10:54:21', 'updateTime': '1558483038285', 'updateTimeStr': '2019-05-22 07:57:18', 'activityState': 1, 'marketPrice': null, 'ordinaryPrice': null }, 'product': [{ 'id': '576361380697866240', 'productId': '522089653373763584', 'skuCode': null, 'attrSpecValue': '', 'activityPrice': 400, 'singlePrice': 300, 'activityStock': 4, 'createTime': '1557456861445', 'createTimeStr': '2019-05-10 10:54:21', 'updateTime': '1558298334267', 'updateTimeStr': '2019-05-20 04:38:54', 'activityId': null, 'productSkuId': '575029724334522368', 'specItemIds': null }] }, 'total': 0 })
