'use strict'
const $ = require('../index')
const assert = require('assert')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}
describe('finance测试', () => {
  let a = [2235.9, 2234.09, 2236.15, 2245.05, 2204.14]
  let r
  it('logReturn收益率', () => {
    r = $.math.fi.logReturn(a)
    assertLog(r.toString(), '-0.0008098452564429925,0.0009216508043507465,0.003972155539600274,-0.018390382516682496')
  })
  it('betaRate贝塔率', () => {
    assertLog($.math.fi.betaRate(r, r), 1)
  })
  it('sharpeRate夏普率', () => {
    assertLog($.math.fi.sharpeRate(r), -6.7981991517014375)
  })
})
