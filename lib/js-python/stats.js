const math = require('../math')
const np = require('./np')
const { erf } = require('./spec-func')
const stats = {}
stats.gmean = math.gMean

stats.hmean = math.hMean
stats.mode = math.mode

stats.skew = math.skew
stats.kurtosis = math.kurt1
stats.combinations = math.combinList
stats.permutations = math.arrangeList

// 硬币朝上的概率
stats.bernoulli = {
  rsv: function (p = 0.5, size = 1) {
    let a = []
    for (let i = 0; i < size; i++) {
      a[i] = math.bernoulli(p)
    }
    return a
  },
  pmf: function (a = [], p = 0.5) {
    return a.map(x => {
      if (x === 1) {
        return p
      }
      if (x === 0) {
        return 1 - p
      }
      return 0
    })
  },
  cdf: function (a = [], p = 0.5) {
    return a.map(x => {
      if (x < 0) {
        return 0
      }
      if (x >= 1) {
        return 1
      }
      return 1 - p
    })
  }
}
stats.binom = {
  //做某件事情的次数,做某件事情成功的概率
  rsv: function (n = 1, p = 0.5, size = 1) {
    let a = []
    for (let i = 0; i < size; i++) {
      a[i] = math.binomial(n, p)
    }
    return a
  },
  pmf: function (a = [], n, p) {
    return a.map(x => {
      return p === 0 || p === 1 ? (n * p === x ? 1 : 0) : math.combination(n, x) * p ** x * (1 - p) ** (n - x)
    })
  },
  cdf: ''
}
// 某件事k次成功的概率 1-k
stats.geom = {
  rsv: function (p = 0.5, size = 1) {
    let a = []
    for (let i = 0; i < size; i++) {
      a[i] = math.geometric(p)
    }
    return a
  },
  pmf: function (a = [], p = 0.5) {
    return a.map(x => {
      return x <= 0 ? 0 : (1 - p) ** (x - 1) * p
    })
  },
  cdf: function (a = [], p = 0.5) {
    return a.map(it => {
      return math.sum(
        np.arange(1, it + 1).map(x => {
          return x <= 0 ? 0 : (1 - p) ** (x - 1) * p
        })
      )
    })
  }
}
// 平均值:每天发生n次事 0-n
stats.poisson = {
  rsv: function (mu, size = 1) {
    let a = []
    for (let i = 0; i < size; i++) {
      a[i] = math.poisson(mu)
    }
    return a
  },
  pmf: function (a = [], mu = 1) {
    return a.map(x => {
      if (mu < 0 || x % 1 !== 0 || x < 0) {
        return 0
      }

      return (mu ** x * Math.exp(-mu)) / math.fac(x)
    })
  },
  cdf: function (a = [], mu = 1) {
    return a.map(it => {
      return math.sum(
        np.arange(0, it + 1).map(x => {
          if (mu < 0 || x % 1 !== 0 || x < 0) {
            return 0
          }

          return (mu ** x * Math.exp(-mu)) / math.fac(x)
        })
      )
    })
  }
}
stats.norm = {
  rsv: function (mu = 0, sigma = 1, size = 1) {
    let a = []
    for (let i = 0; i < size; i++) {
      a[i] = math.normal(mu, sigma)
    }
    return a
  },
  pdf: function (a = [], mu, sigma) {
    return a.map(x => {
      return Math.exp(-0.5 * Math.log(2 * Math.PI) - Math.log(sigma) - (x - mu) ** 2 / (2 * sigma * sigma))
    })
  },
  cdf: function (a = [], mu = 0, sigma = 1) {
    return a.map(x => {
      return 0.5 * (1 + erf((x - mu) / (Math.sqrt(2) * sigma)))
    })
  }
}

module.exports = stats
