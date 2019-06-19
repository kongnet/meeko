
/**
 * @namespace tools
 */

// tools库扩展
let getType = Object.prototype.toString
let tools = {
  /**
   * @typedef {function} tools.getType
   * @memberof tools.getType#
   * @description 获取输入参数o的类型
   * @param {mixed} o - 任何合法数据
   * @return {String}
   * @example
   * console.log($.tools.getType('type'))
   * // String
   */
  getType (o) {
    return getType.call(o).split(' ')[1].split(']')[0]
  },
  /**
   * @memberof tools.isObj#
   * @description 类型判断：是否对象
   * @param {mixed} o - 任何合法数据
   * @return {boolean}
   * @example
   * console.log($.tools.isObj({}))
   * // true
   */
  isObj (o) {
    return getType.call(o) === '[object Object]'
  },
  /**
   * @memberof tools.isObj#
   * @description 类型判断：isObj的别称
   * @param {mixed} o - 任何合法数据
   * @return {boolean}
   * @example
   * console.log($.tools.isObject('type'))
   * // false
   */
  isObject (o) {
    return getType.call(o) === '[object Object]'
  },
  /**
   * @memberof tools.isString#
   * @description 类型判断：是否字符串
   * @param {mixed} o - 任何合法数据
   * @return {boolean}
   * @example
   * console.log($.tools.isString('type'))
   * // true
   */
  isString (o) {
    return getType.call(o) === '[object String]'
  },
  /**
   * @memberof tools.isNumber#
   * @description 类型判断：是否Number
   * @param {mixed} o - 任何合法数据
   * @return {boolean}
   * @example
   * console.log($.tools.isNumber(123.123))
   * // true
   */
  isNumber (o) {
    return getType.call(o) === '[object Number]' && isFinite(o)
  },
  /**
   * @memberof tools.isBigInt#
   * @description 类型判断：是否 BigInt
   * @param {mixed} o - 任何合法数据
   * @return {boolean}
   * @example
   * console.log($.tools.isBigInt(123456789123456789n))
   * // true
   */
  isBigInt (o) {
    return getType.call(o) === '[object BigInt]'
  },
  /**
   * @memberof tools.isArray#
   * @description 类型判断：是否 array
   * @param {mixed} o - 任何合法数据
   * @return {boolean}
   * @example
   * console.log($.tools.isArray(['type']))
   * // true
   */
  isArray (o) {
    return getType.call(o) === '[object Array]'
  },
  /**
   * @memberof tools.isNull#
   * @description 类型判断：是否 null
   * @param {mixed} o - 任何合法数据
   * @return {boolean}
   * @example
   * console.log($.tools.isNull(null))
   * // true
   */
  isNull (o) {
    return getType.call(o) === '[object Null]'
  },
  /**
   * @memberof tools.isUndefined#
   * @description 类型判断：是否 undefined
   * @param {mixed} o - 任何合法数据
   * @return {boolean}
   * @example
   * console.log($.tools.isUndefined(undefined))
   * // true
   */
  isUndefined (o) {
    return getType.call(o) === '[object Undefined]'
  },
  /**
   * @memberof tools.isRegExp#
   * @description 类型判断：是否 RegExp
   * @param {mixed} o - 任何合法数据
   * @return {boolean}
   * @example
   * console.log($.tools.isRegExp(/^\n+/))
   * // true
   */
  isRegExp (o) {
    return getType.call(o) === '[object RegExp]'
  },
  /**
   * @memberof tools.isBoolean#
   * @description 类型判断：是否 Boolean
   * @param {mixed} o - 任何合法数据
   * @return {boolean}
   * @example
   * console.log($.tools.isBoolean(!5))
   * // true
   */
  isBoolean (o) {
    return getType.call(o) === '[object Boolean]'
  },
  /**
   * @memberof tools.isPInt#
   * @description 合法判断：是否大于0的正整数
   * @param {string|int} o - 要判断的数据
   * @return {boolean}
   * @example
   * console.log($.tools.isPInt(522))
   * // true
   */
  isPInt (o) {
    var g = /^[1-9]*[1-9][0-9]*$/
    return g.test(o)
  },
  /**
   * @memberof tools.isNInt#
   * @description 合法判断：是否小于0的负整数
   * @param {string|int} o - 要判断的数据
   * @return {boolean}
   * @example
   * console.log($.tools.isNInt(-522))
   * // true
   */
  isNInt (o) {
    var g = /^-[1-9]*[1-9][0-9]*$/
    return g.test(o)
  },
  /**
   * @memberof tools.isInt#
   * @description 合法判断：是否整数
   * @param {string|int} o - 要判断的数据
   * @return {boolean}
   * @example
   * console.log($.tools.isInt(-522))
   * // true
   */
  isInt (o) {
    var g = /^-?\d+$/
    return g.test(o)
  },
  /**
   * @memberof tools.isDecimal#
   * @description 合法判断：是否小数
   * @param {string|int} o - 要判断的数据
   * @return {boolean}
   * @example
   * console.log($.tools.isDecimal(-522.5))
   * // true
   */
  isDecimal (o) {
    return !isNaN(o) && o !== '' && !this.isNull(o) && !this.isArray(o) && !this.isBoolean(o) && !this.isDate(o) // this.isNumber(o) 字符串数值就无法判断了
  },
  /**
   * @memberof tools.isBool#
   * @description 合法判断：是否可表达是否的数据
   * @param {string|int} s - 要判断的数据
   * @return {boolean}
   * @example
   * console.log($.tools.isBool(1))
   * // true
   */
  isBool (s) {
    let b = ['0', '1', 'true', 'false'].includes((s + '').toLow())
    return this.isBoolean(s) || b
  },
  /**
   * @memberof tools.isDate#
   * @description 合法判断：是否日期，Date对象或者可以用Date.parse解析的字符串或数字均返回true
   * @param {string|int} o - 要判断的数据
   * @return {boolean}
   * @example
   * console.log($.tools.isDate('2019-06-14'))
   * // true
   */
  isDate (o) {
    if (this.getType(o) === 'Date') return !0
    if (this.isBoolean(o)) return !1
    let s = String(o)
    let b1 = s.indexOf('-')
    let b2 = s.indexOf('/')
    let b = b1 > 0 || b2 > 0
    // let b = /^[^-/].+[-/].+/g.test(s) //或者使用正则
    return s === '#now()' || (b && !isNaN(Date.parse(o)))
  }
}

