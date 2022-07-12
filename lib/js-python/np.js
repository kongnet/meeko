const math = require('../math')
const np = {}
np.log = function (data) {
  return data.map(x => Math.log(x))
}
np.diff = function (a) {
  let r = []
  a.reduce((prev, cur, idx) => {
    r[idx - 1] = cur - prev
    return cur
  })

  return r
}
np.linspace = function (s, e, num) {
  num = num | 0
  if (num <= 1) {
    return [s]
  }
  let step = (e - s) / (num - 1)
  let scale = 10 ** Math.abs(Math.log10(step))
  step *= scale
  const a = []
  let n = 0
  for (let i = s * scale; i <= e * scale; i += step) {
    a[n] = i / scale
    n++
  }
  return a
}
np.std = function (data, ddof = 0) {
  return ddof ? math.stddevCorrect(data) : math.stddev(data)
}
np.median = math.median
np.mean = math.mean
np.cv = function (data, ddof = 0) {
  return np.std(data, ddof) / math.mean(data)
}

np.dot = math.mat.dot
np.arange = function arange (...arg) {
  let len = arg?.length
  if (len === 1) {
    return math.genRange(0, arg[0] - 1)
  }
  if (len === 2) {
    return math.genRange(arg[0], arg[1] - 1)
  }
  if (len === 3) {
    return math.genRange(arg[0], arg[1] - 1, arg[2])
  }
  return [0]
}
np.reshape = function reshape (ary, a, b) {
  return ary.chunk(a, b)
}
np.inv = math.mat.inv
np.wmean = function (data, weight) {
  return np.dot(data, weight) / math.sum(weight)
}

module.exports = np
