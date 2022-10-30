'use strict'
const $ = require('../index')
const assert = require('assert')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}

const rawData = [
  -1,
  9.545351287,
  -0.99,
  1.541288252,
  -0.98,
  -3.462548306,
  -0.97,
  -6.466114992,
  -0.96,
  -8.469369931,
  -0.95,
  -2.472272957,
  -0.94,
  7.52521421,
  -0.93,
  -6.476872198,
  -0.92,
  4.521501859,
  -0.91,
  5.520368101,
  -0.9,
  4.519755805,
  -0.89,
  -1.480308288,
  -0.88,
  -7.479800069,
  -0.87,
  4.521301872,
  -0.86,
  6.523016186,
  -0.85,
  2.525358713,
  -0.84,
  4.528342453,
  -0.83,
  9.531977547,
  -0.82,
  5.536271262,
  -0.81,
  0.541227998,
  -0.8,
  1.546849305,
  -0.79,
  7.553133902,
  -0.78,
  -6.439922281,
  -0.77,
  4.567673943,
  -0.76,
  -7.424086931,
  -0.75,
  -6.415217029,
  -0.74,
  -6.405731028,
  -0.73,
  -7.395646071,
  -0.72,
  -8.38498168,
  -0.71,
  -1.373759655,
  -0.7,
  -6.362003973,
  -0.69,
  6.650259322,
  -0.68,
  5.663002235,
  -0.67,
  9.676194946,
  -0.66,
  -0.310194074,
  -0.65,
  3.703802078,
  -0.64,
  8.718148863,
  -0.63,
  5.732810439,
  -0.62,
  0.747749802,
  -0.61,
  -8.237071073,
  -0.6,
  7.778308911,
  -0.59,
  7.793850117,
  -0.58,
  -0.190487677,
  -0.57,
  1.825254861,
  -0.56,
  -10.15896323,
  -0.55,
  -10.14318306,
  -0.54,
  2.872554247,
  -0.53,
  -1.111792295,
  -0.52,
  7.903736604,
  -0.51,
  -1.080899355,
  -0.5,
  -0.065739921,
  -0.49,
  4.949175839,
  -0.48,
  2.963809664,
  -0.47,
  3.978124232,
  -0.46,
  -4.007916727,
  -0.45,
  5.005651691,
  -0.44,
  -1.981204325,
  -0.43,
  -3.968517199,
  -0.42,
  7.043682142,
  -0.41,
  -7.944635645,
  -0.4,
  -0.933498221,
  -0.39,
  5.077068514,
  -0.38,
  3.087040501,
  -0.37,
  8.096395595,
  -0.36,
  2.10511363,
  -0.35,
  4.113176475,
  -0.34,
  0.120568092,
  -0.33,
  7.127274574,
  -0.32,
  8.133284192,
  -0.31,
  -0.861412582,
  -0.3,
  -0.856823043,
  -0.29,
  -5.852952241,
  -0.28,
  3.150197035,
  -0.27,
  4.152624256,
  -0.26,
  -2.845668848,
  -0.25,
  7.155321702,
  -0.24,
  -4.844397884,
  -0.23,
  -8.844819185,
  -0.22,
  -9.845931605,
  -0.21,
  -0.847722404,
  -0.2,
  6.149823255,
  -0.19,
  6.146722259,
  -0.18,
  10.14299349,
  -0.17,
  6.138657761,
  -0.16,
  -7.866262246,
  -0.15,
  -2.871742055,
  -0.14,
  -0.877755474,
  -0.13,
  2.115725325,
  -0.12,
  -0.89127028,
  -0.11,
  -1.898711457,
  -0.1,
  -3.906566012,
  -0.09,
  -5.914800489,
  -0.08,
  -2.923380271,
  -0.07,
  0.067730308,
  -0.06,
  -1.941432139,
  -0.05,
  -6.950830172,
  -0.04,
  -5.96042563,
  -0.03,
  -3.970179754,
  -0.02,
  3.019946699,
  -0.01,
  6.009993334,
  7.53e-16,
  -10,
  0.01,
  8.990006666,
  0.02,
  3.980053301,
  0.03,
  -5.029820246,
  0.04,
  8.96042563,
  0.05,
  -8.049169828,
  0.06,
  -3.058567861,
  0.07,
  -3.067730308,
  0.08,
  6.923380271,
  0.09,
  -8.085199511,
  0.1,
  0.906566012,
  0.11,
  -2.101288543,
  0.12,
  8.89127028,
  0.13,
  5.884274675,
  0.14,
  -0.122244526,
  0.15,
  -7.128257945,
  0.16,
  -8.133737754,
  0.17,
  4.861342239,
  0.18,
  -0.14299349,
  0.19,
  3.853277741,
  0.2,
  -0.149823255,
  0.21,
  4.847722404,
  0.22,
  -6.154068395,
  0.23,
  -5.155180815,
  0.24,
  8.844397884,
  0.25,
  -5.155321702,
  0.26,
  -3.154331152,
  0.27,
  0.847375744,
  0.28,
  -2.150197035,
  0.29,
  9.852952241,
  0.3,
  -8.143176957,
  0.31,
  7.861412582,
  0.32,
  4.866715808,
  0.33,
  3.872725426,
  0.34,
  1.879431908,
  0.35,
  0.886823525,
  0.36,
  -5.10511363,
  0.37,
  -0.096395595,
  0.38,
  3.912959499,
  0.39,
  -9.077068514,
  0.4,
  1.933498221,
  0.41,
  3.944635645,
  0.42,
  3.956317858,
  0.43,
  -7.031482801,
  0.44,
  -4.018795675,
  0.45,
  -9.005651691,
  0.46,
  -2.992083273,
  0.47,
  5.021875768,
  0.48,
  -2.963809664,
  0.49,
  -8.949175839,
  0.5,
  10.06573992,
  0.51,
  8.080899355,
  0.52,
  -2.903736604,
  0.53,
  -6.888207705,
  0.54,
  -4.872554247,
  0.55,
  3.143183059,
  0.56,
  -7.841036772,
  0.57,
  -4.825254861,
  0.58,
  2.190487677,
  0.59,
  1.206149883,
  0.6,
  -1.778308911,
  0.61,
  7.237071073,
  0.62,
  -7.747749802,
  0.63,
  5.267189561,
  0.64,
  2.281851137,
  0.65,
  1.296197922,
  0.66,
  3.310194074,
  0.67,
  -2.676194946,
  0.68,
  -4.663002235,
  0.69,
  7.349740678,
  0.7,
  10.36200397,
  0.71,
  7.373759655,
  0.72,
  -5.61501832,
  0.73,
  2.395646071,
  0.74,
  -7.594268972,
  0.75,
  0.415217029,
  0.76,
  -8.575913069,
  0.77,
  9.432326057,
  0.78,
  7.439922281,
  0.79,
  -2.553133902,
  0.8,
  7.453150695,
  0.81,
  2.458772002,
  0.82,
  -7.536271262,
  0.83,
  -0.531977547,
  0.84,
  9.471657547,
  0.85,
  3.474641287,
  0.86,
  -5.523016186,
  0.87,
  2.478698128,
  0.88,
  -4.520199931,
  0.89,
  -0.519691712,
  0.9,
  3.480244195,
  0.91,
  5.479631899,
  0.92,
  -4.521501859,
  0.93,
  1.476872198,
  0.94,
  -6.52521421,
  0.95,
  7.472272957,
  0.96,
  4.469369931,
  0.97,
  7.466114992,
  0.98,
  -0.537451694,
  0.99,
  2.458711748
]
const polyX = []
const polyY = []
for (let i = 0; i < rawData.length; i += 2) {
  polyX.push(rawData[i])
  polyY.push(rawData[i + 1])
}
// https://wenku.baidu.com/view/cc0f9b0f52ea551810a68716.html
const smoothY = [12.9, 14.91, 15.96, 14.41, 14.57, 14.6, 15.35, 15.84, 16.9, 18.26, 17.4, 18.71, 19.53, 20.82]
const diff1 = $.math.exponentialSmoothing(smoothY)
const diff2 = $.math.exponentialSmoothing(diff1)
const diff3 = $.math.exponentialSmoothing(diff2)

