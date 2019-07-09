/* global describe */
/* global it */
'use strict'
var $ = require('../index')
let assert = require('assert')
let assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}
describe('Math扩展函数的单元测试', () => {
  let a = [2, 1, 8.1, 3, 4, 5.1, 6.7]
  it('sum', () => {
    assertLog($.math.sum(a).toFixed(1), '29.9')
  })
  it('num2e', () => {
    assertLog($.math.num2e(0.00000129466), '1.2947e-6')
    assertLog($.math.num2e(0.00000129466, 1), '1.3e-6')
  })
  it('hMean 调和平均数 2.742815', () =>
    assertLog($.math.hMean(a).toFixed(6), '2.742815')
  )
  it('gMean 几何平均数 3.515999', () =>
    assertLog($.math.gMean(a).toFixed(6), '3.515999')
  )

  it('mean (算术)平均数 4.271429', () =>
    assertLog($.math.mean(a).toFixed(6), '4.271429')
  )
  it('qMean 平方平均数 4.877206', () =>
    assertLog($.math.qMean(a).toFixed(6), '4.877206')
  )
  it('min 最小', () =>
    assertLog($.math.min(a), 1)
  )
  it('max 最大', () =>
    assertLog($.math.max(a), 8.1)
  )
  it('range 极值', () =>
    assertLog($.math.range(a), 7.1)
  )
  it('median 中位数 4', () => {
    assertLog($.math.median(a), 4)
    assertLog($.math.median([1, 2, 3, 4, 5]), 3)
    assertLog($.math.median([]), 0)
  })
  it('variance 方差 5.542041', () =>
    assertLog($.math.variance(a).toFixed(6), '5.542041')
  )
  it('stddev 总体标准偏差/标准差/均方差 2.354154 方差开根号', () => {
    assertLog($.math.stddev(a).toFixed(6), '2.354154')
    assertLog($.math.stddev([1, 2, 3, 4, 5]), 1.4142135623730951)
  })
  it('varianceCorrect 样本标准偏差的方差,更正方差 6.465714 n-1', () =>
    assertLog($.math.varianceCorrect(a).toFixed(6), '6.465714')
  )
  it('stddevCorrect 样本标准偏差 2.542777 更正开根号', () =>
    assertLog($.math.stddevCorrect(a).toFixed(6), '2.542777')
  )
  it('mean Deviation 平均偏差 2.024490', () =>
    assertLog($.math.meanDev(a).toFixed(6), '2.024490')
  )
  it('medianDev 中位数偏差 1.985714', () =>
    assertLog($.math.medianDev(a).toFixed(6), '1.985714')
  )
  it('Standard error 标准误差 0.961079', () =>
    assertLog($.math.stdErr(a).toFixed(6), '0.961079')
  )
  it('Coefficient of Variation 变异系数/离散系数 0.551140', () =>
    assertLog($.math.coeVariation(a).toFixed(6), '0.551140')
  )
  it('confidence intervals 置信区间', () =>
    assertLog($.math.confidenceIntervals(a)[0] + $.math.confidenceIntervals(a)[1], 0.1659026888164572 + 8.376954454040686)
  )
  /*
  $.math.linearFitting()
  $.math.exponentFitting()
  $.math.lnFitting()
  $.math.powerFitting()
  $.math.pearson()
  */
  let rst = $.math.linearFitting([1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 4, 3, 6, 9, 3, 5, 2, 5])
  it(`linearFitting ${rst.f}`, () =>
    assertLog(JSON.stringify(rst), `{"a":0.18333333333333332,"b":3.305555555555556,"r":0.04426829268292683,"f":"y=0.1833*x+3.3056 R^2=0.0443"}`)
  )

  let rst1 = $.math.exponentFitting([1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 4, 3, 6, 9, 3, 5, 2, 5])
  it(`exponentFitting ${rst1.f}`, () =>
    assertLog(JSON.stringify(rst1), `{"a":2.4241733882720133,"b":0.07811356958381002,"r":0.10831424034090119,"f":"y=2.4242*e^(0.0781*x) R^2=0.1083"}`)
  )

  let rst2 = $.math.lnFitting([1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 4, 3, 6, 9, 3, 5, 2, 5])
  it(`lnFitting ${rst2.f}`, () =>
    assertLog(JSON.stringify(rst2), `{"a":1.224733441070464,"b":2.480130419814377,"r":0.1362718140723164,"f":"y=1.2247*ln(x)+2.4801 R^2=0.1363"}`)
  )

  let rst3 = $.math.powerFitting([1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 4, 3, 6, 9, 3, 5, 2, 5])
  it(`powerFitting ${rst3.f}`, () =>
    assertLog(JSON.stringify(rst3), `{"a":1.8454140471460965,"b":0.46635474401809107,"r":0.26630441651302567,"f":"y=1.8454*x^0.4664 R^2=0.2663"}`)
  )
  let rst4 = $.math.pearson([56, 97, 76, 59, 86, 62, 32, 69, 75, 79, 36, 70, 48, 57, 86, 88, 92, 85, 75, 48], [8, 45, 35, 12, 37, 24, 5, 21, 36, 32, 10, 27, 15, 19, 41, 50, 39, 42, 35, 17])
  let rst5 = $.math.pearson([2.5, 3.5, 3.0, 3.5, 2.5, 3.0], [3.0, 3.5, 1.5, 5.0, 3.5, 3.0])
  it(`pearson相关指数`, () => {
    assertLog(rst4.toFixed(3), '0.931')
    assertLog(rst5.toFixed(3), '0.396')
  })
})

describe('Math偏度和3个峰度函数单元测试', () => {
  let a = [53, 61, 49, 66, 78, 47]
  it('skew 偏度 pandas模块 0.7826325504212567', () =>
    assertLog($.math.skew(a).toFixed(6), '0.782633')
  )
  it('kurt1 峰度/峰态系数 pandas模块 Estimators of population kurtosis人口峰度 -0.2631655441038472', () =>
    assertLog($.math.kurt1(a), -0.2631655441038472)
  )
  it('kurt2 >3 =3 <3 峰度/峰态系数 1.7105241302560437', () =>
    assertLog($.math.kurt2(a), 1.7105241302560437)
  )
  it('kurt wiki上的算法 峰度/峰态系数 -0.9473710436927472', () =>
    assertLog($.math.kurt3(a), -0.9473710436927472)
  )
})
