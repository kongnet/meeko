'use strict'
const $ = require('../index')
const assert = require('assert')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}
describe('类python操作:np', () => {
  it('np.diff', () => {
    let a = [10.81, 10.85, 10.92, 10.75, 10.59, 10.86, 11.02, 11.13, 11.34]

    assertLog(
      $.math.np.diff($.math.np.log(a)).toString(),
      '0.003693448335351235,0.0064308903302903175,-0.01569021574308671,-0.01499559496035685,0.025176154892474045,0.014625489218979215,0.009932361562685177,0.018692133012152556'
    )
  })
  it('例1 np.mean', () => {
    assertLog($.math.np.mean([3265, 3260, 3245, 3484, 4146, 3323, 3649, 3200, 3031, 2069, 2581, 2841, 3609, 2838, 3541, 2759, 3248, 3314, 3101, 2834]), 3166.9)
  })
  let data = [9, 12, 15]
  let weight = [3, 4, 3]
  it('例2 np.wmean', () => {
    assertLog($.math.np.wmean(data, weight), 12)
  })
  it('例3 np.median', () => {
    assertLog($.math.np.median([3265, 3260, 3245, 3484, 4146, 3323, 3649, 3200, 3031, 2069, 2581, 2841, 3609, 2838, 3541, 2759, 3248, 3314, 3101, 2834]), 3246.5)
  })
  let ddof = 1
  it('四/方差np.std', () => {
    assertLog($.math.np.std([177, 193, 195, 209, 226], (ddof = 1)), 18.439088914585774)
  })
  it('四/方差np.std2', () => {
    assertLog($.math.np.std([192, 197, 200, 202, 209], (ddof = 1)), 6.284902544988268)
  })
  it('四/方差np.std3', () => {
    assertLog($.math.np.std([192, 197, 200, 202, 209]), 5.621387729022079)
  })
  it('np.cv', () => {
    assertLog($.math.np.cv([8, 2, 0, 0, 0], (ddof = 1)), 1.7320508075688772)
  })
  it('np.cv2', () => {
    assertLog($.math.np.cv([8, 2, 0, 0, 0]), 1.5491933384829668)
  })
  it('np.arange', () => {
    assertLog($.math.np.arange(4).join(','), '0,1,2,3')
  })
  it('np.arange2', () => {
    assertLog($.math.np.arange(1, 4).join(','), '1,2,3')
  })
  it('np.arange3', () => {
    assertLog($.math.np.arange(1, 4, 2).join(','), '1,3')
  })
  it('np.arange4', () => {
    assertLog($.math.np.arange().join(','), '0')
  })
  it('np.reshape', () => {
    assertLog($.math.np.reshape([1, 2, 3, 4], 2).length, 2)
  })
  it('np.linspace', () => {
    assertLog($.math.np.linspace(0, 4, 2).join(','), '0,4')
  })
  it('np.linspace', () => {
    assertLog($.math.np.linspace(0, 4, 0).join(','), '0')
  })
})

describe('类python操作:stats', () => {
  let size = 2

  it('stats.bernoulli.rsv', () => {
    assertLog($.math.stats.bernoulli.rsv(0.4, 10).length, 10)
  })
  it('stats.bernoulli.pmf', () => {
    assertLog($.math.stats.bernoulli.pmf([1, 1, 0, 1, 22], 0.4).join(','), '0.4,0.4,0.6,0.4,0')
  })
  it('stats.bernoulli.cdf', () => {
    assertLog($.math.stats.bernoulli.cdf([1, 1, 0, 1, 0.1], 0.4).join(','), '1,1,0.6,1,0.6')
  })
  it('stats.bernoulli.cdf2', () => {
    assertLog($.math.stats.bernoulli.cdf([-1], 0.4).join(','), '0')
  })
  it('stats.binom.rsv', () => {
    assertLog($.math.stats.binom.rsv(10, 0.4, 5).length, 5)
  })
  it('stats.binom.pmf', () => {
    assertLog($.math.stats.binom.pmf([0, 1, 2, 3, 4, 5], 5, 0.5).join(','), '0.03125,0.15625,0.3125,0.3125,0.15625,0.03125')
  })
  it('stats.geom.rsv', () => {
    assertLog($.math.stats.geom.rsv(0.5, 10).length, 10)
  })
  it('stats.geom.pmf k=10 p=0.6', () => {
    assertLog(
      $.math.stats.geom.pmf($.math.np.arange(1, 11), 0.6).join(','),
      '0.6,0.24,0.09600000000000002,0.03840000000000001,0.015360000000000002,0.006144000000000001,0.0024576000000000008,0.0009830400000000003,0.0003932160000000002,0.00015728640000000008'
    )
  })
  it('stats.geom.cdf', () => {
    assertLog($.math.stats.geom.cdf([1, 19], 0.6).join(','), '0.6,0.9999999725122092')
  })
  it('stats.poisson.rsv', () => {
    assertLog($.math.stats.poisson.rsv(2, 5).length, 5)
  })
  it('stats.poisson.pmf mu=2 k=4', () => {
    assertLog($.math.stats.poisson.pmf($.math.np.arange(0, 5), 2).join(','), '0.1353352832366127,0.2706705664732254,0.2706705664732254,0.1804470443154836,0.0902235221577418')
  })
  it('stats.poisson.pmf mu=2', () => {
    assertLog($.math.stats.poisson.pmf([-1], 2).join(','), '0')
  })
  it('stats.poisson.cdf mu=2', () => {
    assertLog($.math.stats.poisson.cdf([1, 19], 2).join(','), '0.4060058497098381,0.9999999999999357')
  })
  it('stats.poisson.cdf2 mu=2', () => {
    assertLog($.math.stats.poisson.cdf([-1], 2).join(','), '0')
  })
  it('stats.poisson.cdf2 mu=2', () => {
    assertLog($.math.stats.poisson.cdf([-1, -1], 2).join(','), '0,0')
  })
  it('stats.norm.rsv', () => {
    assertLog($.math.stats.norm.rsv(0, 1, (size = 2)).length, 2)
  })
  it('stats.norm.pdf', () => {
    assertLog(
      $.math.stats.norm
        .pdf(
          $.math.np.arange(-50, 50, 10).map(x => x / 10),
          0,
          1
        )
        .join(','),
      '0.0000014867195147342985,0.00013383022576488542,0.004431848411938009,0.053990966513188056,0.24197072451914337,0.3989422804014327,0.24197072451914337,0.053990966513188056,0.004431848411938009,0.00013383022576488542'
    )
  })
  it('stats.norm.cdf', () => {
    assertLog($.math.stats.norm.cdf([0]).join(','), '0.5')
  })
  it('stats.norm.cdf2', () => {
    assertLog($.math.stats.norm.cdf([0.5]).join(','), '0.691462461274013')
  })
})