// console.log(y, diff1, diff2, diff3)
describe('Math扩展函数的单元测试', () => {
  const a = [2, 1, 8.1, 3, 4, 5.1, 6.7]
  it('genRange', () => {
    assertLog($.math.genRange(0, 5, 2).join(','), [0, 2, 4].join(','))
  })
  it('sum', () => {
    assertLog($.math.sum(a).toFixed(1), '29.9')
  })
  it('approximatelyEqual', () => {
    assertLog($.math.approximatelyEqual(29.99999, 30), true)
  })
  it('num2e', () => {
    assertLog($.math.num2e(0.00000129466), '1.2947e-6')
    assertLog($.math.num2e(0.00000129466, 1), '1.3e-6')
  })
  it('hMean 调和平均数 2.742815', () => assertLog($.math.hMean(a).toFixed(6), '2.742815'))
  it('gMean 几何平均数 3.515999', () => assertLog($.math.gMean(a).toFixed(6), '3.515999'))

  it('mean (算术)平均数 4.271429', () => assertLog($.math.mean(a).toFixed(6), '4.271429'))
  it('qMean 平方平均数 4.877206', () => assertLog($.math.qMean(a).toFixed(6), '4.877206'))
  it('min 最小', () => assertLog($.math.min(a), 1))
  it('max 最大', () => assertLog($.math.max(a), 8.1))
  it('range 极值', () => assertLog($.math.range(a), 7.1))
  it('median 中位数 4', () => {
    assertLog($.math.median(a), 4)
    assertLog($.math.median([1, 2, 3, 4, 5, 6]), 3.5)
    assertLog($.math.median([1, 2, 3, 4, 5]), 3)
    assertLog($.math.median([]), NaN)
  })
  it('quantile 四分位数', () => {
    assertLog($.math.quantile(a), 4)
    assertLog($.math.quantile(a, 2), 4)
    assertLog($.math.quantile(a, 1), 2.5)
    assertLog($.math.quantile(a, 3), 5.9)
    assertLog($.math.quantile(a, 0), 1)
    assertLog($.math.quantile(a, 4), 8.1)

    assertLog($.math.quantile(a, 0, 'exec'), NaN)
    assertLog($.math.quantile(a, 4, 'exec'), NaN)
    assertLog($.math.quantile(a, 5), 4)
    assertLog($.math.quantile([6, 7, 15, 36, 39, 40, 41, 42, 43, 47, 49], 1), 25.5)
    assertLog($.math.quantile([6, 7, 15, 36, 39, 40, 41, 42, 43, 47, 49], 2), 40)
    assertLog($.math.quantile([6, 7, 15, 36, 39, 40, 41, 42, 43, 47, 49], 3), 42.5)
    assertLog($.math.quantile([1, 2, 3, 4], 1), 1.75)
    assertLog($.math.quantile([1, 2, 3, 4], 2), 2.5)
    assertLog($.math.quantile([1, 2, 3, 4], 3), 3.25)
    assertLog($.math.quantile([]), NaN)
    assertLog($.math.quantile([7], 1), 7)
    assertLog($.math.quantile([7], 2), 7)
    assertLog($.math.quantile([7], 3), 7)
    /*
       assertLog($.math.quantile([1, 2, 3, 4, 5]), 3)
    assertLog($.math.quantile([2], 1), null)

    assertLog($.math.quantile([1, 2, 3, 4, 5], 1), 3.5) */
  })
  it('quantileAll 四分位数', () => {
    assertLog(JSON.stringify($.math.quantileAll(a)), '{"min":1,"Q1":2.5,"Q2":4,"Q3":5.9,"max":8.1,"IQR":3.4000000000000004,"upper":11,"lower":-2.6000000000000005}')
  })
  it('variance 方差 5.542041', () => assertLog($.math.variance(a).toFixed(6), '5.542041'))
  it('stddev 总体标准偏差/标准差/均方差 2.354154 方差开根号', () => {
    assertLog($.math.stddev(a).toFixed(6), '2.354154')
    assertLog($.math.stddev([1, 2, 3, 4, 5]), 1.4142135623730951)
  })
  it('varianceCorrect 样本标准偏差的方差,更正方差 6.465714 n-1', () => assertLog($.math.varianceCorrect(a).toFixed(6), '6.465714'))
  it('stddevCorrect 样本标准偏差 2.542777 更正开根号', () => assertLog($.math.stddevCorrect(a).toFixed(6), '2.542777'))
  it('mean Deviation 平均偏差 2.024490', () => assertLog($.math.meanDev(a).toFixed(6), '2.024490'))
  it('medianDev 中位数偏差 1.985714', () => assertLog($.math.medianDev(a).toFixed(6), '1.985714'))
  it('Standard error 标准误差 0.961079', () => assertLog($.math.stdErr(a).toFixed(6), '0.961079'))
  it('Coefficient of Variation 变异系数/离散系数 0.551140', () => assertLog($.math.coeVariation(a).toFixed(6), '0.551140'))
  it('confidence intervals 置信区间', () => assertLog($.math.confidenceIntervals(a)[0] + $.math.confidenceIntervals(a)[1], 0.1659026888164572 + 8.376954454040686))
  /*
  $.math.linearFitting()
  $.math.exponentFitting()
  $.math.lnFitting()
  $.math.powerFitting()
  $.math.pearson()
  */
  const rst = $.math.linearFitting([1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 4, 3, 6, 9, 3, 5, 2, 5])
  it(`linearFitting ${rst.f}`, () =>
    assertLog(JSON.stringify(rst), '{"a":0.18333333333333332,"b":3.305555555555556,"r":0.04426829268292683,"f":"y=0.1833*x+3.3056 R^2=0.0443","latex":"y=0.1833\\times x+3.3056  R^{2}=0.0443"}'))

  const rst1 = $.math.exponentFitting([1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 4, 3, 6, 9, 3, 5, 2, 5])
  it(`exponentFitting ${rst1.f}`, () =>
    assertLog(
      JSON.stringify(rst1),
      '{"a":2.4241733882720133,"b":0.07811356958381002,"r":0.10831424034090119,"f":"y=2.4242*e^(0.0781*x) R^2=0.1083","latex":"y=2.4242\\times e^{ (0.0781\\times x)} R^{2}=0.1083"}'
    ))

  const rst2 = $.math.lnFitting([1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 4, 3, 6, 9, 3, 5, 2, 5])
  it(`lnFitting ${rst2.f}`, () => assertLog(JSON.stringify(rst2), '{"a":1.224733441070464,"b":2.480130419814377,"r":0.1362718140723164,"f":"y=1.2247*ln(x)+2.4801 R^2=0.1363"}'))

  const rst3 = $.math.powerFitting([1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 4, 3, 6, 9, 3, 5, 2, 5])
  it(`powerFitting ${rst3.f}`, () => assertLog(JSON.stringify(rst3), '{"a":1.8454140471460965,"b":0.46635474401809107,"r":0.26630441651302567,"f":"y=1.8454*x^0.4664 R^2=0.2663"}'))
  const rst4 = $.math.polyFitting(polyX, polyY, 6)
  it(`polyFitting ${rst4.f}`, () =>
    assertLog(
      JSON.stringify(rst4),
      '{"r":0.013006877594921203,"f":"y=7.8503*x^6-0.6815*x^5-11.8914*x^4+3.5150*x^3+6.1567*x^2-1.9026*x-0.4031 R^2=0.013","formula":["7.8503*x^6","-0.6815*x^5","-11.8914*x^4","3.5150*x^3","6.1567*x^2","-1.9026*x^1","-0.4031"]}'
    ))
})

