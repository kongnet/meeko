'use strict'
// @ts-check
/**
 * @namespace matrix
 */

const matrix = {}

const NOT_SQUARE = '矩阵必须是方形的'

matrix._subMatrix = function (rows, i, j) {
  const r = rows.copy()
  let index
  r.splice(i, 1)
  index = r.length
  while (index--) {
    r[index].splice(j, 1)
  }
  return r
}

/**
 * copy一个矩阵.
 *
 * @param {Array} matrix
 * @return {Array}
 */

matrix.deepCopy = function (arr) {
  if (!Array.isArray(arr)) {
    throw new Error('输入必须是矩阵')
  } else if (arr[0][0] === undefined) {
    throw new Error('输入不能是向量')
  }
  const result = new Array(arr.length)

  for (let i = 0; i < arr.length; i++) {
    result[i] = arr[i].slice()
  }

  return result
}

/**
 * 判断矩阵是否是方阵
 *
 * @param {Array} arr
 * @return {Boolean}
 */

matrix.isSquare = function (arr) {
  if (!Array.isArray(arr)) {
    throw new Error('输出必须是矩阵')
  } else if (arr[0][0] === undefined) {
    throw new Error('输入不是向量')
  }
  const rows = arr.length

  for (let i = 0; i < rows; i++) {
    if (arr[i].length !== rows) {
      return false
    }
  }

  return true
}

/**
 * 两个矩阵相加，维度需要一致 addition
 *
 * @param {Array} matrix A.
 * @param {Array} matrix B.
 * @return {Array}
 */

matrix.add = function (arrA, arrB) {
  if (arrA.length !== arrB.length || arrA[0].length !== arrB[0].length) {
    throw new Error('矩阵维度不匹配')
  }

  const result = new Array(arrA.length)
  let i

  if (!arrA[0].length) {
    for (i = 0; i < arrA.length; i++) {
      result[i] = arrA[i] + arrB[i]
    }
  } else {
    for (i = 0; i < arrA.length; i++) {
      result[i] = new Array(arrA[i].length)

      for (let j = 0; j < arrA[i].length; j++) {
        result[i][j] = arrA[i][j] + arrB[i][j]
      }
    }
  }

  return result
}

/**
 * 两个矩阵相减，维度需要一致 subtraction
 *
 * @param {Array} matrix A.
 * @param {Array} matrix B.
 * @return {Array}
 */

matrix.sub = function (arrA, arrB) {
  if (arrA.length !== arrB.length || arrA[0].length !== arrB[0].length) {
    throw new Error('矩阵维度不匹配')
  }

  const result = new Array(arrA.length)
  let i

  if (!arrA[0].length) {
    // The arrays are vectors.
    for (i = 0; i < arrA.length; i++) {
      result[i] = arrA[i] - arrB[i]
    }
  } else {
    for (i = 0; i < arrA.length; i++) {
      result[i] = new Array(arrA[i].length)

      for (let j = 0; j < arrA[i].length; j++) {
        result[i][j] = arrA[i][j] - arrB[i][j]
      }
    }
  }

  return result
}

/**
 * 比例一个矩阵
 *
 * @param {Array} matrix.
 * @param {Number} scalar.
 * @return {Array}
 */

matrix.scalar = function (arr, val) {
  const result = matrix.deepCopy(arr)
  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result[i].length; j++) {
      result[i][j] = val * arr[i][j]
    }
  }

  return result
}

/**
 * 转置矩阵
 *
 * @param {Array} matrix.
 * @return {Array}
 */

matrix.transpose = function (arr) {
  const result = new Array(arr[0].length)

  for (let i = 0; i < arr[0].length; i++) {
    result[i] = new Array(arr.length)

    for (let j = 0; j < arr.length; j++) {
      result[i][j] = arr[j][i]
    }
  }

  return result
}

/**
 * 创建 n x n 单位矩阵.
 *
 * @param {Number} dimension
 * @return {Array} n x n 单位矩阵.
 */

matrix.identity = function (n) {
  const result = new Array(n)

  for (let i = 0; i < n; i++) {
    result[i] = new Array(n)
    for (let j = 0; j < n; j++) {
      result[i][j] = i === j ? 1 : 0
    }
  }

  return result
}

/**
 * 向量点乘 dotproduct
 *
 * @param {Array} vector.
 * @param {Array} vector.
 * @return {Array} dot product.
 */

