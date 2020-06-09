/**
 * @namespace Math_prototype
 */

let $M = require('../math')
function zScoreNorm (a) {
  let arr = $M.mat.transpose(a).map(x => {
    let mean = $M.mean(x)
    let std = $M.stddev(x)
    x = x.map(it => (it - mean) / std)
    return x
  })
  return $M.mat.transpose(arr)
}
function minMaxNorm (a) {
  let arr = $M.mat.transpose(a).map(x => {
    let max = $M.max(x)
    let min = $M.min(x)
    x = x.map(it => (it - min) / (max - min))
    return x
  })
  return $M.mat.transpose(arr)
}
function minMaxScale (a) {
  let arr = $M.mat.transpose(a).map(x => {
    let max = $M.max(x)
    let min = $M.min(x)
    x = x.map(it => it / (max - min))
    return x
  })
  return $M.mat.transpose(arr)
}
function none (a) {
  return a
}
function meanStandard (a) {
  let meanArr = []
  // 均值中心化
  let arr = $M.mat.transpose(a).map(x => {
    let mean = $M.mean(x)
    meanArr.push(mean)
    x = x.map(it => it - mean)
    return x
  })
  return { meanMat: $M.mat.transpose(arr), meanArr: meanArr }
}

/*
 * 计算协方差
 *
 * @param {Array} arr
 * @param {Bool} isSample
 */

const cov = function (mat) {
  let len = mat.length
  let a = []
  for (let i = 0; i < len; i++) {
    a[i] = []
    for (let j = 0; j < len; j++) {
      a[i][j] = $M.covarianceCorrect(mat[i], mat[j]) / len
    }
  }
  return a
}
module.exports = {
  cov,
  zScoreNorm,
  minMaxNorm,
  meanStandard,
  minMaxScale,
  none
}
