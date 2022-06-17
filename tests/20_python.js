'use strict'
const $ = require('../index')
const assert = require('assert')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}
describe('类python操作:np', () => {
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
    assertLog($.math.np.arange(1, 4, 2).join(','), '1,3,5')
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
/*
describe('类python操作:stats', () => {
  it('np', () => {
    assertLog('', '[[[1,0],[0.6666666666666666,1]],[[3,2],[0,1.6666666666666667]],[[0,1],[1,0]]]')
  })
})
*/
