'use strict'
const $ = require('../index')
const assert = require('assert')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}
describe('KNN', () => {
  it('电影分类', () => {
    // 维度解释 搞笑，拥抱，打斗
    const movieObjArr = [
      { name: '宝贝当家', dim: [45, 2, 9], tag: '喜剧片' },
      { name: '美人鱼', dim: [21, 17, 5], tag: '喜剧片' },
      { name: '澳门风云3', dim: [54, 9, 11], tag: '喜剧片' },
      { name: '功夫熊猫3', dim: [39, 0, 31], tag: '喜剧片' },
      { name: '谍影重重', dim: [5, 2, 57], tag: '动作片' },
      { name: '叶问3', dim: [3, 2, 65], tag: '动作片' },
      { name: '伦敦陷落', dim: [2, 3, 55], tag: '动作片' },
      { name: '我的特工爷爷', dim: [6, 4, 21], tag: '动作片' },
      { name: '奔爱', dim: [7, 46, 4], tag: '爱情片' },
      { name: '夜孔雀', dim: [9, 39, 8], tag: '爱情片' },
      { name: '代理情人', dim: [9, 38, 2], tag: '爱情片' },
      { name: '新步步惊心', dim: [8, 34, 17], tag: '爱情片' }
    ]

    const movieDim = []
    const movieTag = []
    movieObjArr.forEach(item => {
      movieDim.push(item.dim)
      movieTag.push(item.tag)
    })
    const knn = new $.ml.Knn()
    ;['euclidean'].forEach(item => {
      // console.log(item)
      knn.set(movieDim, movieTag, 3, item) // 先学习
      console.log('自动计算最佳K值', knn.optimize())
    })

    knn.set(movieDim, movieTag, 4, 'euclideans') // 先学习
    assertLog(JSON.stringify(knn.predict([23, 3, 17])), '{"result":{"tag":"动作片","maxValue":2},"whole":{"动作片":2,"喜剧片":2},"algorithm":"euclideans"}') // 分类 唐人街探案: [23, 3, 17,???] 属于什么类型电影
    knn.set(movieDim, movieTag, 3, 'euclidean') // 先学习
    assertLog(JSON.stringify(knn.predict([23, 3, 17])), '{"result":{"tag":"喜剧片","maxValue":2},"whole":{"动作片":1,"喜剧片":2},"algorithm":"euclidean"}') // 分类 唐人街探案: [23, 3, 17,???] 属于什么类型电影
  })
})
