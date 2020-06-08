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
function PCA (data, threshold = 0.95, normfunc = util.none) {
  let arr = util.cov($M.mat.transpose(data))
  let qMatrx = SVD(arr)
  let mainFactorLen = findMainFactor(qMatrx.q, threshold)

  let transData = $M.mat.mul(
    util.meanStandard(normfunc(data)).meanMat,
    qMatrx.u.map(x => x.slice(0, mainFactorLen))
  )
  return {
    mat: transData,
    mainFactorLen,
    u: qMatrx.u,
    q: qMatrx.q,
    v: qMatrx.v
  }
}
/*
const PCA_old = function (data, threshold = 0.95, normfunc = util.none) {
  // 求协方差矩阵
  let { meanArr, meanMat } = util.meanStandard(data)

  let meanMatNorm = normfunc(meanMat)
  let covMovieDim = $M.mat.scalar(
    $M.mat.mul(
      meanMatNorm, // 数据中心化
      $M.mat.transpose(meanMatNorm)
    ),
    1 / data[0].length
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
    mainFactorLen,
    meanMat,
    meanArr,
    u: qMatrx.u,
    q: qMatrx.q,
    v: qMatrx.v
  }
}
*/
module.exports = PCA
