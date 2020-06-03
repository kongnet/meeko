/**
 * @namespace Math_prototype
 */
let $M = require('../math')
let util = require('./util')
let SVD = require('./Svd')
function findMainFactor (a, percent = 0.95) {
  let sum = $M.sum(a)
  let cumulat = 0
  for (let i = 0; i < a.length; i++) {
    cumulat += a[i]
    if (cumulat / sum >= percent) return i + 1
  }
  return a.length
}
const PCA = function (data, threshold = 0.95) {
  // 求协方差矩阵
  let covMovieDim = $M.mat.scalar(
    $M.mat.mul(
      util.meanStandard(data),
      $M.mat.transpose(util.meanStandard(data))
    ),
    1 / data[0].length
  )
  // 奇异值分解
  let qMatrx = SVD(covMovieDim)
  let mainFactorLen = findMainFactor(qMatrx.q, threshold)
  let mainFactorVec = qMatrx.q.slice(0, mainFactorLen)

  let q1 = $M.mat.mul(
    qMatrx.u.map(it => it.slice(0, 2)),
    $M.mat.identity(2).map((x, idx) => {
      x[idx] = mainFactorVec[idx]
      return x
    })
  )
  return q1.map(it => it.slice(0, 2))
}
module.exports = PCA

/* 投影到主轴
  let q2 = $M.mat.mul(
    q1,
    $M.mat.transpose(qMatrx.v.map(it => it.slice(0, 2)))
  )*/