describe('Math相关系数函数单元测试', () => {
  const rst4 = $.math.pearson([56, 97, 76, 59, 86, 62, 32, 69, 75, 79, 36, 70, 48, 57, 86, 88, 92, 85, 75, 48], [8, 45, 35, 12, 37, 24, 5, 21, 36, 32, 10, 27, 15, 19, 41, 50, 39, 42, 35, 17])
  const rst5 = $.math.pearson([2.5, 3.5, 3.0, 3.5, 2.5, 3.0], [3.0, 3.5, 1.5, 5.0, 3.5, 3.0])
  const rst51 = $.math.pearson([1, 2, 3, 4, 5, 6], [0.3, 0.9, 2.7, 2, 3.5, 5])
  it('pearson相关指数', () => {
    assertLog(rst4.toFixed(3), '0.931')
    assertLog(rst5.toFixed(3), '0.396')
    assertLog(rst51.toFixed(3), '0.948')
  })
  const rst6 = $.math.spearman([3, 1, 5, 4, 2], [4, 1, 5, 2, 3])
  it('spearman相关指数 5个人的视觉[170, 150, 210, 180, 160]、听觉反应时[180, 165, 190, 168, 172]（单位：毫秒）两个变量排序后计算', () => {
    assertLog(rst6.toFixed(1), '0.7')
  })
  const rst6_1 = $.math.spearman([5.05, 6.75, 3.21, 2.66], [1.65, 26.5, -5.93, 7.96])
  it('spearman相关指数 [5.05, 6.75, 3.21, 2.66], [1.65, 26.5, -5.93, 7.96]', () => {
    assertLog(rst6_1.toFixed(1), '0.4')
  })
  const rst7 = $.math.kendall([0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55], [1, 0.95, 0.95, 0.9, 0.85, 0.7, 0.65, 0.6, 0.55, 0.42])
  const rst8 = $.math.kendall([1, 2, 3, 4, 5, 6, 7, 8], [3, 4, 1, 2, 5, 7, 8, 6]) // 身高体重排名
  it('kendall 类似pearson 两个随机变量 可以分开获取', () => {
    assertLog(rst7.toFixed(7), '-0.9888265')
    assertLog(rst8.toFixed(3), '0.571')
  })
})
describe('Math偏度和3个峰度函数单元测试', () => {
  const a = [53, 61, 49, 66, 78, 47]
  it('skew 偏度 同excel skew 0.7826325504212567', () => assertLog($.math.skew(a).toFixed(6), '0.782633'))
  it('kurt1 峰度/峰态系数 pandas模块 Estimators of population kurtosis人口峰度 -0.2631655441038472', () => assertLog($.math.kurt1(a), -0.2631655441038472))
  it('kurt2 >3 =3 <3 峰度/峰态系数 1.7105241302560437', () => assertLog($.math.kurt2(a), 1.7105241302560437))
  it('kurt wiki上的算法 峰度/峰态系数 -0.9473710436927472', () => assertLog($.math.kurt3(a), -0.9473710436927472))
})

