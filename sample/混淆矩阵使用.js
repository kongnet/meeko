const $ = require('../index')
// 例子pe计算有误，但有参考价值 https://baike.baidu.com/item/kappa%E7%B3%BB%E6%95%B0/9385025?fr=aladdin

// 自动形成标签-索引map
const cm = new $.ml.util.ConfusionMatrix({ A: 261, B: 103, C: 300 })
cm.addCountByKey('A', 'A', 239)
cm.addCountByKey('B', 'B', 73)
cm.addCountByKey('C', 'C', 280)
cm.addCountByKey('B', 'A', 16)
cm.addCountByKey('C', 'A', 6)
cm.addCountByKey('C', 'B', 9)
cm.addCountByKey('A', 'B', 21)
cm.addCountByKey('A', 'C', 16)
cm.addCountByKey('B', 'C', 4)

console.log(cm.getKappa())
