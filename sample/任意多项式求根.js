const $ = require('../index')
let expr = [
  'x^3-3*x^2+2*x',
  '0.2*x^3+x^2+0.3*x-0.5',
  'x^2+1',
  'x^3-1',
  '3.13*x^2-2.21*x+5.99',
  'x^5-5*x^3+5*x-1',
  'x^4+1',
  'x^3-7*x+6',
  'x^6+x^4+x^2-x-2',
  '2*x^4+7*x^3-2*x^2-13*x+6',
  'x^4-x^3-5*x^2-6*x-4',
  'x^3+3*x^2-6*x-18',
  'x^71-x^69-2*x^68-x^67+2*x^66+2*x^65+x^64-x^63-x^62-x^61-x^60-x^59+2*x^58+5*x^57+3*x^56-2*x^55-10*x^54-3*x^53-2*x^52+6*x^51+6*x^50+x^49+9*x^48-3*x^47-7*x^46-8*x^45-8*x^44+10*x^43+6*x^42+8*x^41-5*x^40-12*x^39+7*x^38-7*x^37+7*x^36+x^35-3*x^34+10*x^33+x^32-6*x^31-2*x^30-10*x^29-3*x^28+2*x^27+9*x^26-3*x^25+14*x^24-8*x^23-7*x^21+9*x^20+3*x^19-4*x^18-10*x^17-7*x^16+12*x^15+7*x^14+2*x^13-12*x^12-4*x^11-2*x^10+5*x^9+x^7-7*x^6+7*x^5-4*x^4+12*x^3-6*x^2+3*x-6',
  'x^5+3*x^3+5x+7',
  'x^5+5*x^3+5*x-1',
  'x^5+10*x^3+20*x-4',
  'x^4-4'
]
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
  // console.log(a)

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
        cofObj['0'] = +(a[index * 2] + item[0])
      }
      if (item.length === 2) {
        cofObj['1'] = +(a[index * 2] + (item[0].split('*')[0] || 1))
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
  // console.log(cofArr)
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
    console.log('x' + idx + ':', x ? x.toFixed(15) : '0', m3.imaginaryEigenvalues[idx] ? ('+' + m3.imaginaryEigenvalues[idx].toFixed(20)).replaceAll('+-', '-') + $.c.y('i') : '')
  })
}
expr.forEach(x => {
  getRoot(x)
})