describe('组合数学相关函数', () => {
  it('arrangement全排列', () => assertLog($.math.arrangement(40, 4), 2193360))
  it('combination组合', () => assertLog($.math.combination(13, 4), 715))
  it('hCombin带回放的组合', () => assertLog($.math.hCombin(10, 4), 715))
  it('arrangeList数组枚举型排列输出', () => assertLog(JSON.stringify($.math.arrangeList(['x', 'y', 'z'], 3).map(x => x.join())), '["x,y,z","x,z,y","y,x,z","y,z,x","z,x,y","z,y,x"]'))
  it('combinList数组枚举型排列输出', () => assertLog(JSON.stringify($.math.combinList(['x', 'y', 'z'], 3).map(x => x.join())), '["x,y,z"]'))
  it('allList数组下标形式全组合排列输出', () =>
    assertLog(
      JSON.stringify($.math.allList(3, 3).map(x => x.join())),
      '["0,0,0","1,0,0","2,0,0","0,1,0","1,1,0","2,1,0","0,2,0","1,2,0","2,2,0","0,0,1","1,0,1","2,0,1","0,1,1","1,1,1","2,1,1","0,2,1","1,2,1","2,2,1","0,0,2","1,0,2","2,0,2","0,1,2","1,1,2","2,1,2","0,2,2","1,2,2","2,2,2"]'
    ))

  it('fac阶乘', () => {
    assertLog($.math.fac(4), 24)
    assertLog($.math.fac(0), 1)
    assertLog($.math.fac(-10), -1)
  })
})
describe('第k个最大最小', () => {
  const r = $.math.secRand(0, 10000)
  it('第k个最大最小', () => {
    assertLog($.math.largek(rawData, 6), 9.545351287)
    assertLog($.math.smallk(rawData, 6), -9.005651691)
  })
})

