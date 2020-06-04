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
  let [meanArr, meanMat] = util.meanStandard(data)
  let covMovieDim = $M.mat.scalar(
    $M.mat.mul(
      meanMat, // 数据中心化
      $M.mat.transpose(meanMat)
    ),
    1 / (data[0].length - 1)
  )
  // 奇异值分解
  let qMatrx = SVD(covMovieDim)
  // 自动发现最佳主因素，默认损失率<=5%
  let mainFactorLen = findMainFactor(qMatrx.q, threshold)
  let mainFactorVec = qMatrx.q.slice(0, mainFactorLen)

  let matNew = $M.mat.mul(
    qMatrx.u.map(it => it.slice(0, mainFactorLen)),
    $M.mat.identity(mainFactorLen).map((x, idx) => {
      x[idx] = mainFactorVec[idx]
      return x
    })
  )
  return {
    mat: matNew.map(it => it.slice(0, mainFactorLen)),
    meanArr: meanArr,
    u: qMatrx.u,
    q: qMatrx.q,
    v: qMatrx.v
  }
}
module.exports = PCA

/* 投影到主轴
  let q2 = $M.mat.mul(
    q,
    $M.mat.transpose(qMatrx.v.map(it => it.slice(0, 2)))
  )*/
