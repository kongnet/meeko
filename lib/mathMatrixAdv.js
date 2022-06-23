/* istanbul ignore file */
// @ts-check
const Mat = require('./mathMatrix.js').mat
const tools = require('./tools/index')
const $M = require('./math.js')

/**
 * @description 雅克比迭代
 * @param {*} input
 * @param {*} epsilon
 * @param {*} iterations
 */

function jacobi (input, epsilon = 1e-10, iterations = 100) {
  const n = input[0].length
  let D = input.copy()
  let S = Mat.identity(n)

  for (let i = 0; i < iterations; i++) {
    const itr = iterate(S, D, n)
    S = itr.S
    D = itr.D

    if (isDiagonal(D, epsilon)) {
      D = clean(D, epsilon)
      S = clean(S, epsilon)
      break
    }
  }

  return [S, D, Mat.transpose(S)]
}

function iterate (S, D, n) {
  let di
  let dj
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === j) {
        continue
      }

      if (di === undefined || dj === undefined || Math.abs(D[i][j]) > Math.abs(D[di][dj])) {
        di = i
        dj = j
      }
    }
  }

  let angle

  if (D[di][di] === D[dj][dj]) {
    if (D[di][dj] > 0) {
      angle = Math.PI / 4
    } else {
      angle = -Math.PI / 4
    }
  } else {
    angle = 0.5 * Math.atan((2 * D[di][dj]) / (D[di][di] - D[dj][dj]))
  }

  const S1 = Mat.identity(n)
  S1[di][di] = Math.cos(angle)
  S1[dj][dj] = S1[di][di]
  S1[di][dj] = -Math.sin(angle)
  S1[dj][di] = -S1[di][dj]

  return {
    S: Mat.mul(S, S1),
    D: Mat.mul(Mat.mul(Mat.transpose(S1), D), S1)
  }
}

function clean (input, epsilon) {
  const n = input[0].length
  const result = input.copy()

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (Math.abs(input[i][j]) < epsilon) {
        result[i][j] = 0
      } else {
        result[i][j] = input[i][j]
      }
    }
  }

  return result
}

function isDiagonal (input, epsilon) {
  const n = input[0].length

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === j) {
        continue
      }
      if (Math.abs(input[i][j]) > epsilon) {
        return false
      }
    }
  }

  return true
}
function subMatrix (a, startRow, endRow, startColumn, endColumn) {
  const newMatrix = Mat.zero(endRow - startRow + 1, endColumn - startColumn + 1)
  for (let i = startRow; i <= endRow; i++) {
    for (let j = startColumn; j <= endColumn; j++) {
      newMatrix[i - startRow][j - startColumn] = a[i][j]
    }
  }
  return newMatrix
}

function isSymmetric (a) {
  if (Mat.isSquare(a)) {
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j <= i; j++) {
        if (a[i][j] !== a[j][i]) {
          return false
        }
      }
    }
    return true
  }
  return false
}
class Matrix {
  constructor (mat, colName = [], rowName = []) {
    this.optMatrix = mat.copy()
    this.oriMatrix = mat.copy()
    this.colName = colName
    this.rowName = rowName
  }

  // 创建向量
  c (arr) {
    this.optMatrix = [...[arr]]
    if (Array.isArray(arr)) {
      this.T()
    } else {
      throw new Error('无法转为向量')
    }
    return this
  }

  get row () {
    return this.optMatrix.length
  }

  get col () {
    return this.optMatrix[0].length
  }

  // 各类分解
  dc (a) {
    a = a || this.optMatrix
    return {
      qr: new QrDc(a),
      choleskey: new CholeskyDc(a)
    }
  }

  shape () {
    const row = this.optMatrix.length
    const col = this.optMatrix[0].length
    return { row, col }
  }

  // 行列式
  det () {
    return Mat.det(this.optMatrix)
  }

  get (row, col) {
    if (row === undefined && col === undefined) {
      return this.V()
    }
    return this.optMatrix[row][col]
  }

  V (isOri) {
    return isOri ? this.oriMatrix : this.optMatrix
  }

  // 转置
  T () {
    this.optMatrix = Mat.transpose(this.optMatrix)
    return this
  }

  add (mat) {
    this.optMatrix = Mat.add(this.optMatrix, mat)
    return this
  }

  sub (mat) {
    this.optMatrix = Mat.sub(this.optMatrix, mat)
    return this
  }

  mul (mat) {
    if (typeof mat === 'number') {
      this.optMatrix = Mat.scalar(this.optMatrix, mat)
    } else {
      this.optMatrix = Mat.mul(this.optMatrix, mat)
    }
    return this
  }

