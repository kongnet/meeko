/* istanbul ignore file */
// @ts-check
/**
 * @namespace Math_prototype
 */

const $M = require('../math')
const util = require('./util')

const SVD = require('./Svd')
function findMainFactor (a, percent = 0.95) {
  const sum = $M.sum(a)
  let cumulat = 0
  for (let i = 0; i < a.length; i++) {
    cumulat += a[i]
    if (cumulat / sum >= percent) {
      return i + 1
    }
  }
  return a.length
}

/**
 *
 * @param {Array} data
 * @param {Number} threshold
 * @param {Function} normfunc
 */

function PCA (data, threshold = 0.95, normfunc = util.none) {
  // 求协方差矩阵
  const arr = util.cov($M.mat.transpose(data))
  const qMatrx = SVD(arr)
  const mainFactorLen = findMainFactor(qMatrx.q, threshold) // 自动发现最佳主因素，默认损失率<=5%

  const transData = $M.mat.mul(
    util.meanStandard(normfunc(data)).meanMat, // 数据中心化
    qMatrx.u.map(x => x.slice(0, mainFactorLen)) // 奇异值分解
  )
  return {
    mat: transData,
    mainFactorLen,
    u: qMatrx.u,
    q: qMatrx.q,
    v: qMatrx.v
  }
}

module.exports = PCA