matrix.dot = function (vectorA, vectorB) {
  if (vectorA.length !== vectorB.length) {
    throw new Error('向量不匹配')
  }

  let result = 0
  for (let i = 0; i < vectorA.length; i++) {
    result += vectorA[i] * vectorB[i]
  }
  return result
}

/**
 * 叉乘2个矩阵 multiply
 *
 *
 * @param {Array} matrix.
 * @param {Array} matrix.
 * @return {Array} result of multiplied matrices.
 */

matrix.mul = function (arrA, arrB) {
  if (arrA[0].length !== arrB.length) {
    throw new Error('矩阵维度不匹配')
  }

  const result = new Array(arrA.length)

  for (let x = 0; x < arrA.length; x++) {
    result[x] = new Array(arrB[0].length)
  }

  const arrBT = matrix.transpose(arrB)

  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result[i].length; j++) {
      result[i][j] = matrix.dot(arrA[i], arrBT[j])
    }
  }
  return result
}

/**
 * 矩阵的行列式值 determinant
 *
 * @param {Array} matrix.
 * @return {Number}
 */

matrix.det = function (m) {
  const numRow = m.length
  const numCol = m[0].length
  let det = 0
  // let row, col
  let sign

  if (!matrix.isSquare(m)) {
    throw new Error(NOT_SQUARE)
  }

  if (numRow === 1) {
    return m[0][0]
  } else if (numRow === 2) {
    return m[0][0] * m[1][1] - m[0][1] * m[1][0]
  }

  for (let i = 0; i < 1; i++) {
    for (let j = 0; j < numCol; j++) {
      sign = (i + j) % 2 ? -1 : 1
      det += sign * m[i][j] * matrix.det(matrix._subMatrix(m, i, j))
    }
  }
  return det
}

/**
 * 高斯约旦消元
 *
 * @param {Array} matrix.
 * @param {Number} epsilon.
 * @return {Array} RREF matrix.
 */

matrix.GaussJordanEliminate = function (m, epsilon) {
  // Translated from:
  // http://elonen.iki.fi/code/misc-notes/python-gaussj/index.html
  const eps = typeof epsilon === 'undefined' ? 1e-10 : epsilon

  const h = m.length
  const w = m[0].length
  let y = -1
  let y2, x, c

  while (++y < h) {
    // Pivot.
    let maxrow = y
    y2 = y
    while (++y2 < h) {
      if (Math.abs(m[y2][y]) > Math.abs(m[maxrow][y])) {
        maxrow = y2
      }
    }
    const tmp = m[y]
    m[y] = m[maxrow]
    m[maxrow] = tmp

    // Singular
    if (Math.abs(m[y][y]) <= eps) {
      return m
    }

    // Eliminate column
    y2 = y
    while (++y2 < h) {
      c = m[y2][y] / m[y][y]
      x = y - 1
      while (++x < w) {
        m[y2][x] -= m[y][x] * c
      }
    }
  }

  // Backsubstitute.
  y = h
  while (--y >= 0) {
    c = m[y][y]
    y2 = -1
    while (++y2 < y) {
      x = w
      while (--x >= y) {
        m[y2][x] -= (m[y][x] * m[y2][y]) / c
      }
    }
    m[y][y] /= c

    // Normalize row
    x = h - 1
    while (++x < w) {
      m[y][x] /= c
    }
  }

  return m
}

/**
 * nxn 求逆 inverse
 *
 * @param {Array} matrix.
 * @return {Array}
 */

matrix.inv = function (m) {
  if (!matrix.isSquare(m)) {
    throw new Error(NOT_SQUARE)
  }

  const n = m.length
  const identity = matrix.identity(n)
  let i

  // A*I
  for (i = 0; i < n; i++) {
    m[i] = m[i].concat(identity[i])
  }

  // inv(I*A)
  m = matrix.GaussJordanEliminate(m)

  // inv(A)
  for (i = 0; i < n; i++) {
    m[i] = m[i].slice(n)
  }

  return m
}

/**
 * 获取矩阵列
 *
 * @param {Array} matrix
 * @param {Int} column number
 * @return {Array} column
 */

matrix.getCol = function (M, n) {
  const result = new Array(M.length)
  if (n < 0) {
    throw new Error('需要正数')
  } else if (n >= M[0].length) {
    throw new Error('0 and columns - 1.')
  }
  for (let i = 0; i < M.length; i++) {
    result[i] = M[i][n]
  }
  return result
}

