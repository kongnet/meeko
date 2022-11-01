# meeko

## 文档 Document

![Build Stat](https://api.travis-ci.org/kongnet/meeko.svg?branch=master) [![Coverage Status](https://coveralls.io/repos/github/kongnet/meeko/badge.svg?branch=master)](https://coveralls.io/github/kongnet/meeko?branch=master)

[![NPM](https://nodei.co/npm/meeko.png?downloads=true&stars=true)](https://nodei.co/npm/meeko/)

[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/kongnet/meeko)

[![meeko](https://img.shields.io/npm/dy/meeko.svg)](https://img.shields.io/npm/dy/meeko.svg) [![meeko](https://img.shields.io/npm/l/meeko.svg?style=popout)](https://img.shields.io/npm/l/meeko.svg?style=popout) [![meeko](https://img.shields.io/github/package-json/v/kongnet/meeko.svg?style=popout)](https://img.shields.io/github/package-json/v/kongnet/meeko.svg?style=popout) [![meeko](https://img.shields.io/github/commit-activity/y/kongnet/meeko.svg?style=popout)](https://img.shields.io/github/commit-activity/y/kongnet/meeko.svg?style=popout)

[![meeko](https://img.shields.io/github/repo-size/kongnet/meeko.svg)](https://img.shields.io/github/repo-size/kongnet/meeko.svg)

[![meeko](https://img.shields.io/sonar/https/sonarcloud.io/meeko/tech_debt.svg)](https://img.shields.io/sonar/https/sonarcloud.io/meeko/tech_debt.svg) [![meeko](https://img.shields.io/sonar/https/sonarcloud.io/meeko/violations.svg?style=popout&format=long)](https://sonarcloud.io/dashboard?id=meeko)

[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=meeko)](https://sonarcloud.io/dashboard?id=meeko)

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fkongnet%2Fmeeko.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fkongnet%2Fmeeko?ref=badge_large)

## 安装

```js
npm i meeko
```

## Meeko 文档生成

```js
npm run jsdoc
```

> jsdoc 对 BigInt 解析存在问题,我的修复方案 https://github.com/jsdoc/jsdoc/issues/1918#issuecomment-1104054464

## 整体架构

![architecture](https://github.com/kongnet/meeko/raw/master/screenShot/architecture.png)

## Nodejs 用法

```js
const $ = require('meeko')
// 傅里叶分析
$.math.fourierAnalysis([1, 2, 1, 2, 1, 2, 1, 2])
```

## Browser 浏览器用法

```js
import * as $ from 'meeko'
// meeko无依赖的，决策树学习
const data = [
  ['色泽', '根蒂', '敲声', '纹理', '脐部', '触感', '好坏'],
  ['青绿', '蜷缩', '浊响', '清晰', '凹陷', '硬滑', '好瓜'],
  ['乌黑', '蜷缩', '沉闷', '清晰', '凹陷', '硬滑', '好瓜'],
  ['乌黑', '蜷缩', '浊响', '清晰', '凹陷', '硬滑', '好瓜'],
  ['青绿', '蜷缩', '沉闷', '清晰', '凹陷', '硬滑', '好瓜'],
  ['浅白', '蜷缩', '浊响', '清晰', '凹陷', '硬滑', '好瓜'],
  ['青绿', '稍蜷', '浊响', '清晰', '稍凹', '软粘', '好瓜'],
  ['乌黑', '稍蜷', '浊响', '稍糊', '稍凹', '软粘', '好瓜'],
  ['乌黑', '稍蜷', '浊响', '清晰', '稍凹', '硬滑', '好瓜'],
  ['乌黑', '稍蜷', '沉闷', '稍糊', '稍凹', '硬滑', '坏瓜'],
  ['青绿', '硬挺', '清脆', '清晰', '平坦', '软粘', '坏瓜'],
  ['浅白', '硬挺', '清脆', '模糊', '平坦', '硬滑', '坏瓜'],
  ['浅白', '蜷缩', '浊响', '模糊', '平坦', '软粘', '坏瓜'],
  ['青绿', '稍蜷', '浊响', '稍糊', '凹陷', '硬滑', '坏瓜'],
  ['浅白', '稍蜷', '沉闷', '稍糊', '凹陷', '硬滑', '坏瓜'],
  ['乌黑', '稍蜷', '浊响', '清晰', '稍凹', '软粘', '坏瓜'],
  ['浅白', '蜷缩', '浊响', '模糊', '平坦', '硬滑', '坏瓜'],
  ['青绿', '蜷缩', '沉闷', '稍糊', '稍凹', '硬滑', '坏瓜']
]
const tree1 = new $.ml.DecisionTree(data.slice(1), data[0])
tree1.printTree()
```

## 100%全覆盖率测试

```js
npm test
```

## 开始你的征途 Start your way

```js
let $ = require('meeko')
```

## 常用机器学习常用距离和相似度 math.dist 下

- Euclidean Distance(欧式距离)
- Standardized Euclidean Distance(标准化欧氏距离)
- ManhattanDistance(曼哈顿距离)
- mahalanobis(马氏距离) ml.util 下
- LanceDistance(兰氏距离)
- LevenshteinDistance(Levenshtein 距离)/editDistance(编辑距离)
- Chebyshev Distance(切比雪夫距离)
- HammingDistance(汉明距离)
- 杰卡德相似系数
- 杰卡德距离
- Cos(Cosine 余弦)相似度
- Dice 相关系数

## 矩阵基础操作 math.mat 下

- 复制矩阵
- 矩阵转置
- 加法
- 减法
- 比例
- 叉乘
- 点乘
- 矩阵行列式
- 矩阵获取列
- 矩阵获取列
- 全 0 矩阵
- 单位矩阵
- 高斯约旦消元法
- 高斯约旦消元法求逆矩阵

## 矩阵高级操作 math.Matrix 下

- R 语言矩阵基础操作
- 1 创建一个向量 ok
- 2 创建一个矩阵 ok
- 3 矩阵转置 ok
- 4 矩阵相加减 ok
- 5 数与矩阵相 ok
- 6 矩阵相乘 ok
- 7 矩阵对角元素相关运算 ok
- 设置数 ok
- 设置数组 ok
- 获取方阵对角线 ok
- 8 矩阵求逆 ok
- 9 矩阵的特征值与特征向量 ok 雅克比迭代
- 10 矩阵的 Choleskey 分解 ok
- 11 矩阵奇异值分解 【SVD】ok
- 12 矩阵 QR 分解 ok
- 13 矩阵广义逆(Moore-Penrose)
- 14 矩阵 Kronecker 积
- 15 矩阵的维数 ok
- 16 矩阵的行和、列和、行平均与列平均 ok 【sum mean 中位 方差 标准差】
- 17 矩阵 X'X 的逆
- 18 取矩阵的上、下三角部分
- 19 backsolve&fowardsolve 函数
- 20 row()与 col()函 ok
- 21 行列式的值 ok
- 22 向量化算子
- 23 时间序列的滞后值

## 数学函数 Math function

- _intersect (a = [])_ 交集

```js
[1,2,3].intersect([3,4,5]) => [3]
```

- _union (a = [])_ 并集

```js
[1,2,3].union([3,4,5]) => [1,2,3,4,5]
```

- _except (a = [])_ AB 差集 属于 A 不属于 B BA 差集 反之

```js
[1, 2, 3, 4].except([2, 3, 5]) => [1,4]
[2, 3, 5].except([1, 2, 3, 4]) => [5]
```

- _\$.math.linearFitting (x = [],y = [])_ --------线性拟合 y=a\*x+b
- _\$.math.exponentFitting (x = [],y = [])_ ---指数拟合 y=a*e^(b*x)
- _\$.math.lnFitting (x = [],y = [])_ -------------对数拟合 y=a\*ln(x)+b
- _\$.math.powerFitting (x = [],y = [])_ -------幂函数拟合 y=a\*x^b
- _\$.math.pearson (x = [],y = [])_ -------------皮尔森相似度

## JSON color format

```js
* $.dir(object)
* 内部10行代码实现 注意字符串下标数组无法显示
* 支持BigInt类型
```

![JSON color format](https://github.com/kongnet/meeko/raw/master/screenShot/jsonFormat.png)

```js
let colWidth = [5, 10, 6]
let data = [
  { id: '1', b: 'aaa', c: 'cccc1' },
  { id: '2', b: 'bbb', c: 'cccc2' },
  { id: '3', b: 'ccc', c: 'cccc3' }
]
$.drawTable(data, colWidth)
```

![drawTable](https://github.com/kongnet/meeko/raw/master/screenShot/drawTable.png)

## 命令行 Spinner 动画

```js
let spinner = new $.Spinner('dots2')
spinner.start()
// '⣾⣽⣻⢿⡿⣟⣯⣷'
```

## mock 扩展

```js
genDatetime // 产生起始日期-终止日期中间的日期 形式为 YYYY-MM-DD hh:mm:ss genDatetime('2016-1-1' '2016-2-2')
genData // 产生 指定字符串中用到的字符 返回指定长度  genData('abcdefghijklmnopqrstuvwxyz',10)
genName // 随机返回2-3的人名
genCard // 随机返回形式合格的身份码
genIp // 随机ip地址
genUrl // 随机返回 中间随机长度的 url genUrl(5)
genPhone // 随机返回 中国手机号码
genColor // 随机范围 hex颜色 和 rgba颜色 genColor('rgba')
genWord // 返回指定长度的中文常用字
genText // 返回指定长度的随机句子 >10才会有，。 也占1个汉字
genConstellation // 随机返回星座
genBool // 随机返回0,1`@genBool`
genEnum // 随机范围 数组的一个值 genEnum([1,2,3,'5x'])
```

## 颜色基本函数 Color basic function

```js
$.log($.c.dimr('dimred', backGroundColor[41 - 47], isUnderline))
```

## 日期格式化 Date format

```js
yyyy/YYYY mm/MM ww/WW dd/DD hh/HH mm ss SS(毫秒) q(季度) X(unix秒)
$.now().format('X')
```

## 基础数据类型判断函数 Data type check

- _isObj===isObject_ 只接受对象型
- _isStringt_ 只接字符型

```js
其他对象会强制转化为String
注意, 不要设置默认值, 不是字符串, 有长度len判断时会有风险
```

- _isBoolean_ 只接受布尔型
- _isBool_ 泛布尔型

```js
[0, 1, true, false, '0', '1', 'true', 'false']都可以
```

- _isNumber_ 只接受浮点型，也不接受{},[]等内部转换
- _isBigInt_ 只接受 bigInt 型
- _isArray_ 只接受数组 t 型
- _isNull_ 只接受 null 型
- _isUndefined_ 只接受 undefined 型
- _isRegExp_ 只接受正则型

- _isDecimal_ 泛浮点型

```js
[null, undefined, 正则, 布尔值, {}, []]不可以
可以化为数值的字符串 可以, 但类似 '1x' 不可以
```

- _isInt 整型 isPInt 正整型 isNInt 负整型_

```js
同isDecimal 原则
```

- _isDate_

```js
可以化为日期的字符串，日期型都可以。日期型没意义因为初始化就确定时间了,日期字
符型必须有 “/” 或者 “-”
#now() 作为默认值代表 当前时间
```

## checkParam

```js
增加 enum类型，def不起作用 size设置不能为空,且为数组
```

## 原型扩展 Array prototype

- _remove (idx = 0, len = 1)_

```js
[1, 2, 3, 4, 5].remove(1,2) => [1,4,5]
```

- _count()_

```js
 ['A', 'B', 'B', 'C', 'A', 'D'].count() => {"A":2,"B":2,"C":1,"D":1}
```

- _flatten()_

```js
[1, [2, [3, [4, 5], 6], 7], 8].flatten() => [1,2,3,4,5,6,7,8]
```

- _orderBy()_

```js
[{ name: 'A', age: 48 }, { name: 'B', age: 36 }, { name: 'C', age: 26 }]
.orderBy(['age'],['asc'])
=> [{"name":"C","age":26},{"name":"B","age":36},{"name":"A","age":48}] 默认升序
```

## 原型扩展 String prototype

- _upperFirst()_ ----------------将首字母变成大写,其他小写
- _String.render(o)_ ----------字符串模板渲染
- _fillStr(str, len, pos = 1)_ --填入什么字符多少位,中文算 2 个字符,pos 1 右面填，-1 左面填

### Notice

```js
$.tools.checkParam(obj)
* obj 如果为日期格式,日期格式为UTC日期
* 请在前端写入mysql之前 date.date2Str()一下
* 否则需要主动调用mysql的转换utc时间的函数
```

## 正则发生器 RegExp generator

```js
r = '(你|我|他)'
console.log($.reg.gen(r))
```

## 路径下所有 js 文件全加载

```js
$.requireAll() // 加载某个目录下的所有对象，默认 __dirname
```

## 分布式雪花碎片算法 每秒可以产生超过 200 万 不重复 id

```js
new $.Snowflake(workId, dataCenterId, sequence) // 工作进程id ，服务器id，开始序号
```

## 一个函数的输出是另一个函数的输入 pipe

```js
 let r = $.pipe(x => x.toUpperCase(), ------单词变大写
      a => a.split(''), --------------------分成数组
      a => a[3], ---------------------------取下标3
      s => s.charCodeAt(0).toString(16), ---变为16进制
      s => s.fillStr('0', 4, -1), ----------不足4位部分左边填0
      s => `\\u${s}` -----------------------转成\uxxxx 形式
    )('Test') ------------------------------ => \u0054
```

![nb_text](https://github.com/kongnet/meeko/raw/master/screenShot/nb_text.png)

## 特征工程之 PCA 鸢尾花降维

![nb_text](https://github.com/kongnet/meeko/raw/master/screenShot/pca.png)

## 常用用错概念 await 某实例的 then 函数

```javascript
function thenFunc () {
  let me = this
  me.then = async function (resolve, reject) {
    await $.wait(2000)
    resolve('success')
    reject('failure')
    console.log(2)
  }
  me.a1 = 'a1'
  return me
}

async function init () {
  try {
    let r = new thenFunc()
    await r
    console.log(11, r)
  } catch (err) {
    console.log(err)
  }
}
init()
process.on('unhandledRejection', function (e) {
  console.log(e, 'xxx')
})
```

https://gitmoji.carloscuesta.me/

## 趣题收集

```js
// 小明玩王者荣耀胜率为50% 每天玩10局，问每天小明连胜3局以上的概率是多少？
// 解法一
const $ = require('meeko')
const times = 3000000 // 总模拟次数
console.log(
  '10'
    .repeat(times / 2)
    .split('') // 填入一半1 一半0
    .fisherYates() // 洗牌算法
    .chunk(10) // 按10个一组分组,每天10局
    .filter(item => /1{3,10}/g.test(item.join(''))).length / // 找出10次内满足 3次-10次连胜的情况
    (times / 10) // 换算到每天
)
// 0.5080 => 50%

// 解法二
/**
 * 样本空间 10
 * 胜利概率 1/2 成功 失败
 * 目标 大于连续三次胜利
 */
function 获取大于连续三次胜利概率 (测试次数 = 10000) {
  let 测试通过 = 0
  function 玩一天 () {
    胜利次数 = 0
    for (let i = 0; i < 10; i++) {
      if (成功吗()) {
        if (++胜利次数 === 3) return 测试通过++
      } else {
        胜利次数 = 0
      }
    }
  }
  for (let i = 0; i < 测试次数; i++) 玩一天()
  return 测试通过 / 测试次数
}

function 成功吗 () {
  return Math.random() > 0.5
}

function 单元测试__成功吗 () {
  let 测试通过 = 0
  let 测试次数 = 1000
  for (let i = 0; i < 测试次数; i++) {
    if (成功吗()) 测试通过++
  }
  return 测试通过 / 测试次数
}
// 获取大于连续三次胜利概率()
// 最终解法 520 / 1024
```

```js
// 一个自然数将它的末尾数字移到首位,得到的新数是原数的2倍,求这个自然数
let [n, mod] = [0n, 1n]
while (mod !== 0n) {
  n = n + 1n
  mod = ((20n * 10n ** n - 4n) * 10n) % 19n
}
console.log('结果:', ((20n * 10n ** n - 4n) * 10n) / 19n + 2n)
// 105263157894736842n
```

```js
/*
编写完成分数转小数函数fraction2decimal
输入2个正整数(<2^52)，输出小数，如有循环节 用[]框出，
例如 1,7=> 0.[142857] 13,90=> 0.1[4] 1,1=>1
普通要求：代码控制在20行内，15分钟完成
更高要求：代码控制在10行内，算法复杂度O(N)
*/
```
