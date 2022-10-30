'use strict'
const $ = require('../index')
const assert = require('assert')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}
describe('NaiveBayes单元测试', function () {
  it('NaiveBayes', function () {
    const nb = new $.ml.NaiveBayes()
    nb.learn('明天中午一起去吃饭吧？', '正常信息')
    nb.learn('您的验证码是 0944', '正常信息')

    nb.learn('最后一周 | K8S教程 强势加入，全新 运维分析师 课程开始报名！', '垃圾信息')
    nb.learn('《程序员日志》第2期：阿里云发布机器学习平台2.0，全面拥抱开源！', '垃圾信息')
    nb.learn('最新话题：如何做一名合格的前端程序员？需要点亮哪些技能树？', '垃圾信息')
    nb.learn('学生专享|云翼计划来袭，海外节点全面降价，云服务器惊爆价30元/月起，全网促销  ¥30/月', '垃圾信息')
    nb.learn('不要错过您账户中的天猫优惠券！', '垃圾信息')
    nb.learn('阿里云，各类云产品促销优惠升级公告', '垃圾信息')

    // 判断分类
    assertLog(nb.categorize('昨天的功能上线了嘛？'), '正常信息')
    assertLog(nb.categorize('身体如何了，怎么不回消息？！'), '正常信息')
    assertLog(nb.categorize('华为Pro30全面降价啦！'), '垃圾信息')
    assertLog(nb.categorize('当当618大促销！更有优惠学生场'), '垃圾信息')
    $.log(nb.toJson().options)
    $.log(new $.ml.NaiveBayes(null))
    $.log(new $.ml.NaiveBayes([]))
    $.log(new $.ml.NaiveBayes('x'))
    $.log(new $.ml.NaiveBayes({}))
    $.ml.NaiveBayes.fromJson({})
    $.ml.NaiveBayes.fromJson('{}')
  })
})
