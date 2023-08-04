const $ = require('../index')
let expr = ['x^3-3*x^2+2*x', '0.2*x^3+x^2+0.3*x-0.5', 'x^2+1', 'x^3-1', '3.13*x^2-2.21*x+5.99', 'x^5-5*x^3+5*x-1']
let exprDv = '0.6*x^2+2*x+0.3'

function approx (a, b) {
  return Math.abs(a - b) <= 1e-10
}
function nPolyn (cofArr = [], x = 0) {
  let len = cofArr.length - 1
  let sum = cofArr.reduce((a, b, idx) => {
    return a + b * x ** (len - idx)
  }, 0)
  return sum
}
function expr2Cof (expr, symbol = 'x') {
  let a = expr.replaceAll(' ', '').split(/(\+|-)/g)
  if (a[0] === '') {
    a.shift()
  }
  if (a[0] !== '-') {
    a.unshift('+')
  }
  //   console.log(a)

  let cofObj = {}
  let maxPow = 0
  let a1 = a.filter((x, idx) => idx % 2 === 1)
  // console.log(a1)

  a1.map((x, index) => {
    let item = x.split(symbol)
    if (item[1]) {
      cofObj[item[1].split('^')[1]] = +(a[index * 2] + (item[0].split('*')[0] || '1'))
      maxPow = +item[1].split('^')[1] > maxPow ? item[1].split('^')[1] : maxPow
    } else {
      if (item.length === 1) {
        cofObj['0'] = +(a[index * 2] + x)
      }
      if (item.length === 2) {
        cofObj['1'] = +x.split('*')[0]
        maxPow = 1 > maxPow ? 1 : maxPow
      }
    }
    // console.log(x, item.length, item[0], item[1])
  })
  // console.log(a, cofObj, maxPow)
  let cofArr = []
  let cofExprArr = []

  for (let i = 0; i <= maxPow; i++) {
    if (cofObj[i]) {
      cofArr.unshift(cofObj[i])
      cofExprArr.unshift(cofObj[i] + (i === 0 ? '' : '*x^' + i))
    } else {
      cofArr.unshift(0)
    }
  }
  return { cofArr, cofObj, cofStr: cofExprArr.join('+').replaceAll('+-', '-') }
}
function getRoot (expr) {
  let { cofArr, cofObj } = expr2Cof(expr)
  let cofArrNew = cofArr.copy()
  let highCof = cofArrNew.reverse().pop()
  let transCofArr = cofArrNew.map(x => -x / highCof)
  let comMatrix = []

  for (let i = 0; i < transCofArr.length; i++) {
    comMatrix.push([])
    for (let j = 0; j < transCofArr.length; j++) {
      if (j === transCofArr.length - 1) {
        comMatrix[i][j] = transCofArr[i]
      } else {
        if (i > 0) {
          comMatrix[i][j] = i === j + 1 ? 1 : 0
        } else {
          comMatrix[i][j] = 0
        }
      }
    }
  }
  let m3 = new $.ml.Evd(comMatrix)
  console.log('\nPolynomial:', expr)
  console.log('Root:')

  m3.realEigenvalues.map((x, idx) => {
    console.log('x' + idx + ':', x ? x.toFixed(6) : '0', m3.imaginaryEigenvalues[idx] ? ('+' + m3.imaginaryEigenvalues[idx].toFixed(6)).replaceAll('+-', '-') + $.c.y('i') : '')
  })
}
expr.map(x => {
  getRoot(x)
})
