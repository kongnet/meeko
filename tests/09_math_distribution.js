'use strict'
const $ = require('../index')
const assert = require('assert')
require('chai').should()
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}
const random = $.math

describe('各类分布的随机产生', function () {
  describe('generate', function () {
    it('产生随机数通过 Arcsine', function () {
      random.arcsine(0, 1).should.be.a('number')
      global.assertCount++
    })
    it('产生随机数通过 Beta', function () {
      random.beta(1, 1, 0, 1).should.be.a('number')
      global.assertCount++
      random.beta(0, 1, 0, 1).should.be.a('number')
      global.assertCount++
    })
    it('产生随机数通过 Cauchy', function () {
      random.cauchy(1, 1).should.be.a('number')
      global.assertCount++
    })
    it('产生随机数通过 Chi-Square', function () {
      random.chiSquare(1).should.be.a('number')
      global.assertCount++
    })
    it('产生随机数通过 Cosine', function () {
      random.cosine(0, 1).should.be.a('number')
      global.assertCount++
    })
    it('产生随机数通过 DoubleLog', function () {
      random.doubleLog(0, 1).should.be.a('number')
      global.assertCount++
      random.doubleLog(1, 2).should.be.a('number')
      global.assertCount++
      random.doubleLog(2, 3).should.be.a('number')
      global.assertCount++
      random.doubleLog(3, 4).should.be.a('number')
      global.assertCount++
      random.doubleLog(4, 5).should.be.a('number')
      global.assertCount++
      random.doubleLog(2, 15).should.be.a('number')
      global.assertCount++
      random.doubleLog(3, 55).should.be.a('number')
      global.assertCount++
    })
    it('产生随机数通过 Erlang', function () {
      random.erlang(1, 1).should.be.a('number')
      global.assertCount++
      random.erlang(1, 2).should.be.a('number')
      global.assertCount++
    })
    it('产生随机数通过 Exponential', function () {
      random.exponential(1, 1).should.be.a('number')
      global.assertCount++
    })
    it('产生随机数通过 ExtremeValue', function () {
      random.extremeValue(0.5, 5, 0, 1).should.be.a('number')
      global.assertCount++
    })
    it('产生随机数通过 F Ratio', function () {
      random.fRatio(1, 1).should.be.a('number')
      global.assertCount++
    })
    it('产生随机数通过 Gamma', function () {
      random.gamma(1, 1, 1).should.be.a('number')
      global.assertCount++
      random.gamma(1, 1, 3).should.be.a('number')
      global.assertCount++
      random.gamma(1, 1, 5).should.be.a('number')
      global.assertCount++
      random.gamma(1, 1, -1).should.be.a('number')
      global.assertCount++
      random.gamma(1, 1, 2).should.be.a('number')
      global.assertCount++
      random.gamma(1, 0, 4).should.be.a('number')
      global.assertCount++
      random.gamma(1, -1, 8).should.be.a('number')
      global.assertCount++
      random.gamma(1, 1, 4).should.be.a('number')
      global.assertCount++
      random.gamma(1, -2, 8).should.be.a('number')
      global.assertCount++
      random.gamma(1, -3, 4).should.be.a('number')
      global.assertCount++
      random.gamma(1, -1, 1).should.be.a('number')
      global.assertCount++
      random.gamma(2, 0, 10).should.be.a('number')
      global.assertCount++
      random.gamma(3, 1, 100).should.be.a('number')
      global.assertCount++
    })
    it('产生随机数通过 Laplace', function () {
      random.laplace(1, 1).should.be.a('number')
      global.assertCount++
      random.laplace(1, 10).should.be.a('number')
      global.assertCount++
      random.laplace(10, 1).should.be.a('number')
      global.assertCount++
      random.laplace(1, 1).should.be.a('number')
      global.assertCount++
      random.laplace(1, 10).should.be.a('number')
      global.assertCount++
      random.laplace(10, 1).should.be.a('number')
      global.assertCount++
    })
    it('产生随机数通过 Logarithmic', function () {
      random.logarithmic(0, 1).should.be.a('number')
      global.assertCount++
    })
    it('产生随机数通过 Logistic', function () {
      random.logistic(1, 1).should.be.a('number')
      global.assertCount++
    })
    it('产生随机数通过 Lognormal', function () {
      random.lognormal(1, 1, 1).should.be.a('number')
      global.assertCount++
    })
    it('产生随机数通过 Normal', function () {
      random.normal(1, 1).should.be.a('number')
      global.assertCount++
    })
    it('产生随机数通过 Parabolic', function () {
      random.parabolic(0, 1).should.be.a('number')
      global.assertCount++
    })
    it('产生随机数通过 Pareto', function () {
      random.pareto(1).should.be.a('number')
      global.assertCount++
    })
    it('产生随机数通过 Pearson5', function () {
      random.pearson5(1, 1).should.be.a('number')
      global.assertCount++
    })
    it('产生随机数通过 Pearson6', function () {
      random.pearson6(1, 1, 1).should.be.a('number')
      global.assertCount++
    })
    it('产生随机数通过 Power', function () {
      random.power(1).should.be.a('number')
      global.assertCount++
    })
    it('产生随机数通过 Rayleigh', function () {
      random.rayleigh(1, 1).should.be.a('number')
      global.assertCount++
    })
    it("产生随机数通过 Student's T", function () {
      random.studentT(1).should.be.a('number')
      global.assertCount++
    })
    it('产生随机数通过 Triangular', function () {
      random.triangular(0, 1, 1).should.be.a('number')
      global.assertCount++
      random.triangular(0, 10, 1).should.be.a('number')
      global.assertCount++
      random.triangular(0, 1, 10).should.be.a('number')
      global.assertCount++
      random.triangular(1, 1, 1).should.be.a('number')
      global.assertCount++
      random.triangular(2, 10, 1).should.be.a('number')
      global.assertCount++
      random.triangular(3, 1, 10).should.be.a('number')
      global.assertCount++
    })
    it('产生随机数通过 Uniform', function () {
      random.uniformBase(0, 1).should.be.a('number')
      global.assertCount++
    })
    it('产生随机数通过 Weibull', function () {
      random.weibull(1, 1, 1).should.be.a('number')
      global.assertCount++
    })
    it('产生随机数通过 Bernoulli', function () {
      random.bernoulli(0.5).should.be.a('number')
      global.assertCount++
    })
    it('产生随机数通过 Binomial', function () {
      random.binomial(10, 0.5).should.be.a('number')
      global.assertCount++
    })
    it('产生随机数通过 Geometric', function () {
      random.geometric(0.5).should.be.a('number')
      global.assertCount++
    })
    it('产生随机数通过 Hypergeometric', function () {
      random.hypergeometric(6, 10, 4).should.be.a('number')
      global.assertCount++
    })
    it('产生随机数通过 NegativeBinomial', function () {
      random.negativeBinomial(5, 0.5).should.be.a('number')
      global.assertCount++
    })
    it('产生随机数通过 Pascal', function () {
      random.pascal(5, 0.5).should.be.a('number')
      global.assertCount++
    })
    it('产生随机数通过 Poisson', function () {
      random.poisson(5).should.be.a('number')
      global.assertCount++
    })
    it('产生随机数通过 UniformDiscrete', function () {
      random.uniformDiscrete(1, 10).should.be.a('number')
      global.assertCount++
    })
  })
})
