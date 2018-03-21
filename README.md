# meeko
![Build Stat](https://api.travis-ci.org/kongnet/meeko.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/kongnet/meeko/badge.svg?branch=master)](https://coveralls.io/github/kongnet/meeko?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/fb7f44bf54b742ec97db7c17f49ceb4c)](https://www.codacy.com/app/9601698/meeko?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=kongnet/meeko&amp;utm_campaign=Badge_Grade)

[![NPM](https://nodei.co/npm/meeko.png?downloads=true&stars=true)](https://nodei.co/npm/meeko/)

[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/kongnet/meeko)

## 全局函数

let $ = require('meeko')

## json color format
* $.dir(object)
* 内部10行代码实现 注意字符串下标数组无法显示

![JSON color format](https://github.com/kongnet/meeko/raw/master/screenShot/jsonFormat.png)

###$.compare

```
let cnDictObj = {items:[{'name':'a',lev:1},{name:'b',lev:2}]}
$.log(cnDictObj.items.sort(compare('lev', 'desc'))) //默认升序
```

## String原型扩展
* upperFirst() 将首字母变成大写,其他小写

## Notice
$.tools.checkParam(obj)
* obj 如果为日期格式,日期格式为UTC日期
* 请在前端写入mysql之前 date.date2Str()一下
* 否则需要主动调用mysql的转换utc时间的函数