/**
   * @memberof tools#
   * @description 判断对象是否为空,ex是需要排除的数据数组
   * @function ifObjEmpty
   * @param {Object} o - 判断的对象
   * @param {Array} ex - 需要排除的属性数组
   * @return {String}
   * @example
   * console.log($.tools.ifObjEmpty('{test: 'test'}', ['test']))
   */
tools.ifObjEmpty = function (o, ex) {
  ex = ex || []
  for (let i in o) {
    if (ex.includes(i)) {
      continue
    } else {
      return !1
    }
  }
  return !0
}

/**
   * @memberof tools#
   * @description 数组相同属性的元素,属性合并成第一个数组元素
   * @function jsonPack
   * @param {Array} o - 输入的数组
   * @param {Number|Null} order - 是否排序
   * @return {String}
   * @example
   * console.log($.tools.jsonPack([{ bac: 2, abc: 1, cba: 3 }, { cba: 33, bac: 22, abc: 11 }, { bac: 222, cba: 333, abc: 111 }], 1)))
   * // [['abc', 'bac', 'cba'], [1, 2, 3], [11, 22, 33], [111, 222, 333]]
   */
tools.jsonPack = function (obj, order) {
  let len = obj.length
  let a = []
  for (let prop in obj[0]) {
    a.push(prop)
  }
  if (order === 1) {
    a.sort()
  }
  let ret = []
  ret.push(a)
  let pLen = a.length
  for (let i = 0; i < len; i++) {
    let _arr = []
    for (let j = 0; j < pLen; j++) {
      let key = a[j]
      _arr.push(obj[i][key])
    }
    ret.push(_arr)
  }
  return ret
}

/**
 * @memberof tools#
 * @description 深拷贝一个对象
 * @function copy
 * @param {mixed} o - 任何数据
 * @return {mixed}
 * @example
 * console.log($.tools.copy([{ bac: 2, abc: 1, cba: 3 }, { cba: 33, bac: 22, abc: 11 }, { bac: 222, cba: 333, abc: 111 }], 1)))
 * // [['abc', 'bac', 'cba'], [1, 2, 3], [11, 22, 33], [111, 222, 333]]
 */
