/**
 * @namespace Math_prototype
 */

const Mat = require('../mathMatrix').mat

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
//马氏距离
function mahalanobis (mat, vecType = 0, a = 0, b = 0) {
  //参考 https://www.jb51.net/article/137650.htm
  let meanVec = []
  // vecType 0 全部返回 1 单点和均值向量马氏距离 2 xy2点之间马氏距离

  let data = Mat.transpose(mat)
  let dataT = mat

  let covArr = Mat.inv($M.cov(data))
  if (vecType === 1) {
    meanVec = [data.map(x => $M.mean(x))]
    let simpleArr = []
    for (let i = 0; i < dataT.length; i++) {
      let dT = Mat.transpose(meanVec)
      //console.log(dT)
      simpleArr.push(Math.sqrt(Mat.mul(Mat.mul(meanVec, covArr), dT)[0][0]))
    }
    return simpleArr
  }
  if (vecType === 2) {
    let d = Mat.sub([dataT[a]], [dataT[b]])
    let dT = Mat.transpose(d)
    return Math.sqrt(Mat.mul(Mat.mul(d, covArr), dT)[0][0])
  }
  let pairArr = []
  for (let i = 0; i < dataT.length; i++) {
    for (let k = i + 1; k < dataT.length; k++) {
      let d = Mat.sub([dataT[i]], [dataT[k]])
      let dT = Mat.transpose(d)
      pairArr.push([i, k], Math.sqrt(Mat.mul(Mat.mul(d, covArr), dT)[0][0]))
    }
  }
  return pairArr
}
// 计算信息熵/香农熵
function infoEntropy (a) {
  let arr = a.countAdv()
  return -arr.reduce((x, y) => x + y.w * Math.log2(y.w), 0)
}
module.exports = {
  infoEntropy,
  cov: $M.cov,
  mahalanobis,
  zScoreNorm,
  minMaxNorm,
  meanStandard,
  minMaxScale,
  none
}