/**
 * 创建 n x m 全0矩阵.
 *
 * @param {Int} number of rows
 * @param {Int} number of columns
 * @return {Array} matrix
 */

matrix.zero = function (n, m) {
  if (n < 1 || m < 1) {
    throw new Error('矩阵维度必须为正数')
  }
  n = n | 0
  m = m | 0
  return Array(n)
    .fill(0)
    .map(_ => Array(m).fill(0))

  /*
  for (let i = 0; i < n; i++) {
    let empty = new Array(m)
    for (let j = 0; j < m; j++) {
      empty[j] = 0
    }
    M[i] = empty
  }
  return M
  */
}

/**
 * 矩阵map操作
 *
 * @param {Array} matrix
 * @param {Function} function to apply to each element
 * @return {Array} matrix operated on
 */

matrix.map = function (M, f) {
  // M is n-by-m (n rows, m columns)
  const n = M.length
  const m = M[0].length
  let i
  let j

  const res = matrix.deepCopy(M)

  for (i = 0; i < n; i++) {
    for (j = 0; j < m; j++) {
      res[i][j] = f(M[i][j], i, j)
    }
  }
  return res
}

/**
 * Swaps two rows of a matrix  and returns the updated matrix.
 * Used in row reduction functions.
 *
 * @param {Array} matrix.
 * @param {Number} row1.
 * @param {Number} row2.
 */

matrix.rowSwitch = function (m, row1, row2) {
  const result = new Array(m.length)

  for (let i = 0; i < m.length; i++) {
    result[i] = new Array(m[i].length)

    for (let j = 0; j < m[i].length; j++) {
      if (i === row1) {
        result[i][j] = m[row2][j]
      } else if (i === row2) {
        result[i][j] = m[row1][j]
      } else {
        result[i][j] = m[i][j]
      }
    }
  }
  return result
}

/**
 * Returns a LUP decomposition of the given matrix such that:
 *
 * A*P = L*U
 *
 * Where
 * A is the input matrix
 * P is a pivot matrix
 * L is a lower triangular matrix
 * U is a upper triangular matrix
 *
 * This method returns an array of three matrices such that:
 *
 * matrix.luDecomposition(array) = [L, U, P]
 *
 * @param {Array} arr
 * @return {Array} array of matrices [L, U, P]
 */

matrix.lupDecomposition = function (arr) {
  if (!matrix.isSquare(arr)) {
    throw new Error('ERROR_MATRIX_NOT_SQUARE')
  }

  const size = arr.length

  let LU = matrix.deepCopy(arr)
  let P = matrix.transpose(matrix.identity(size))
  let currentRow
  const currentColumn = new Array(size)

  this.getL = function (a) {
    const m = a[0].length
    const L = matrix.identity(m)

    for (let i = 0; i < m; i++) {
      for (let j = 0; j < m; j++) {
        if (i > j) {
          L[i][j] = a[i][j]
        }
      }
    }

    return L
  }

  this.getU = function (a) {
    const m = a[0].length
    const U = matrix.identity(m)

    for (let i = 0; i < m; i++) {
      for (let j = 0; j < m; j++) {
        if (i <= j) {
          U[i][j] = a[i][j]
        }
      }
    }

    return U
  }

  for (let j = 0; j < size; j++) {
    let i
    for (i = 0; i < size; i++) {
      currentColumn[i] = LU[i][j]
    }

    for (i = 0; i < size; i++) {
      currentRow = LU[i]

      const minIndex = Math.min(i, j)
      let s = 0

      for (let k = 0; k < minIndex; k++) {
        s += currentRow[k] * currentColumn[k]
      }

      currentRow[j] = currentColumn[i] -= s
    }

    // Find pivot
    let pivot = j
    for (i = j + 1; i < size; i++) {
      if (Math.abs(currentColumn[i]) > Math.abs(currentColumn[pivot])) {
        pivot = i
      }
    }

    if (pivot !== j) {
      LU = matrix.rowSwitch(LU, pivot, j)
      P = matrix.rowSwitch(P, pivot, j)
    }

    if (j < size && LU[j][j] !== 0) {
      for (i = j + 1; i < size; i++) {
        LU[i][j] /= LU[j][j]
      }
    }
  }

  return [this.getL(LU), this.getU(LU), P]
}

module.exports = { mat: matrix }
