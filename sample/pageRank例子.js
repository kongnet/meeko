const $ = require('../index')

function isMarkov (mat) {
  const esp = 1e-10
  let isPositive = !1
  const colSum = []
  const len = mat.length
  for (let i = 0; i < len; i++) {
    for (let k = 0; k < len; k++) {
      const item = mat[i][k]
      isPositive = item >= 0 ? !0 : !1
      if (!isPositive) {
        return !1
      }
      colSum[k] = colSum[k] || 0
      colSum[k] += item
    }
  }
  return colSum.every(x => Math.abs(1 - x) <= esp) && isPositive
}

function strIndex2num (str) {
  str = str.toUp()
  const a = str.split('')
  const len = a.length
  let s = 0
  for (let i = 0; i < len; i++) {
    s += (a[len - 1 - i].charCodeAt() - 64) * 26 ** i
  }
  return s
}
function num2IndexStr (num) {
  return num
    .toString(26)
    .split('')
    .map(x => String.fromCharCode(+x ? +x + 64 : x.charCodeAt() - 23))
    .join('')
}

function pageRank (transMat, initVector, damping = 0.85, iter = 100) {
  const esp = 1e-9
  const len = transMat.length
  if (!isMarkov(transMat)) {
    return { iter: 0, r: transMat, isMarkov: false }
  } // 马尔科夫矩阵判断，元素非负，列和为1
  if (!initVector) {
    // 初始化向量
    initVector = $.math.mat.transpose([
      Array.from({ length: len }, x => 1 / len) // 1/N
    ])
  }
  console.log('initVector', initVector)
  let r = $.math.mat.mul(transMat, initVector)
  // 高斯-塞德尔迭代法
  for (let i = 0; i < iter; i++) {
    const weightNew = $.math.mat.mul(transMat, r).map(x => [(1 - damping) / len + damping * x[0]])
    // 迭代，收敛到阀值停止
    if (Math.abs(weightNew[0][0] - r[0][0]) < esp) {
      return { iter: i, r: r, isMarkov: true }
    }
    r = weightNew
  }
  return { iter: iter, r: r, isMarkov: true }
}

function createNetwork (edges) {
  /*
    edges: [从哪里=> 跳转到哪里 ]
  */
  const colCount = edges.map(x => x[0]).count() // 计算列的总计数
  let len = 0
  for (const i in colCount) {
    len++
  }
  const mat = $.math.mat.zero(len, len)
  for (let i = 0; i < edges.length; i++) {
    const [colNum, rowNum] = [strIndex2num(edges[i][0]) - 1, strIndex2num(edges[i][1]) - 1]
    mat[rowNum][colNum] = 1 / colCount[edges[i][0]] // 1/列计数 作为初始值
  }
  console.log('Init:', mat)
  return mat
}

const edges = [
  ['a', 'b'],
  ['a', 'c'],
  ['a', 'd'],
  ['b', 'd'],
  ['c', 'e'],
  ['d', 'e'],
  ['b', 'e'],
  ['e', 'a']
]

const pageRankArr = pageRank(createNetwork(edges)).r

console.log('pageRank:', pageRankArr)
console.log('maxValueNode:', num2IndexStr(+$.math.findMax(pageRankArr.flatten()).tag + 1))
