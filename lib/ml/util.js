/* istanbul ignore file */

/**
 * @namespace Math_prototype
 */

const Mat = require('../mathMatrix').mat

const $M = require('../math')
/**
 * Standardization 标准化
 * @param {Array} a
 * @returns
 */
function zScoreNorm (a) {
  const arr = $M.mat.transpose(a).map(x => {
    const mean = $M.mean(x)
    const std = $M.stddev(x)
    x = x.map(it => (it - mean) / std)
    return x
  })
  return $M.mat.transpose(arr)
}
/**
 * 归一化(MMS)
 * @param {Array} a
 * @returns
 */
function minMaxNorm (a) {
  const arr = $M.mat.transpose(a).map(x => {
    const max = $M.max(x)
    const min = $M.min(x)
    x = x.map(it => (it - min) / (max - min))
    return x
  })
  return $M.mat.transpose(arr)
}
function minMaxScale (a) {
  const arr = $M.mat.transpose(a).map(x => {
    const max = $M.max(x)
    const min = $M.min(x)
    x = x.map(it => it / (max - min))
    return x
  })
  return $M.mat.transpose(arr)
}
function none (a) {
  return a
}
function meanStandard (a) {
  const meanArr = []
  // 均值中心化
  const arr = $M.mat.transpose(a).map(x => {
    const mean = $M.mean(x)
    meanArr.push(mean)
    x = x.map(it => it - mean)
    return x
  })
  return { meanMat: $M.mat.transpose(arr), meanArr: meanArr }
}
// 马氏距离
function mahalanobis (mat, vecType = 0, a = 0, b = 0) {
  // 参考 https://www.jb51.net/article/137650.htm
  // 马氏距离要求样本数要大于维数，否则无法求协方差矩阵
  let meanVec = []
  // vecType 0 全部返回 1 单点和均值向量马氏距离 2 xy2点之间马氏距离

  const data = Mat.transpose(mat)
  const dataT = mat

  const covArr = Mat.inv($M.cov(data))
  if (vecType === 1) {
    meanVec = [data.map(x => $M.mean(x))]
    const simpleArr = []
    for (_ of dataT) {
      const dT = Mat.transpose(meanVec)
      // console.log(dT)
      simpleArr.push(Math.sqrt(Mat.mul(Mat.mul(meanVec, covArr), dT)[0][0]))
    }
    return simpleArr
  }
  if (vecType === 2) {
    const d = Mat.sub([dataT[a]], [dataT[b]])
    const dT = Mat.transpose(d)
    return Math.sqrt(Mat.mul(Mat.mul(d, covArr), dT)[0][0])
  }
  const pairArr = []
  for (let i = 0; i < dataT.length; i++) {
    for (let k = i + 1; k < dataT.length; k++) {
      const d = Mat.sub([dataT[i]], [dataT[k]])
      const dT = Mat.transpose(d)
      pairArr.push([i, k], Math.sqrt(Mat.mul(Mat.mul(d, covArr), dT)[0][0]))
    }
  }
  return pairArr
}
// 计算信息熵/香农熵
function infoEntropy (a) {
  const arr = a.countAdv()
  return -arr.reduce((x, y) => x + y.w * Math.log2(y.w), 0)
}

/** @description 混淆矩阵一致性检验类 error Matrix = confusion Matrix
 */

class ConfusionMatrix {
  constructor (tagArr) {
    // 如果是数组count成对象，否则，直接使用
    this.tagCount = Array.isArray(tagArr) ? tagArr.count() : tagArr
    let n = 0
    // this.tagTotal = tagArr.length
    this.keyMap = {}
    for (const i in this.tagCount) {
      this.keyMap[i] = n
      n++
    }
    this.dimNum = n
    this.mat = this.fillTag(this.dimNum + 1) // 列为实际，行为测试
  }

  // 填入标签，形成混淆矩阵
  fillTag (m) {
    const a = $M.mat.zero(m + 1, m + 1)
    const keyArr = Object.keys(this.keyMap)
    let sum = 0
    for (let i = 1; i < m + 1; i++) {
      const itemCount = this.tagCount[keyArr[i - 1]]
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

  // 一致性检测值
  getKappa () {
    let diagonalSum = 0
    let itemsquareSum = 0
    for (let i = 1; i < this.dimNum + 1; i++) {
      diagonalSum += this.mat[i][i]
      itemsquareSum += this.mat[this.dimNum + 1][i] * this.mat[i][this.dimNum + 1]
    }
    const po = diagonalSum / this.mat[this.dimNum + 1][this.dimNum + 1]
    const pe = itemsquareSum / this.mat[this.dimNum + 1][this.dimNum + 1] ** 2

    return { po, pe, k: (po - pe) / (1 - pe) }
  }

  /**
   * @description 测试
   * @param {string} tag1 预测成为的标签
   * @param {string} tag2 实际标签
   * @param {number} num 数量
   */

  addCountByKey (tag1, tag2, num = 1) {
    if (this.keyMap[tag1] === void 0 || this.keyMap[tag2] === void 0) {
      throw new Error('标签未定义')
    }
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
