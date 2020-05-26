/* global describe */
/* global it */
'use strict'
const $ = require('../index')
const assert = require('assert')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}
describe('距离/相似度函数', () => {
  it('Euclidean Distance(欧式距离)', () => {
    assertLog(
      $.math.dist.euclidean([1, 1, 2, 2], [2, 2, 4, 4]),
      3.1622776601683795
    )
  })
  it('Standardized Euclidean Distance(标准化欧氏距离)', () => {
    assertLog(
      $.math.dist.euclideans([1, 2, 1, 2], [3, 3, 3, 4]),
      0.756109193752849
    )
  })
  it('ManhattanDistance(曼哈顿距离)', () => {
    assertLog($.math.dist.manhattan([1, 1, 2, 2], [2, 2, 4, 4]), 6)
  })
  it('Chebyshev Distance(切比雪夫距离)', () => {
    assertLog($.math.dist.chebyshevn([1, 1, 1, 1], [3, 4, 3, 4]), 3)
  })
  it('HammingDistance/Edit Distance(汉明距离/编辑距离)', () => {
    assertLog($.math.dist.hamming([1, 1, 1, 1], [3, 4, 3, 4]), 4)
  })
  it('杰卡德相似系数', () => {
    assertLog(
      $.math.dist.jaccardCoefficient([1, 2, 3, 8, 9, 0], [2, 3, 4, 0, 0, 0]),
      0.42857142857142855
    )
  })
  it('杰卡德距离', () => {
    assertLog(
      $.math.dist.jaccardDistance([1, 2, 3, 8, 9, 0], [1, 3, 4, 3, 0, 0]),
      0.5714285714285714
    )
  })
  it('Cos(Cosine 余弦)相似度', () => {
    assertLog($.math.dist.cosn([1, 1, 1, 1], [2, 2, 2, 3]), 0.9819805060619657)
  })
})
