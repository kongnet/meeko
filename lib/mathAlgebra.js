'use strict'
// @ts-check
/**
 * @namespace mathAlgebra
 */

const abs = Math.abs

const gaussian = A => {
  /**
   * @function gaussian
   * @memberof mathAlgebra
   * @description Gaussian elimination
   * @param  array A matrix + b vector
   * @return array x solution vector
   */

  let i, k, j
  const len = A.length

  for (i = 0; i < len; i++) {
    // Search for maximum in this column
    let [maxEl, maxRow] = [abs(A[i][i]), i]
    for (k = i + 1; k < len; k++) {
      if (abs(A[k][i]) > maxEl) {
        maxEl = abs(A[k][i])
        maxRow = k
      }
    }
    // Swap maximum row with current row (column by column)
    for (k = i; k < len + 1; k++) {
      const tmp = A[maxRow][k]
      A[maxRow][k] = A[i][k]
      A[i][k] = tmp
    }
    // Make all rows below this one 0 in current column
    for (k = i + 1; k < len; k++) {
      const c = -A[k][i] / A[i][i]
      for (j = i; j < len + 1; j++) {
        if (i === j) {
          A[k][j] = 0
        } else {
          A[k][j] += c * A[i][j]
        }
      }
    }
  }
  // 解恒等式 Ax=b
  const x = '0'.repeat(len).split('')
  for (i = len - 1; i > -1; i--) {
    x[i] = A[i][len] / A[i][i]
    for (k = i - 1; k > -1; k--) {
      A[k][len] -= A[k][i] * x[i]
    }
  }
  return x
}
const gcd = (a, b) => {
  let t
  while (b) {
    t = b
    b = a % b
    a = t
  }
  return a
}
const lcm = (a, b) => {
  return (a * b) / gcd(a, b)
}
const primeFactorOne = x => {
  if (x === 0 || x === 1) {
    return x
  }
  if (x % 2 === 0) {
    return 2
  }
  const squareRoot = Math.sqrt(x)
  for (let i = 3; i <= squareRoot; i += 2) {
    if (x % i === 0) {
      return i
    }
  }
  return x
}
const primeFactor = x => {
  const a = []
  let num = x
  while (num) {
    const primeOne = primeFactorOne(num)
    if (primeOne === num) {
      a.push(primeOne)
      return a
    } else {
      a.push(primeOne)
      num /= primeOne
    }
  }
  a.push(0)

  return a
}
module.exports = {
  primeFactor,
  lcm,
  gaussian,
  gcd
}
