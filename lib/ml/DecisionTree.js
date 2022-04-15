/* istanbul ignore file */
/**
 * @namespace Math_prototype
 */

const $M = require('../math')
const util = require('./util')
function drawTree (inObj, outObj = {}, key, level = -1) {
  level++
  if (outObj[key]) {
    outObj[key + '&'] = ' . '.repeat(level) + $.c.y(key)
    return
  }
  if (inObj[key] instanceof Array) {
    outObj[key] = ' . '.repeat(level) + key
    inObj[key].forEach(item => {
      drawTree(inObj, outObj, item, level++)
      level--
    })
  }
  if (!inObj[key]) {
    outObj[key] = ' . '.repeat(level) + key
  }
  return outObj
}
// ID3 or C4.5
class DecisionTree {
  constructor (a, tag = [], algorithm = 'ID3') {
    // NOTICE: a的最后一行总是 标签分类列
    if (a <= 1 || !(a[0] instanceof Array)) {
      throw new Error($.c.r('数据行数太少,或不是矩阵形式'))
    }
    this.tag = tag
    this.algorithm = algorithm
    this.rowNum = a.length // 数据多少行,行数都是一样的
    this.decisionObj = {}
    this.outTree = {} // 输出的结构树
    this.baseEntropy = 0 // 总的信息熵
    this.buildTree(a)
  }

  decisionSub (a, filterColumn = [], path = '开始决策') {
    if (!a) {
      return
    }
    if (filterColumn.length === a[0].length - 1) {
      return
    } // 没有维度可以再分了
    const arr = a.copy()
    const r = $M.mat.transpose(arr)
    if (r[r.length - 1].countAdv()[0].v === a.length) {
      return
    } // 如果所有tag都是一样的，就不用再分裂了
    delete this.decisionObj[path] // 父亲集合可以再分裂，所以删除父亲，已经浅复制
    let maxGain = -1 // 最大增益
    let maxGainIdx = -1 // 最大增益索引
    for (let i = 0; i < r.length - 1; i++) {
      if (filterColumn.includes(i)) {
        continue
      }
      const dimTagObj = {} // 每个维度对应tag的分类对象
      let dimEntropy = 0
      const splitInfo = this.algorithm === 'ID3' ? 1 : util.infoEntropy(r[i]) // 如果不是ID3 就是 C4.5

      for (let d = 0; d < this.rowNum; d++) {
        const item = r[i][d]
        if (dimTagObj[item]) {
          dimTagObj[item].count++
        } else {
          dimTagObj[item] = { count: 1, tag: [] }
        }
        dimTagObj[item].tag.push(r[r.length - 1][d])
      }
      for (const k in dimTagObj) {
        const prob = dimTagObj[k].count / this.rowNum
        dimEntropy += prob * util.infoEntropy(dimTagObj[k].tag)
      }
      if ((this.baseEntropy - dimEntropy) / splitInfo > maxGain) {
        maxGain = (this.baseEntropy - dimEntropy) / splitInfo
        maxGainIdx = i
      }
    }

    const pathArr = []

    arr.forEach(x => {
      const pItem = path + '=>' + (this.tag[maxGainIdx] || maxGainIdx) + '(' + x[maxGainIdx] + ')'
      if (this.decisionObj[pItem]) {
        // do nothing
      } else {
        pathArr.push(pItem)
        this.decisionObj[pItem] = []
      }
      this.decisionObj[pItem].push(x)
    })
    filterColumn.push(maxGainIdx)

    for (let i = 0; i < pathArr.length; i++) {
      this.decisionSub(this.decisionObj[pathArr[i]], [...filterColumn], pathArr[i])
    }
  }

  buildTree (a) {
    const dimArr = $M.mat.transpose([...a])
    this.baseEntropy = util.infoEntropy(dimArr[dimArr.length - 1]) // 最后1列为分类tag列，由此列计算基础信息熵、香农熵
    this.decisionSub(a)
    return this.decisionObj
  }

  printTree () {
    this.toTreeObj()
    for (const i in this.outTree) {
      console.log(this.outTree[i])
    }
  }

  toTreeObj () {
    const treeObjArr = {}
    const o = this.decisionObj
    for (const i in o) {
      const arr = i.split('=>')
      arr[arr.length - 1] += '==>' + o[i][0][o[i][0].length - 1] + `[${o[i].length}]`
      arr.forEach((x, idx) => {
        if (treeObjArr[x]) {
          // do nothing
        } else {
          treeObjArr[x] = []
          if (arr[idx - 1]) {
            treeObjArr[arr[idx - 1]].push(x)
          }
        }
      })
    }
    this.outTree = drawTree(treeObjArr, {}, '开始决策')

    return this.outTree
  }
}

module.exports = DecisionTree