describe('hash函数', () => {
  const r = $.math.murmurHash('你好,世界!')
  it('murmurHash', () => {
    assertLog(r, 1008576884)
    assertLog(r.toString(2).fillStr('0', 32, -1), '00111100000111011010100101110100')
  })
})
describe('傅里叶分析', () => {
  it('傅里叶分析', () => {
    assertLog(JSON.stringify($.math.fourierAnalysis([1, 2, 1, 2, 1, 2, 1, 2])), '{"period":2.6666666666666665}')
  })
})
describe('自相关函数', () => {
  it('自相关函数', () => {
    assertLog($.math.autoCorrelation([1, 2, 1, 2, 1, 2, 1, 2]), -0.875)
    assertLog($.math.autoCorrelation([1, 2, 1, 2, 1, 2, 1, 2], 2), 0.75)
  })
})
describe('stat', () => {
  it('stat', () => {
    assertLog(
      JSON.stringify($.math.stat([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])),
      JSON.stringify({
        len: 10,
        xmean: 5.5,
        ymean: 5.5,
        sumx: 82.5,
        sumy: 82.5,
        sumxy: 82.5
      })
    )
    assertLog(
      JSON.stringify($.math.stat([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 100, 100)),
      JSON.stringify({ len: 10, xmean: 100, ymean: 100, sumx: 89385, sumy: 89385, sumxy: 89385 })
    )
  })
})
