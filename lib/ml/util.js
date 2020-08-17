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

/** @description 混淆矩阵一致性检验类 error Matrix = confusion Matrix
 */
class ConfusionMatrix {
  constructor (tagArr) {
    //如果是数组count成对象，否则，直接使用
    this.tagCount = Array.isArray(tagArr) ? tagArr.count() : tagArr
    let n = 0
    //this.tagTotal = tagArr.length
    this.keyMap = {}
    for (let i in this.tagCount) {
      this.keyMap[i] = n
      n++
    }
    this.dimNum = n
    this.mat = this.fillTag(this.dimNum + 1) //列为实际，行为测试
  }
  //填入标签，形成混淆矩阵
  fillTag (m) {
    let a = $M.mat.zero(m + 1, m + 1)
    let keyArr = Object.keys(this.keyMap)
    let sum = 0
    for (let i = 1; i < m + 1; i++) {
      let itemCount = this.tagCount[keyArr[i - 1]]
      sum += itemCount || 0
      a[0][i] = keyArr[i - 1] || '小计'
      a[i][0] = keyArr[i - 1] || '小计'
      a[m][i] = itemCount || sum
    }
    return a
  }
  getMatrix () {
    return this
  }
  //一致性检测值
  getKappa () {
    let diagonalSum = 0
    let itemsquareSum = 0
    for (let i = 1; i < this.dimNum + 1; i++) {
      diagonalSum += this.mat[i][i]
      itemsquareSum +=
        this.mat[this.dimNum + 1][i] * this.mat[i][this.dimNum + 1]
    }
    let po = diagonalSum / this.mat[this.dimNum + 1][this.dimNum + 1]
    let pe = itemsquareSum / this.mat[this.dimNum + 1][this.dimNum + 1] ** 2

    return { po, pe, k: (po - pe) / (1 - pe) }
  }
  /**
   * @description 测试
   * @param {string} tag1 预测成为的标签
   * @param {string} tag2 实际标签
   * @param {number} num 数量
   */
  addCountByKey (tag1, tag2, num = 1) {
    if (this.keyMap[tag1] === void 0 || this.keyMap[tag2] === void 0)
      throw new Error('标签未定义')
    this.mat[this.keyMap[tag1] + 1][this.keyMap[tag2] + 1] += num
    this.mat[this.keyMap[tag1] + 1][this.dimNum + 1] += num
  }
}

module.exports = {
  infoEntropy,
  cov: $M.cov,
  ConfusionMatrix,
  mahalanobis,
  zScoreNorm,
  minMaxNorm,
  meanStandard,
  minMaxScale,
  none
}