tools.copy = function (o) {
  return JSON.parse(JSON.stringify(o))
}

/**
   * @memberof tools#
   * @description 返回多位随机字符
   * @function uuid
   * @param {Number|Null} len - 长度
   * @param {Number} radix - 进制
   * @return {String}
   * @example
   *  tools.uuid(null, 64) // '2EC9D207-DCA5-4D96-A397-F1371D053AEB'
   */
tools.uuid = function (len, radix) {
  let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  let uuid = []
  let i
  radix = radix || chars.length
  if (len) {
    // Compact form
    for (i = 0; i < len; i++) {
      uuid[i] = chars[0 | Math.random() * radix]
    }
  } else {
    // rfc4122, version 4 form
    let r
    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'
    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16
        uuid[i] = chars[i === 19 ? r & 0x3 | 0x8 : r]
      }
    }
  }
  return uuid.join('')
}
/**
   * @memberof tools#
   * @description promise停止t秒
   * @function wait
   * @param {Number} t - 停止秒数
   * @return {Function}
   */
tools.wait = function (t) {
  return function (cb) {
    setTimeout(cb, t)
  }
}
/**
   * @memberof tools#
   * @description 返回a,b之间的整数
   * @function rnd
   * @param {Number} a - 范围最小值
   * @param {Number} b - 范围最大值
   * @return {Number}
   * $.tools.rnd(-100, -100)
   // -100
   */
tools.rnd = function (a, b) {
  return Math.round(Math.random() * (b - a)) + a
}
/**
   * @memberof tools#
   * @description 两个时间差 中文显示函数
   * @function timeAgo
   * @param {Date|int} t1 - 时间随便取
   * @param {Date|int} t2 - 时间随便取
   * @return {String}
   * @example
   * $.tools.timeAgo(1558338047719, 1558338047719)
   * // 刚刚
   */
tools.timeAgo = function (t1, t2) {
  let [ r, n, dt ] = [null, 0, new Date(t2) - new Date(t1)]
  const a = ['年', 60 * 60 * 24 * 365,
    '个月', 60 * 60 * 24 * 30,
    '天', 60 * 60 * 24,
    '小时', 60 * 60,
    '分钟', 60,
    '秒', 1] // ymdhms格式
  a.some((item, idx) => {
    n = Math.abs(dt) / a[idx * 2 + 1] / 1000
    if (n >= 1) {
      r = ~~n + a[idx * 2] + '前后'.split('')[dt > 0 ? 0 : 1]
      return !0
    }
  })
  return Math.abs(dt) < 1000 ? '刚刚' : r
}
/**
 * @memberof tools#
 * @description 检查 a 对象是否符合 b 对象所描述的要求
 * @param {Object} a - 被检查的对象，将检查里面的每一个键值对
 * @param {Object} b - 描述对象。里面的每一个值，都是对该键的描述，将检查 a 对象中的同名键的值是否符合该描述
 * @return {String}
 * @example
 * $.tools.checkParam({
      id: 2
    }, {
      id: {
        desc: 'id',
        req: 1,
        type: 'int',
        size: [-1, 1]
      },
    })
 * // {
 * //   code: 200,
 * //   msg: '',
 * //   data: {
 * //     id: 2
 * //   }
 * // }
 */
