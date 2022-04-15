/**
 * @namespace Math_prototype
 */

const $M = require('../math')
// K-邻近机器学习
class Knn {
  constructor (xRaw, yRaw, k = 3, algorithm = 'euclidean') {
    this.set(xRaw, yRaw, k, algorithm)
  }

  set (xRaw, yRaw, k = 3, algorithm = 'euclidean') {
    this.xRaw = xRaw
    this.yRaw = yRaw
    this.k = k
    this.algorithm = algorithm
  }

  calcDis (dimArr) {
    return this.xRaw.map((item, idx) => {
      return { id: idx, dis: $M.dist[this.algorithm](item, dimArr) }
    })
  }

  predict (dimArr) {
    const countObj = this.calcDis(dimArr)
      .orderBy(['dis'], ['asc'])
      .slice(0, this.k)
      .map(x => this.yRaw[x.id])
      .count()
    return {
      result: $M.findMax(countObj),
      whole: countObj,
      algorithm: this.algorithm
    }
  }

  optimize (chunkSize) {
    // 将训练集分为 训练80%和测试20% 2个集合，自动计算最佳K取值
    const testSetLen = Math.round(this.xRaw.length * 0.2)
    const incArr = Array.from({ length: this.xRaw.length }, (_, index) => index)
    const testSet = incArr.chunk(chunkSize || testSetLen) // $M.combinList(incArr, testSetLen) 数组组合 太大时内存溢出，改用直接分包
    const trainSet = testSet.map(item => incArr.except(item)) // 差集
    const trainSetDim = trainSet.map(item => item.map(it => this.xRaw[it]))
    const trainSetTag = trainSet.map(item => item.map(it => this.yRaw[it]))
    const testPredictSet = testSet.map(item => item.map(it => this.xRaw[it]))
    const testTagSet = testSet.map(item => item.map(it => this.yRaw[it]))
    let maxRatio = 0
    let optimizeK = 3
    for (let k = optimizeK; k < 9; k += 2) {
      let n = 0
      let nRight = 0
      for (let i = 0; i < trainSetDim.length; i++) {
        this.set(trainSetDim[i], trainSetTag[i], k, this.algorithm)
        for (let d = 0; d < testPredictSet[i].length; d++) {
          if (this.predict(testPredictSet[i][d]).result.tag === testTagSet[i][d]) {
            nRight++
          }
          n++
        }
      }

      if (nRight / n > maxRatio) {
        maxRatio = nRight / n
        optimizeK = k
      }
    }
    this.set(this.xRaw, this.yRaw, optimizeK, this.algorithm)
    return { k: optimizeK, accuracy: maxRatio, algorithm: this.algorithm }
  }
}

module.exports = Knn
