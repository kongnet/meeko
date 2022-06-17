const erf = function erf (x) {
  // https://ww2.mathworks.cn/help/matlab/ref/erf.html
  // https://baike.baidu.com/item/%E8%AF%AF%E5%B7%AE%E5%87%BD%E6%95%B0/5890875?fr=aladdin
  let cof = [
    -1.3026537197817094,
    6.419697923564903e-1,
    1.9476473204185836e-2,
    -9.561514786808631e-3,
    -9.46595344482036e-4,
    3.66839497852761e-4,
    4.2523324806907e-5,
    -2.0278578112534e-5,
    -1.624290004647e-6,
    1.30365583558e-6,
    1.5626441722e-8,
    -8.5238095915e-8,
    6.529054439e-9,
    5.059343495e-9,
    -9.91364156e-10,
    -2.27365122e-10,
    9.6467911e-11,
    2.394038e-12,
    -6.886027e-12,
    8.94487e-13,
    3.13092e-13,
    -1.12708e-13,
    3.81e-16,
    7.106e-15,
    -1.523e-15,
    -9.4e-17,
    1.21e-16,
    -2.8e-17
  ]
  let j = cof.length - 1
  let isneg = false
  let d = 0
  let dd = 0
  let t, ty, tmp, res

  if (x < 0) {
    x = -x
    isneg = true
  }

  t = 2 / (2 + x)
  ty = 4 * t - 2

  for (; j > 0; j--) {
    tmp = d
    d = ty * d - dd + cof[j]
    dd = tmp
  }

  res = t * Math.exp(-x * x + 0.5 * (cof[0] + ty * d) - dd)
  return isneg ? res - 1 : 1 - res
}

module.exports = { erf }