tools.checkParam = function (a, b) {
  // NOTICE : 0的问题
  let c = {}
  let _n
  // 类型判断函数
  let typeCheck = function (i, valA, valB, addToC) {
    addToC = addToC !== false // 默认为true
    switch ((valB.type || 'string').toLow()) {
      case 'int':
        _n = valA === 0 ? 0 : (valA || valB.def)
        if (!tools.isInt(_n)) {
          return {
            code: 401,
            msg: (valB.name || i) + ' 类型错误,应为整型'
          }
        }
        addToC && (c[i] = +_n)
        if (valA && valB.size) {
          if (c[i] < valB.size[0] || c[i] > valB.size[1]) {
            return {
              code: 401,
              msg: (valB.name || i) + ' 范围有误'
            }
          }
        }
        break
      case 'positive':
        _n = valA === 0 ? 0 : valA || valB.def
        if (!tools.isInt(_n) || _n <= 0) {
          return {
            code: 401,
            msg: (valB.name || i) + ' 类型错误,应为正数'
          }
        }
        addToC && (c[i] = +_n)
        if (valA && valB.size) {
          if (c[i] < valB.size[0] || c[i] > valB.size[1]) {
            return {
              code: 401,
              msg: (valB.name || i) + ' 范围有误'
            }
          }
        }
        break
      case 'negative':
        _n = valA === 0 ? 0 : valA || valB.def
        if (!tools.isInt(_n) || _n >= 0) {
          return {
            code: 401,
            msg: (valB.name || i) + ' 类型错误,应为负数'
          }
        }
        addToC && (c[i] = +_n)
        if (valA && valB.size) {
          if (c[i] < valB.size[0] || c[i] > valB.size[1]) {
            return {
              code: 401,
              msg: (valB.name || i) + ' 范围有误'
            }
          }
        }
        break
      case 'string':
        _n = valA === '' ? '' : String(valA || '') || valB.def
        addToC && (c[i] = _n)
        if (valA && valB.size) {
          let len = _n.len()
          if (len < valB.size[0] || len > valB.size[1]) {
            return {
              code: 401,
              msg: (valB.name || i) + ' 长度有误'
            }
          }
        }
        if (valA && valB.reg) {
          if (!(new RegExp(valB.reg).test(valA))) {
            return {
              code: 401,
              msg: valB.err || (valB.name || i) + ' 格式有误'
            }
          }
        }

        break
      case 'datetime':
        // TODO : ie 需要补一个 toISOString 函数
        _n = valA || (valB.def === '#now()' ? new Date() : valB.def)
        if (!tools.isDate(_n)) {
          return {
            code: 401,
            msg: (valB.name || i) + ' 类型错误,应为日期型'
          }
        }
        addToC && (c[i] = _n)
        break
      case 'enum':
        _n = valA
        if (!tools.isArray(valB.size)) {
          return {
            code: 401,
            msg: (valB.name || i) + ' size类型错误,应为枚举型'
          }
        }
        addToC && (c[i] = _n)
        if (!valB.size.includes(c[i])) {
          return {
            code: 401,
            msg: (valB.name || i) + ' 枚举范围有误'
          }
        }
        break
      case 'bool':
        if (tools.isBoolean(valA)) {
          addToC && (c[i] = valA)
          break
        }
        _n = valA === 0 ? 0 : valA || valB.def
        if (!tools.isBool(_n)) {
          return {
            code: 401,
            msg: (valB.name || i) + ' 类型错误，,应为布尔型 ' + _n
          }
        }
        addToC && (c[i] = _n)
        break
      case 'number':
        _n = valA === 0 ? 0 : valA || valB.def
        if (!tools.isDecimal(_n)) {
          return {
            code: 401,
            msg: (valB.name || i) + ' 类型错误,应为数值型'
          }
        }
        addToC && (c[i] = +_n)
        if (valA && valB.size) {
          if (c[i] < valB.size[0] || c[i] > valB.size[1]) {
            return {
              code: 401,
              msg: (valB.name || i) + ' 范围有误'
            }
          }
        }
        break
      case 'array': // 支持数组
        if (!(valA instanceof Array)) {
          return {
            code: 401,
            msg: (valB.name || i) + ' 类型错误,应为数组型'
          }
        }
        // 如果是数组，可以为它配置items的类型： arrayParam1:{type:'array',items:{type:'string'}}
        for (let j = 0; j < valA.length; j++) {
          const result = typeCheck(i, valA[j], valB.items || {}, false)
          if (result && result.code >= 400) {
            return result
          }
        }
        addToC && (c[i] = valA)
        break
      default:
        return {
          code: 500,
          msg: '参数类型定义错误'
        }
    }
  }
  for (let i in b) {
    if (b[i].req === 1) {
      if (!a[i]) {
        return {
          code: 401,
          msg: b[i].reqErr || ((b[i].name || i) + ' 必填')
        }
      } else {
        let r = typeCheck(i, a[i], b[i])
        if (r) return r
      }
    } else {
      if (a[i] === undefined) {
        c[i] = a[i] || b[i].def
        if (c[i] === null || c[i] === undefined) { delete c[i] }
      } else {
        let r = typeCheck(i, a[i], b[i])
        if (r) return r
      }
    }
  }
  return {
    code: 200,
    msg: '',
    data: c
  }
}

/**
 * @typedef {Object} tools.utf8
 * @description 对utf8和Unicode的互转码
 * @property {function} encode(str) 把utf8转为Unicode编码
 * @property {function} decode(str) 把Unicode转为utf8编码
 */
