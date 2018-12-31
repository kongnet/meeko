# meeko
![Build Stat](https://api.travis-ci.org/kongnet/meeko.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/kongnet/meeko/badge.svg?branch=master)](https://coveralls.io/github/kongnet/meeko?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/fb7f44bf54b742ec97db7c17f49ceb4c)](https://www.codacy.com/app/9601698/meeko?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=kongnet/meeko&amp;utm_campaign=Badge_Grade)

[![NPM](https://nodei.co/npm/meeko.png?downloads=true&stars=true)](https://nodei.co/npm/meeko/)

[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/kongnet/meeko)

## 全局函数

let $ = require('meeko')
##$.math.linearFitting(xArray,yArray) 线性拟合

## json color format
* $.dir(object)
* 内部10行代码实现 注意字符串下标数组无法显示

![JSON color format](https://github.com/kongnet/meeko/raw/master/screenShot/jsonFormat.png)

###$.compare

```
let cnDictObj = {items:[{'name':'a',lev:1},{name:'b',lev:2}]}
$.log(cnDictObj.items.sort(compare('lev', 'desc'))) //默认升序
```

## Array原型扩展
* count() ['A', 'B', 'B', 'C', 'A', 'D'].count() => {"A":2,"B":2,"C":1,"D":1}
* flatten() [1, [2, [3, [4, 5], 6], 7], 8].flatten() => [1,2,3,4,5,6,7,8]
* orderBy() [{ name: 'A', age: 48 }, { name: 'B', age: 36 }, { name: 'C', age: 26 }].orderBy(['age'],['asc']) => [{"name":"C","age":26},{"name":"B","age":36},{"name":"A","age":48}] 默认升序


## String原型扩展
* upperFirst() 将首字母变成大写,其他小写
* String.render(o) 字符串模板渲染 

## Notice
$.tools.checkParam(obj)
* obj 如果为日期格式,日期格式为UTC日期
* 请在前端写入mysql之前 date.date2Str()一下
* 否则需要主动调用mysql的转换utc时间的函数

## 正则发生器
r = '(你|我|他)'
console.log($.reg.gen(r))

## 日期格式化
yyyy/YYYY mm/MM ww/WW dd/DD hh/HH mm ss SS q
$.now().format()

##路径下所有js文件全加载
$.requireAll() //加载某个目录下的所有对象，默认 __dirname

##分布式雪花碎片算法 每秒可以产生超过200万 不重复id
new $.Snowflake(workId, dataCenterId, sequence) // 工作进程id ，服务器id，开始序号