  inv () {
    this.optMatrix = Mat.inv(this.optMatrix)
    return this
  }

  // 参数空=>对角线，数字=>eye*arr,数组=>
  diag (arr) {
    if (arr === undefined) {
      if (!Mat.isSquare(this.optMatrix)) {
        throw new Error('必须是方阵！')
      }
      return this.optMatrix[0].map((x, idx) => this.optMatrix[idx][idx])
    }
    if (typeof arr === 'number') {
      return Mat.identity(arr)
    }
    if (Array.isArray(arr) && !Array.isArray(arr[0])) {
      const m = Mat.identity(arr.length)
      for (let i = 0; i < m.length; i++) {
        m[i][i] = arr[i]
      }
      return m
    }
  }

  // 特征值
  eigen (a) {
    a = a || this.optMatrix
    if (!Mat.isSquare(a)) {
      throw new Error('必须是方阵！')
    }
    const r = jacobi(a)
    return { s: r[0], d: r[1], st: r[2] }
  }

  // 某行基础统计 a null可以统计其他矩阵
  rowStat (a, rowNum = 0) {
    a = a || this.optMatrix
    const r = a[rowNum]
    return {
      mean: $M.mean(r),
      std: $M.stddevCorrect(r),
      median: $M.median(r),
      mode: $M.mode(r),
      count: $M.countAdv(r),
      quantile: $M.quantileAll(r),
      r
    }
  }

  // 某列基础统计  a null可以统计其他矩阵
  colStat (a, colNum = 0) {
    a = a || this.optMatrix
    const r = a.map((x, idx) => a[idx][colNum])
    return {
      mean: $M.mean(r),
      std: $M.stddevCorrect(r),
      median: $M.median(r),
      mode: $M.mode(r),
      count: $M.countAdv(r),
      quantile: $M.quantileAll(r),
      r
    }
  }

  // 矩阵的迹
  trace (a) {
    a = a || this.optMatrix
    const min = Math.min(a.length, a[0].length)
    let trace = 0
    for (let i = 0; i < min; i++) {
      trace += a[i][i]
    }
    return trace
  }

  print (a) {
    a = a || this.optMatrix
    const colMaxWidth = $M.genRange(0, a[0].length)
    const data = a.map((x, idx) => {
      const rowObj = {}
      for (let i = 0; i < x.length; i++) {
        const col1 = this.colName[idx] || `[${idx + 1},]`
        rowObj['-'] = col1
        colMaxWidth[0] = col1.length > colMaxWidth[0] ? col1.length : colMaxWidth[0]
        const colx = x[i] + ''
        rowObj[this.rowName[i] || `[,${i + 1}]`] = colx
        colMaxWidth[i + 1] = colx.length > colMaxWidth[i + 1] ? colx.length : colMaxWidth[i + 1]
      }
      return rowObj
    })
    const r = tools.drawTable(
      data,
      colMaxWidth.map(x => (x < 5 ? 5 : x + 1)),
      { color: 1 }
    )
    return r
  }

  log (a) {
    a = a || this.optMatrix
    console.log('[')

    a.forEach(x => {
      const item = x.map(it => {
        const s = it.toFixed(6)
        return s.fillStr(' ', 13, -1)
      })

      console.log(item.join(','))
    })
    console.log(']')
    console.log('row', this.row)
    console.log('col', this.col)
  }
}

class QrDc {
  constructor (value) {
    const qr = value.copy()
    const m = value.length
    const n = value[0].length
    const rdiag = new Float64Array(n)
    let i, j, k, s

    for (k = 0; k < n; k++) {
      let nrm = 0
      for (i = k; i < m; i++) {
        nrm = Math.hypot(nrm, qr[i][k])
      }
      if (nrm !== 0) {
        if (qr[k][k] < 0) {
          nrm = -nrm
        }
        for (i = k; i < m; i++) {
          qr[i][k] = qr[i][k] / nrm
        }
        qr[k][k] = qr[k][k] + 1
        for (j = k + 1; j < n; j++) {
          s = 0
          for (i = k; i < m; i++) {
            s += qr[i][k] * qr[i][j]
          }
          s = -s / qr[k][k]
          for (i = k; i < m; i++) {
            qr[i][j] = qr[i][j] + s * qr[i][k]
          }
        }
      }
      rdiag[k] = -nrm
    }

    this.QR = qr
    this.Rdiag = rdiag
  }