let utf8 = {
  /**
   * @memberof tools.utf8#
   * @description 把utf8转为Unicode编码
   * @param {string} s
   * @return {String}
   * @example
   * $.tools.utf8.encode('你好abc')
   */
  encode (s) {
    var r = ''
    var len = s.length
    var fromCode = String.fromCharCode
    for (var n = 0; n < len; n++) {
      var c = s.charCodeAt(n)
      if (c < 128) {
        r += fromCode(c)
      } else if (c > 127 && c < 2048) {
        r += fromCode(c >> 6 | 192)
        r += fromCode(c & 63 | 128)
      } else {
        r += fromCode(c >> 12 | 224)
        r += fromCode(c >> 6 & 63 | 128)
        r += fromCode(c & 63 | 128)
      }
    }
    return r
  },
  /**
   * @memberof tools.utf8#
   * @description 把Unicode转为utf8编码
   * @param {string} s
   * @return {String}
   */
  decode (s) {
    var r = ''
    var i = 0
    var c1 = 0
    var c2 = 0
    var c3 = 0
    var fromCode = String.fromCharCode
    while (i < s.length) {
      c1 = s.charCodeAt(i)
      if (c1 < 128) {
        r += fromCode(c1)
        i++
      } else if (c1 > 191 && c1 < 224) {
        c2 = s.charCodeAt(i + 1)
        r += fromCode((c1 & 31) << 6 | c2 & 63)
        i += 2
      } else {
        c2 = s.charCodeAt(i + 1)
        c3 = s.charCodeAt(i + 2)
        r += fromCode((c1 & 15) << 12 | (c2 & 63) << 6 | c3 & 63)
        i += 3
      }
    }
    return r
  }
}
tools.utf8 = utf8

/**
 * @typedef {Object} tools.lzw
 * @description LZW，对中文的压缩算法
 * @property {function} compress(str) 压缩
 * @property {function} uncompress(str) 解压缩
 */
let lzw = {
  /**
   * @typedef {function} tools.lzw.compress
   * @description 压缩
   * @param {string} str
   * @return {String}
   * @example
   * $.tools.lzw.compress($.tools.utf8.encode('你好abc'))
   */
  compress (str) {
    var fromCode = String.fromCharCode
    var rStr = ''
    rStr = utf8.encode(str)
    var size = 0
    var xstr = ''
    var chars = 256
    var dict = []
    for (let i = 0; i < chars; i++) {
      dict[String(i)] = i
    }
    var splitted = []
    splitted = rStr.split('')
    var buffer = []
    size = splitted.length
    var current = ''
    var r = ''
    for (let i = 0; i <= size; i++) {
      current = String(splitted[i])
      xstr = buffer.length === 0 ? String(current.charCodeAt(0)) : buffer.join('-') + '-' + String(current.charCodeAt(0))
      if (dict[xstr] !== undefined) {
        buffer.push(current.charCodeAt(0))
      } else {
        r += fromCode(dict[buffer.join('-')])
        dict[xstr] = chars
        chars++
        buffer = []
        buffer.push(current.charCodeAt(0))
      }
    }
    return r
  },
  /**
   * @memberof tools.lzw#
   * @description 解压缩
   * @param {string} str
   * @return {String}
   */
  uncompress (str) {
    var i
    var chars = 256
    var dict = []
    var fromCode = String.fromCharCode
    for (i = 0; i < chars; i++) {
      dict[i] = fromCode(i)
    }
    var original = String(str)
    var splitted = original.split('')
    var size = splitted.length
    var buffer = ''
    var chain = ''
    var r = ''
    for (i = 0; i < size; i++) {
      var code = original.charCodeAt(i)
      var current = dict[code]
      if (buffer === '') {
        buffer = current
        r += current
      } else {
        if (code <= 255) {
          r += current
          chain = buffer + current
          dict[chars] = chain
          chars++
          buffer = current
        } else {
          chain = dict[code]
          if (chain === null) {
            chain = buffer + buffer.slice(0, 1)
          }
          r += chain
          dict[chars] = buffer + chain.slice(0, 1)
          chars++
          buffer = chain
        }
      }
    }
    r = utf8.decode(r)
    return r
  }
}
tools.lzw = lzw

module.exports = tools
