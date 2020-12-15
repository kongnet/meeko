const {
  math: { Matrix }
} = require('../index')

const a = [
  [1, 4, 7, 10],
  [2, 5, 8, 11],
  [3, 6, 9, 12]
]
const b = [
  [1, 4, 7, 10],
  [2, 5, 8, 11],
  [3, 6, 9, 12]
]
const m1 = new Matrix(a, ['c1', 'c2', 'c3'], ['r1', 'r2', 'r3'])

// m1.c([1, 2, 3, 4])
m1.print()
m1.T()
m1.print()

m1.T()
m1.sub(b)
m1.print()

const m2 = new Matrix(
  a,
  ['c1', 'c2', 'c3', 'c4', 'c5'],
  ['r1', 'r2', 'r3', 'r4', 'r5']
)
m2.mul(2)
m2.print()
m2.mul(0.5)
m2.T().mul(b)
m2.print()
m2.print(m2.diag([1, 2, 3, 4, 5]))
m2.print(
  m2.eigen([
    [2, 1, 1, 1],
    [1, 2, 1, 1],
    [1, 1, 2, 1],
    [1, 1, 1, 2]
  ]).d
)
console.log(m2.rowStat(a))
console.log(m2.colStat(a))
console.log(m2.row)

const m3 = new Matrix([
  [4, 12, -16],
  [12, 37, -43],
  [-16, -43, 98]
])

m3.log(m3.dc().choleskey.lowerTriangularMatrix)
m3.log(m3.dc().qr.orthogonalMatrix)
