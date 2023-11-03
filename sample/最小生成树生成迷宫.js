const $ = require('meeko')
async function main () {
  const W = [] // edge
  const U = {} // 未分配
  const V = {} // 已分配

  const [m, n, modVal] = [20, 20, 100]
  let count = 0
  for (let i = 0; i < m; i++) {
    W[i] = []
    for (let j = 0; j < n; j++) {
      W[i][j] = 1
      count++
    }
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      //所有距离都是1,可以链接的其他node
      U[i * modVal + j + ''] = {
        name: i * modVal + j + '',
        link: [
          (W[i - 1] || [])[j] ? (i - 1) * modVal + j + '' : 0,
          W[i][j + 1] ? i * modVal + (j + 1) + '' : 0,
          (W[i + 1] || [])[j] ? (i + 1) * modVal + j + '' : 0,
          W[i][j - 1] ? i * modVal + (j - 1) + '' : 0
        ],
        pre: [0, 0, 0, 0], //链入开始为空
        next: [0, 0, 0, 0], //链出开始为空
        connect: []
      }
    }
  }
  let t = +new Date()
  V['0'] = U['0']
  V['0'].pre[3] = 1 //左入
  delete U['0']
  for (let i = 0; i < m * n - 1; i++) {
    let uArr = Object.keys(U) //.filter(Boolean)
    let vArr = Object.keys(V) //.filter(Boolean)

    vArr = vArr.filter(x => {
      return V[x].link.some(x => uArr.includes(x))
    })
    let r = vArr.pick()
    let r1 = V[r].link.pick()
    while (r1 === 0 || V[r1]) {
      r1 = V[r].link.pick()
    }

    V[r].connect.push(r1)
    V[r].next[V[r].link.findIndex(x => x === r1)] = 1
    V[r1] = U[r1]
    V[r1].pre[V[r1].link.findIndex(x => x === r)] = 1
    delete U[r1]
  }
  V[(m - 1) * modVal + (n - 1) + ''].next[1] = 1 // 最后一个右边出口
  let result = {}
  Object.keys(V).forEach(x => {
    result[V[x].name] = [V[x].next[0] | V[x].pre[0], V[x].next[1] | V[x].pre[1], V[x].next[2] | V[x].pre[2], V[x].next[3] | V[x].pre[3]].join(',')
  })
  console.log(JSON.stringify(result))
  console.log(+new Date() - t)
}

main()
