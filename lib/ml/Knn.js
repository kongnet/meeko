/**
 * @namespace Math_prototype
 */

let $M = require('../math')
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
    let disArr = this.xRaw.map((item, idx) => {
      return { id: idx, dis: $M.dist[this.algorithm](item, dimArr) }
    })
    return disArr
  }
  predict (dimArr) {
    let countObj = this.calcDis(dimArr)
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
    let testSetLen = Math.round(this.xRaw.length * 0.2)
    let incArr = Array.from(
      { length: this.xRaw.length },
      (item, index) => index
    )
    let testSet = incArr.chunk(chunkSize || testSetLen) // $M.combinList(incArr, testSetLen) 数组组合 太大时内存溢出，改用直接分包
    let trainSet = testSet.map(item => incArr.except(item)) // 差集
    let trainSetDim = trainSet.map(item => item.map(it => this.xRaw[it]))
    let trainSetTag = trainSet.map(item => item.map(it => this.yRaw[it]))
    let testPredictSet = testSet.map(item => item.map(it => this.xRaw[it]))
    let testTagSet = testSet.map(item => item.map(it => this.yRaw[it]))
    let maxRatio = 0;
    let optimizeK = 3
    for (let k = optimizeK; k < 9; k++) {
      let n = 0;
      let nRight = 0
      for (let i = 0; i < trainSetDim.length; i++) {
        this.set(trainSetDim[i], trainSetTag[i], k, this.algorithm)
        for (let d = 0; d < testPredictSet[i].length; d++) {
          if (
            this.predict(testPredictSet[i][d]).result.tag === testTagSet[i][d]
          ) {
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
