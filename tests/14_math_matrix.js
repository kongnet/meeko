'use strict'
const $ = require('../index')
const assert = require('assert')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}
describe('矩阵基础操作', () => {
  const Ma = [
    [1, 2],
    [2, 1]
  ]
  const Mb = [
    [2, 3],
    [3, 2]
  ]
  const Mc = [
    [1, 3, 4, 0, 2, 33, 4],
    [6, 7, 8, 5, 62, 7, 8],
    [98, 7, 6, 9, 8, 7, 6],
    [54, 3, 2, 5, 4, 3, 2],
    [1, 2, 0, 4, 1, 2, 34],
    [5, 6, 7, 8, 5, 6, 78],
    [9, 8, 7, 6, 9, 8, 72]
  ]
  it('lup分解', () => {
    assertLog(JSON.stringify($.math.mat.lupDecomposition(Mb)), '[[[1,0],[0.6666666666666666,1]],[[3,2],[0,1.6666666666666667]],[[0,1],[1,0]]]')
  })

  it('复制矩阵', () => {
    assertLog(JSON.stringify($.math.mat.deepCopy(Ma)), '[[1,2],[2,1]]')
    /* assert.throws($.math.mat.deepCopy(1), {
      message: '输入必须是矩阵'
    }) */
  })
  it('矩阵转置', () => {
    assertLog(JSON.stringify($.math.mat.transpose(Ma)), '[[1,2],[2,1]]')
    assertLog(JSON.stringify($.math.mat.transpose(Mc)), '[[1,6,98,54,1,5,9],[3,7,7,3,2,6,8],[4,8,6,2,0,7,7],[0,5,9,5,4,8,6],[2,62,8,4,1,5,9],[33,7,7,3,2,6,8],[4,8,6,2,34,78,72]]')
  })
  it('加法', () => {
    assertLog(JSON.stringify($.math.mat.add(Ma, Mb)), '[[3,5],[5,3]]')
  })
  it('减法', () => {
    assertLog(JSON.stringify($.math.mat.sub(Ma, Mb)), '[[-1,-1],[-1,-1]]')
  })
  it('比例', () => {
    assertLog(JSON.stringify($.math.mat.scalar(Ma, 5)), '[[5,10],[10,5]]')
  })

  it('叉乘', () => {
    assertLog(JSON.stringify($.math.mat.mul(Ma, Mb)), '[[8,7],[7,8]]')
  })
  it('点乘', () => {
    assertLog($.math.mat.dot(Ma[0], Mb[0]), 8)
  })
  it('矩阵行列式', () => {
    assertLog($.math.mat.det(Mc), -51671040)
  })
  it('矩阵获取列', () => {
    assertLog(JSON.stringify($.math.mat.getCol(Mc, 0)), '[1,6,98,54,1,5,9]')
  })
  it('矩阵获取列', () => {
    assertLog(
      JSON.stringify(
        $.math.mat.map(Ma, function (a) {
          return a - 1
        })
      ),
      '[[0,1],[1,0]]'
    )
  })
  it('全0矩阵', () => {
    assertLog(JSON.stringify($.math.mat.zero(3, 4)), '[[0,0,0,0],[0,0,0,0],[0,0,0,0]]')
  })
  it('单位矩阵', () => {
    assertLog(JSON.stringify($.math.mat.identity(3)), '[[1,0,0],[0,1,0],[0,0,1]]')
  })
  it('高斯约旦消元法', () => {
    assertLog(
      JSON.stringify($.math.mat.GaussJordanEliminate(Mc)),
      '[[1,0,0,0,0,0,0],[0,1,0,0,0,0,0],[0,0,1,0,0,0,0],[0,0,0,1,0,0,0],[1.1102230246251565e-16,2.220446049250313e-16,0,0,1,0,0],[1.1102230246251565e-16,0,0,0,0,1,0],[7.105427357601002e-15,0,0,0,0,0,1]]'
    )
  })
  it('高斯约旦消元法求逆矩阵', () => {
    assertLog(
      JSON.stringify($.math.mat.inv(Mc)),
      '[[1,0,0,0,0,0,0],[0,1,0,0,0,0,0],[0,0,1,0,0,0,0],[0,0,0,1,0,0,0],[-1.1102230246251565e-16,-2.220446049250313e-16,0,0,1,0,0],[-1.1102230246251565e-16,0,0,0,0,1,0],[-7.105427357601002e-15,0,0,0,0,0,1]]'
    )
  })
})