  solve (value) {
    const qr = this.QR
    const m = qr.length

    if (value.length !== m) {
      throw new Error('Matrix row dims must agree')
    }
    if (!this.isFullRank()) {
      throw new Error('Matrix is rank deficient')
    }

    const count = value[0].length
    const X = value.copy()
    const n = qr[0].length
    let i, j, k, s

    for (k = 0; k < n; k++) {
      for (j = 0; j < count; j++) {
        s = 0
        for (i = k; i < m; i++) {
          s += qr[i][k] * X[i][j]
        }
        s = -s / qr[k][k]
        for (i = k; i < m; i++) {
          X[i][j] = X[i][j] + s * qr[i][k]
        }
      }
    }
    for (k = n - 1; k >= 0; k--) {
      for (j = 0; j < count; j++) {
        X[k][j] = X[k][j] / this.Rdiag[k]
      }
      for (i = 0; i < k; i++) {
        for (j = 0; j < count; j++) {
          X[i][j] = X[i][j] - X[k][j] * qr[i][k]
        }
      }
    }

    return subMatrix(X, 0, n - 1, 0, count - 1)
  }

  isFullRank () {
    const columns = this.QR[0].length
    for (let i = 0; i < columns; i++) {
      if (this.Rdiag[i] === 0) {
        return false
      }
    }
    return true
  }

  get upperTriangularMatrix () {
    const qr = this.QR
    const n = qr[0].length
    const X = Mat.identity(n)
    let i, j
    for (i = 0; i < n; i++) {
      for (j = 0; j < n; j++) {
        if (i < j) {
          X[i][j] = qr[i][j]
        } else if (i === j) {
          X[i][j] = this.Rdiag[i]
        } else {
          X[i][j] = 0
        }
      }
    }
    return X
  }

  get orthogonalMatrix () {
    const qr = this.QR
    const rows = qr.length
    const columns = qr[0].length
    const X = Mat.zero(rows, columns)
    let i, j, k, s

    for (k = columns - 1; k >= 0; k--) {
      for (i = 0; i < rows; i++) {
        X[i][k] = 0
      }
      X[k][k] = 1
      for (j = k; j < columns; j++) {
        if (qr[k][k] !== 0) {
          s = 0
          for (i = k; i < rows; i++) {
            s += qr[i][k] * X[i][j]
          }

          s = -s / qr[k][k]

          for (i = k; i < rows; i++) {
            X[i][j] = X[i][j] + s * qr[i][k]
          }
        }
      }
    }
    return X
  }
}
// 平方根法
class CholeskyDc {
  constructor (value) {
    if (!isSymmetric(value)) {
      throw new Error('矩阵不对称')
    }
    const a = value
    const dim = a.length
    const l = Mat.identity(dim)
    let positiveDefinite = true
    let i, j, k

    for (j = 0; j < dim; j++) {
      let d = 0
      for (k = 0; k < j; k++) {
        let s = 0
        for (i = 0; i < k; i++) {
          s += l[k][i] * l[j][i]
        }
        s = (a[j][k] - s) / l[k][k]
        l[j][k] = s
        d = d + s * s
      }

      d = a[j][j] - d

      positiveDefinite = positiveDefinite && d > 0
      l[j][j] = Math.sqrt(Math.max(d, 0))
      for (k = j + 1; k < dim; k++) {
        l[j][k] = 0
      }
    }

    this.L = l
    this.positiveDefinite = Boolean(positiveDefinite)
  }

  isPositiveDefinite () {
    return this.positiveDefinite
  }

  solve (value) {
    const l = this.L
    const dim = l.length

    if (value.length !== dim) {
      throw new Error('Matrix 维度不匹配')
    }
    if (this.isPositiveDefinite() === false) {
      throw new Error('Matrix is not positive definite')
    }

    const count = value[0].length
    const B = value.copy()
    let i, j, k

    for (k = 0; k < dim; k++) {
      for (j = 0; j < count; j++) {
        for (i = 0; i < k; i++) {
          B[k][j] = B[k][j] - B[i][j] * l[k][i]
        }
        B[k][j] = B[k][j] / l[k][k]
      }
    }

    for (k = dim - 1; k >= 0; k--) {
      for (j = 0; j < count; j++) {
        for (i = k + 1; i < dim; i++) {
          B[k][j] = B[k][j] - B[i][j] * l[i][k]
        }
        B[k][j] = B[k][j] / l[k][k]
      }
    }

    return B
  }

  get lowerTriangularMatrix () {
    return this.L
  }
}
module.exports = { Matrix, QrDc, CholeskyDc }
