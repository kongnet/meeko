/**
 * @namespace tools
 */
const crypto = require('crypto')
const $M = require('../math.js')
const genTemp = require('../template/genGrid')
// tools库扩展
const getType = Object.prototype.toString
const has = Object.prototype.hasOwnProperty

const tools = {
  size (val) {
    /**
     * @memberof tools#
     * @description 去对象的长度，支持Unicode object第一层
     * @param {mixed} val - 任何合法数据
     * @return {number}
     * @example
     * console.log($.tools.size({a:1,b:{c:1}}))
     * // 2
     */

    return Array.isArray(val) ? val.length : val && typeof val === 'object' ? val.size || val.length || Object.keys(val).length : typeof val === 'string' ? Buffer.from(val).length : 0
  },
  equals (x, y) {
    /**
     * @memberof tools#
     * @description 两个对象是否相等
     * @param {mixed} a
     * @param {mixed} b
     * @return {boolean}
     * @example
     * console.log($.tools.equals({ a: [2, { e: 3 ,h:{h:undefined}}], b: [4], c: 'foo' }, { a: [2, {h:{h:undefined}, e: 3 }], b: [4], c: 'foo' }))
     * // true
     */

    let ctor, len
    if (x === y) {
      return !0
    }

    if (x && y && (ctor = x.constructor) === y.constructor) {
      if (ctor === Date) {
        return x.getTime() === y.getTime()
      }
      if (ctor === RegExp) {
        return x.toString() === y.toString()
      }
      if (ctor === Array) {
        if ((len = x.length) === y.length) {
          while (len-- && tools.equals(x[len], y[len])) {
            /*do nothing*/
          }
        }
        return len === -1
      }
      if (!ctor || typeof x === 'object') {
        len = 0
        for (ctor in x) {
          if (has.call(x, ctor) && ++len && !has.call(y, ctor)) {
            return !1
          }
          if (!(ctor in y) || !tools.equals(x[ctor], y[ctor])) {
            return !1
          }
        }
        return Object.keys(y).length === len
      }
    }

    return x !== x && y !== y
  },
  getType (o) {
    /**
     * @typedef {function} tools.getType
     * @memberof tools#
     * @description 获取输入参数o的类型
     * @param {mixed} o - 任何合法数据
     * @return {String}
     * @example
     * console.log($.tools.getType('type'))
     * // String
     */

    return getType.call(o).split(' ')[1].split(']')[0]
  },
  isObj (o) {
    /**
     * @memberof tools#
     * @description 类型判断：是否对象
     * @param {mixed} o - 任何合法数据
     * @return {boolean}
     * @example
     * console.log($.tools.isObj({}))
     * // true
     */

    return getType.call(o) === '[object Object]'
  },
  isObject (o) {
    /**
     * @memberof tools#
     * @description 类型判断：isObj的别称
     * @param {mixed} o - 任何合法数据
     * @return {boolean}
     * @example
     * console.log($.tools.isObject('type'))
     * // false
     */

    return getType.call(o) === '[object Object]'
  },
  isString (o) {
    /**
     * @memberof tools#
     * @description 类型判断：是否字符串
     * @param {mixed} o - 任何合法数据
     * @return {boolean}
     * @example
     * console.log($.tools.isString('type'))
     * // true
     */

    return getType.call(o) === '[object String]'
  },
  isNumber (o) {
    /**
     * @memberof tools#
     * @description 类型判断：是否Number
     * @param {mixed} o - 任何合法数据
     * @return {boolean}
     * @example
     * console.log($.tools.isNumber(123.123))
     * // true
     */

    return getType.call(o) === '[object Number]' && isFinite(o)
  },
  isBigInt (o) {
    /**
     * @memberof tools#
     * @description 类型判断：是否 BigInt
     * @param {mixed} o - 任何合法数据
     * @return {boolean}
     * @example
     * console.log($.tools.isBigInt(123456789123456789n))
     * // true
     */

    return getType.call(o) === '[object BigInt]'
  },
  isArray (o) {
    /**
     * @memberof tools#
     * @description 类型判断：是否 array
     * @param {mixed} o - 任何合法数据
     * @return {boolean}
     * @example
     * console.log($.tools.isArray(['type']))
     * // true
     */

    return getType.call(o) === '[object Array]'
  },
  isNull (o) {
    /**
     * @memberof tools#
     * @description 类型判断：是否 null
     * @param {mixed} o - 任何合法数据
     * @return {boolean}
     * @example
     * console.log($.tools.isNull(null))
     * // true
     */

    return getType.call(o) === '[object Null]'
  },
  isUndefined (o) {
    /**
     * @memberof tools#
     * @description 类型判断：是否 undefined
     * @param {mixed} o - 任何合法数据
     * @return {boolean}
     * @example
     * console.log($.tools.isUndefined(undefined))
     * // true
     */

    return getType.call(o) === '[object Undefined]'
  },
  isRegExp (o) {
    /**
     * @memberof tools#
     * @description 类型判断：是否 RegExp
     * @param {mixed} o - 任何合法数据
     * @return {boolean}
     * @example
     * console.log($.tools.isRegExp(/^\n+/))
     * // true
     */

    return getType.call(o) === '[object RegExp]'
  },
  isBoolean (o) {
    /**
     * @memberof tools#
     * @description 类型判断：是否 Boolean
     * @param {mixed} o - 任何合法数据
     * @return {boolean}
     * @example
     * console.log($.tools.isBoolean(!5))
     * // true
     */

    return getType.call(o) === '[object Boolean]'
  },
  isPInt (o) {
    /**
     * @memberof tools#
     * @description 合法判断：是否大于0的正整数
     * @param {string|Number} o - 要判断的数据
     * @return {boolean}
     * @example
     * console.log($.tools.isPInt(522))
     * // true
     */

    const g = /^[1-9]+(\d*)$/
    return g.test(o)
  },
  isNInt (o) {
    /**
     * @memberof tools#
     * @description 合法判断：是否小于0的负整数
     * @param {string|Number} o - 要判断的数据
     * @return {boolean}
     * @example
     * console.log($.tools.isNInt(-522))
     * // true
     */

    const g = /^-[1-9]+(\d*)$/
    return g.test(o)
  },
  isInt (o) {
    /**
     * @memberof tools#
     * @description 合法判断：是否整数
     * @param {string|Number} o - 要判断的数据
     * @return {boolean}
     * @example
     * console.log($.tools.isInt(-522))
     * // true
     */

    const g = /^-?\d+$/
    return g.test(o)
  },
  isDecimal (o) {
    /**
     * @memberof tools#
     * @description 合法判断：是否小数
     * @param {string|Number} o - 要判断的数据
     * @return {boolean}
     * @example
     * console.log($.tools.isDecimal(-522.5))
     * // true
     */

    return !isNaN(o) && o !== '' && !this.isNull(o) && !this.isArray(o) && !this.isBoolean(o) && !this.isDate(o) // this.isNumber(o) 字符串数值就无法判断了
  },
  isBool (s) {
    /**
     * @memberof tools#
     * @description 合法判断：是否可表达是否的数据
     * @param {string|Number} s - 要判断的数据
     * @return {boolean}
     * @example
     * console.log($.tools.isBool(1))
     * // true
     */

    const b = ['0', '1', 'true', 'false'].includes((s + '').toLow())
    return this.isBoolean(s) || b
  },
  isDate (o) {
    /**
     * @memberof tools#
     * @description 合法判断：是否日期，Date对象或者可以用Date.parse解析的字符串或数字均返回true
     * @param {string|Number} o - 要判断的数据
     * @return {boolean}
     * @example
     * console.log($.tools.isDate('2019-06-14'))
     * // true
     */

    if (this.getType(o) === 'Date') {
      return !0
    }
    if (this.isBoolean(o)) {
      return !1
    }
    const s = String(o)
    const b1 = s.indexOf('-')
    const b2 = s.indexOf('/')
    const b = b1 > 0 || b2 > 0
    // let b = /^[^-/].+[-/].+/g.test(s) //或者使用正则
    return s === '#now()' || (b && !isNaN(Date.parse(o)))
  },
  hash (str = '', m = 'sha1', enCode = 'hex') {
    return crypto.createHash(m).update(str).digest(enCode)
  }
}
tools.genTemp = genTemp
tools.ifObjEmpty = function (o, ex) {
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

  ex = ex || []
  for (const i in o) {
    if (ex.includes(i)) {
      continue
    } else {
      return !1
    }
  }
  return !0
}

tools.jsonPack = function (obj, order) {
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

  const len = obj.length
  const a = []
  for (const prop in obj[0]) {
    a.push(prop)
  }
  if (order === 1) {
    a.sort()
  }
  const ret = []
  ret.push(a)
  const pLen = a.length
  for (let i = 0; i < len; i++) {
    const _arr = []
    for (let j = 0; j < pLen; j++) {
      const key = a[j]
      _arr.push(obj[i][key])
    }
    ret.push(_arr)
  }
  return ret
}

tools.copy = function (o) {
  /**
   * @memberof tools#
   * @description 浅拷贝一个对象
   * @function copy
   * @param {mixed} o - 任何数据
   * @return {mixed}
   * @example
   * console.log($.tools.copy([{ bac: 2, abc: 1, cba: 3 }, { cba: 33, bac: 22, abc: 11 }, { bac: 222, cba: 333, abc: 111 }], 1)))
   * // [['abc', 'bac', 'cba'], [1, 2, 3], [11, 22, 33], [111, 222, 333]]
   */
  return JSON.parse(JSON.stringify(o))
}

tools.uuid = function (len, radix) {
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

  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  const uuid = []
  let i
  radix = radix || chars.length
  if (len) {
    // Compact form
    for (i = 0; i < len; i++) {
      uuid[i] = chars[0 | (Math.random() * radix)]
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
        r = 0 | (Math.random() * 16)
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r]
      }
    }
  }
  return uuid.join('')
}
tools.wait = function (t) {
  /**
   * @memberof tools#
   * @description promise停止t秒
   * @function wait
   * @param {Number} t - 停止秒数
   * @return {Function}
   */

  return new Promise(resolve => {
    // 老的方法使用 return function 在最外层递归调用时候有问题
    const id = setTimeout(() => {
      clearTimeout(id)
      resolve()
    }, t)
  })
}
/**
 *
 * @param {Function} fn
 * @param {Number} timeout
 * @param {Object|Array} errorObj
 * @returns
 */
tools.race = async function (fn = async function () {}, timeout = 5000, errorObj = [500, 'timeout']) {
  async function timeoutFunc () {
    await tools.wait(timeout)
    return errorObj
  }
  return Promise.race([fn, timeoutFunc()])
}
tools.waitNotEmpty = async function (o, prop, fn) {
  /**
   * @memberof tools#
   * @description 返回a,b之间的整数
   * @function waitNotEmpty
   * @param {Object} o - 被测对象
   * @param {String} prop - 排除的属性
   * @param {Function} fn - 回调函数
   * await waitNotEmpty(db, '_mysql')
   */

  const func =
    fn ||
    function () {
      /* do nothing */
    }
  if (!o[prop]) {
    func(o, prop)
    await tools.wait(100)
    await tools.waitNotEmpty(o, prop, func)
  }
}

tools.rnd = function (a, b) {
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

  return $M.uniformRandInt(a, b)
}
tools.timeAgo = function (t1, t2, lng = 'zh') {
  /**
   * @memberof tools#
   * @description 两个时间差 中文显示函数
   * @function timeAgo
   * @param {Date|Number|String} t1 - 时间随便取
   * @param {Date|Number|String} t2 - 时间随便取
   * @param {String} lng - 语言包
   * @return {String}
   * @example
   * $.tools.timeAgo(1558338047719, 1558338047719)
   * // 刚刚
   */
  // NOTICE: 如果前端使用 需要兼容一下 str.replace(/-/g,"/")
  let [r, n, dt] = [null, 0, new Date(t2) - new Date(t1)]
  const a = [
    lng === 'zh' ? '年' : 'year ',
    60 * 60 * 24 * 365,
    lng === 'zh' ? '个月' : 'month ',
    60 * 60 * 24 * 30,
    lng === 'zh' ? '天' : 'day ',
    60 * 60 * 24,
    lng === 'zh' ? '小时' : 'hours ',
    60 * 60,
    lng === 'zh' ? '分钟' : 'min ',
    60,
    lng === 'zh' ? '秒' : 'secs ',
    1
  ] // ymdhms格式
  a.some((item, idx) => {
    n = Math.abs(dt) / a[idx * 2 + 1] / 1000
    if (n >= 1) {
      r = ~~n + a[idx * 2] + (lng === 'zh' ? ['前', '后'] : [' ago', ' late'])[dt > 0 ? 0 : 1]
      return !0
    }
  })
  return Math.abs(dt) < 1000 ? (lng === 'zh' ? '刚刚' : ' just now') : r
}

tools.checkParam = function (a, b) {
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
  // NOTICE : 0的问题
  const c = {}
  let _n
  /* 类型判断函数
     避免使用数字型0 
     在get传入时全为字符串处理,注意空的时候key就undefined
  */
  const typeCheck = function (i, valA, valB, addToC) {
    addToC = addToC !== false // 默认为true
    switch ((valB.type || 'string').toLow()) {
      case 'int':
        _n = valA === 0 ? 0 : valA || valB.def
        if (!tools.isInt(_n)) {
          return {
            code: 401,
            msg: (valB.name || i) + ' Type error,must be integer' //' 类型错误,应为整型'
          }
        }
        addToC && (c[i] = +_n)
        if (valA && valB.size) {
          if (c[i] < valB.size[0] || c[i] > valB.size[1]) {
            return {
              code: 401,
              msg: (valB.name || i) + ' Range error' // ' 范围有误'
            }
          }
        }
        break
      case 'positive':
        _n = valA === 0 ? 0 : valA || valB.def
        if (!tools.isInt(_n) || _n <= 0) {
          return {
            code: 401,
            msg: (valB.name || i) + ' Type error, must be positive' // ' 类型错误,应为正数'
          }
        }
        addToC && (c[i] = +_n)
        if (valA && valB.size) {
          if (c[i] < valB.size[0] || c[i] > valB.size[1]) {
            return {
              code: 401,
              msg: (valB.name || i) + ' Range error' // ' 范围有误'
            }
          }
        }
        break
      case 'negative':
        _n = valA === 0 ? 0 : valA || valB.def
        if (!tools.isInt(_n) || _n >= 0) {
          return {
            code: 401,
            msg: (valB.name || i) + ' Type error, must be negative' // ' 类型错误,应为负数'
          }
        }
        addToC && (c[i] = +_n)
        if (valA && valB.size) {
          if (c[i] < valB.size[0] || c[i] > valB.size[1]) {
            return {
              code: 401,
              msg: (valB.name || i) + ' Range error' //' 范围有误'
            }
          }
        }
        break
      case 'string':
        if (typeof valA !== 'string') {
          return {
            code: 401,
            msg: (valB.name || i) + ' Type error, must be String, not a Null or NaN' //' 类型错误,应为字符串，不能为null NaN等'
          }
        }
        _n = valA === '' ? '' : String(valA || '') || valB.def
        _n = _n ? _n.trim() : _n // string类型默认会trim
        addToC && (c[i] = _n)
        if (valA && valB.size) {
          const len = _n.len()
          if (len < valB.size[0] || len > valB.size[1]) {
            return {
              code: 401,
              msg: (valB.name || i) + ` length error [${valB.size[0]}-${valB.size[1]}]`
            }
          }
        }
        if (valA && valB.reg) {
          if (!new RegExp(valB.reg).test(valA)) {
            return {
              code: 401,
              msg: valB.err || (valB.name || i) + ' Type error' //' 格式有误'
            }
          }
        }

        break
      case 'datetime':
        // TODO : ie 需要补一个 toISOString 函数
        _n = valA || (valB.def === '#now()' ? new Date() : valB.def)
        if (!valB.req && _n === '') {
          break
        }
        if (!tools.isDate(_n)) {
          return {
            code: 401,
            msg: (valB.name || i) + ' Type error, must be Datetime' //' 类型错误,应为日期型'
          }
        }
        addToC && (c[i] = _n)
        break
      case 'file':
        if (!tools.isArray(valA) || !valA[0].size) {
          return {
            code: 401,
            msg: (valB.name || i) + ' Type error, must be FileType' //' 类型错误,应为文件类型'
          }
        }
        if (tools.isArray(valB.size)) {
          if (valA.some(x => x.size < valB.size[0] || 0 || x.size > valB.size[1] || valB.size[0] || 0)) {
            return {
              code: 401,
              msg: (valB.name || i) + ' Size error, file size range error' //' 类型错误,文件大小不在允许范围'
            }
          }
        }
        if (!valB.fileType) {
          break
        }
        if (tools.isArray(valB.fileType)) {
          if (valB.fileType.includes('*')) {
            break
          }
          if (valA.some(x => !valB.fileType.includes(x.type))) {
            return {
              code: 401,
              msg: (valB.name || i) + ' File type is not in the allowed range' //' 文件类型不在允许的范围'
            }
          }
        }
        break
      case 'enum':
        _n = valA
        if (!tools.isArray(valB.size)) {
          return {
            code: 401,
            msg: (valB.name || i) + ' Type error, must be enum' //' 类型错误,应为枚举型'
          }
        }
        addToC && (c[i] = _n)
        if (!valB.size.includes(c[i]) && !valB.size.includes(+c[i])) {
          return {
            code: 401,
            msg: (valB.name || i) + ' Enum is not in the allowed range' //' 枚举范围有误'
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
            msg: (valB.name || i) + ' Type error, must be Boolean ' + _n
          }
        }
        addToC && (c[i] = _n)
        break
      case 'number':
        _n = valA === 0 ? 0 : valA || valB.def
        if (!tools.isDecimal(_n)) {
          return {
            code: 401,
            msg: (valB.name || i) + ' Type error, must be number' //' 类型错误,应为数值型'
          }
        }
        addToC && (c[i] = +_n)
        if (valA && valB.size) {
          if (c[i] < valB.size[0] || c[i] > valB.size[1]) {
            return {
              code: 401,
              msg: (valB.name || i) + ' Range error' //' 范围有误'
            }
          }
        }
        break
      case 'array': // 支持数组
        if (!(valA instanceof Array)) {
          return {
            code: 401,
            msg: (valB.name || i) + ' Type error, must be array' //' 类型错误,应为数组型'
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
          msg: 'Definition of param error' //'参数类型定义错误'
        }
    }
  }
  for (const i in b) {
    if (b[i].req === 1) {
      if (!a[i]) {
        return {
          code: 401,
          msg: b[i].reqErr || (b[i].name || i) + ' required' //' 必填'
        }
      } else {
        const r = typeCheck(i, a[i], b[i])
        if (r) {
          return r
        }
      }
    } else {
      if (a[i] === void 0) {
        c[i] = a[i] || b[i].def
        if (c[i] === null || c[i] === void 0) {
          delete c[i]
        }
      } else {
        const r = typeCheck(i, a[i], b[i])
        if (r) {
          return r
        }
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

const utf8 = {
  encode (s) {
    /**
     * @memberof tools.utf8#
     * @description 把utf8转为Unicode编码
     * @param {string} s
     * @return {String}
     * @example
     * $.tools.utf8.encode('你好abc')
     */

    let r = ''
    const len = s.length
    const fromCode = String.fromCharCode
    for (let n = 0; n < len; n++) {
      const c = s.charCodeAt(n)
      if (c < 128) {
        r += fromCode(c)
      } else if (c > 127 && c < 2048) {
        r += fromCode((c >> 6) | 192)
        r += fromCode((c & 63) | 128)
      } else {
        r += fromCode((c >> 12) | 224)
        r += fromCode(((c >> 6) & 63) | 128)
        r += fromCode((c & 63) | 128)
      }
    }
    return r
  },
  decode (s) {
    /**
     * @memberof tools.utf8#
     * @description 把Unicode转为utf8编码
     * @param {string} s
     * @return {String}
     */

    let r = ''
    let i = 0
    let c1 = 0
    let c2 = 0
    let c3 = 0
    const fromCode = String.fromCharCode
    while (i < s.length) {
      c1 = s.charCodeAt(i)
      if (c1 < 128) {
        r += fromCode(c1)
        i++
      } else if (c1 > 191 && c1 < 224) {
        c2 = s.charCodeAt(i + 1)
        r += fromCode(((c1 & 31) << 6) | (c2 & 63))
        i += 2
      } else {
        c2 = s.charCodeAt(i + 1)
        c3 = s.charCodeAt(i + 2)
        r += fromCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63))
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

const lzw = {
  compress (str) {
    /**
     * @typedef {function} tools.lzw.compress
     * @description 压缩
     * @param {string} str
     * @return {String}
     * @example
     * $.tools.lzw.compress($.tools.utf8.encode('你好abc'))
     */

    const fromCode = String.fromCharCode
    let rStr = ''
    rStr = utf8.encode(str)
    let size = 0
    let xstr = ''
    let chars = 256
    const dict = []
    for (let i = 0; i < chars; i++) {
      dict[String(i)] = i
    }
    let splitted = []
    splitted = rStr.split('')
    let buffer = []
    size = splitted.length
    let current = ''
    let r = ''
    for (let i = 0; i <= size; i++) {
      current = String(splitted[i])
      xstr = buffer.length === 0 ? String(current.charCodeAt(0)) : buffer.join('-') + '-' + String(current.charCodeAt(0))
      if (dict[xstr] !== void 0) {
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
  uncompress (str) {
    /**
     * @memberof tools.lzw#
     * @description 解压缩
     * @param {string} str
     * @return {String}
     */

    let i
    let chars = 256
    const dict = []
    const fromCode = String.fromCharCode
    for (i = 0; i < chars; i++) {
      dict[i] = fromCode(i)
    }
    const original = String(str)
    const splitted = original.split('')
    const size = splitted.length
    let buffer = ''
    let chain = ''
    let r = ''
    for (i = 0; i < size; i++) {
      const code = original.charCodeAt(i)
      const current = dict[code]
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
// 取函数反值
const negate =
  func =>
  (...args) =>
    !func(...args)
tools.negate = negate
const obj2Url = function obj2Url (o) {
  const a = []
  for (const i in o) {
    a.push(`${i}=${o[i]}`)
  }
  return a.join('&')
}
tools.obj2Url = obj2Url
const objByString = function objByString (o, s) {
  /**
   * @memberof tools.objByString#
   * @description 通过字符串访问对象内部
   * @param {object} o
   * @param {string} s
   * @return {any}
   */

  const a = s
    .replace(/\[(\w+)\]/g, '.$1')
    .replace(/^\./, '')
    .split('.')
  for (let i = 0, n = a.length; i < n; ++i) {
    const k = a[i]
    if (k in o) {
      o = o[k]
    } else {
      return // undefined
    }
  }
  return o
}

const cFn = function cFn (s, fc, dimNum, bc, isUnderline) {
  /**
   * 返回控制台颜色包裹体
   * 背景色:                          前景色:
   * 40: 黑                          30: 黑
   * 41: 红                          31: 红
   * 42: 绿                          32: 绿
   * 43: 黄                          33: 黄
   * 44: 蓝                          34: 蓝
   * 45: 紫                          35: 紫
   * 46: 深绿                        36: 深绿
   * 47: 白色                        37: 白色
   * @param {int} [fc] 前景色 frontColor， 可选 30-37
   * @param {enum} [dimNum] 设为1高亮度（其实是加粗），设为2或0则无高亮
   * @param {int} [bc] 背景色 backgroundColor，可选 40-47
   * @param {boolean} [isUnderline] 是否有下横线
   * @return {string}
   * */

  return `${isUnderline ? '\x1b[4m' : ''}${dimNum ? '\x1b[2m' : ''}${fc ? `\x1b[${fc}m` : '\x1b[37m'}${bc ? `\x1b[${bc}m` : ''}${s || ''}\x1b[0m`
}

/**
 *  0  All attributes off  5  Blink
    1  Bold   7  Reverse Video
    2  Dim    8  Invisible
    4  Underline

 * @description 控制台控制以及颜色输出
 * @prop {string} [cls] 把光标位置设到0,0，并清屏
 * @prop {function} [xy] 设置光标位置 $.c.xy(0,0)
 * @prop {string} [none] 包裹体结尾符
 * @prop {string} [black] 黑
 * @prop {string} [red] 亮红
 * @prop {string} [green] 亮绿
 * @prop {string} [yellow] 亮黄
 * @prop {string} [blue] 亮蓝
 * @prop {string} [magenta] 亮紫
 * @prop {string} [cyan] 亮深绿
 * @prop {string} [white] 亮白色
 * @prop {string} [dimred] 红
 * @prop {string} [dimgreen] 绿
 * @prop {string} [dimyellow] 黄
 * @prop {string} [dimblue] 蓝
 * @prop {string} [dimmagenta] 紫
 * @prop {string} [dimcyan] 深绿
 * @prop {string} [dimwhite] 白色
 * @prop {function} [r(string,backgroundColor,underLine)] 亮红(字符串，背景色[40-47]，下横线(bool))
 * @prop {function} [g(string,backgroundColor,underLine)] 亮绿(字符串，背景色[40-47]，下横线(bool))
 * @prop {function} [y(string,backgroundColor,underLine)] 亮黄(字符串，背景色[40-47]，下横线(bool))
 * @prop {function} [b(string,backgroundColor,underLine)] 亮蓝(字符串，背景色[40-47]，下横线(bool))
 * @prop {function} [m(string,backgroundColor,underLine)] 亮紫(字符串，背景色[40-47]，下横线(bool))
 * @prop {function} [c(string,backgroundColor,underLine)] 亮深绿(字符串，背景色[40-47]，下横线(bool))
 * @prop {function} [w(string,backgroundColor,underLine)] 亮白色(字符串，背景色[40-47]，下横线(bool))
 * @prop {function} [dimr(string,backgroundColor,underLine)] 红(字符串，背景色[40-47]，下横线(bool))
 * @prop {function} [dimg(string,backgroundColor,underLine)] 绿(字符串，背景色[40-47]，下横线(bool))
 * @prop {function} [dimy(string,backgroundColor,underLine)] 黄(字符串，背景色[40-47]，下横线(bool))
 * @prop {function} [dimb(string,backgroundColor,underLine)] 蓝(字符串，背景色[40-47]，下横线(bool))
 * @prop {function} [dimm(string,backgroundColor,underLine)] 紫(字符串，背景色[40-47]，下横线(bool))
 * @prop {function} [dimc(string,backgroundColor,underLine)] 深绿(字符串，背景色[40-47]，下横线(bool))
 * @prop {function} [dimw(string,backgroundColor,underLine)] 白色(字符串，背景色[40-47]，下横线(bool))
 */

const c = {
  /*
  http://stanislavs.org/helppc/ansi_codes.html
  */

  cls: '\x1b[0;0;H\x1b[0J',
  xy (x, y) {
    return `\x1b[${y};${x};H`
  },

  r (s, bc, u) {
    return cFn(s, 31, 0, bc, u)
  },
  g (s, bc, u) {
    return cFn(s, 32, 0, bc, u)
  },
  green: '\x1b[32m',
  y (s, bc, u) {
    return cFn(s, 33, 0, bc, u)
  },
  yellow: '\x1b[33m',
  b (s, bc, u) {
    return cFn(s, 34, 0, bc, u)
  },
  m (s, bc, u) {
    return cFn(s, 35, 0, bc, u)
  },
  c (s, bc, u) {
    return cFn(s, 36, 0, bc, u)
  },
  cyan: '\x1b[36m',
  w (s, bc, u) {
    return cFn(s, 37, 0, bc, u)
  },
  dimr (s, bc, u) {
    return cFn(s, 31, 1, bc, u)
  },
  dimg (s, bc, u) {
    return cFn(s, 32, 1, bc, u)
  },
  dimy (s, bc, u) {
    return cFn(s, 33, 1, bc, u)
  },
  dimb (s, bc, u) {
    return cFn(s, 34, 1, bc, u)
  },
  dimm (s, bc, u) {
    return cFn(s, 35, 1, bc, u)
  },
  dimc (s, bc, u) {
    return cFn(s, 36, 1, bc, u)
  },
  dimw (s, bc, u) {
    return cFn(s, 37, 1, bc, u)
  },
  none: '\x1b[0m'
}

/**
 * 画字符串表格，结果会直接打印在控制台
 * @private
 * @param {number[]} colWidth [5,1,3]
 * @example $.drawLine([5,1,3])
 * // +-----+-+---+
 * */

function drawLine (colWidth) {
  let s = ''
  for (let i = 0; i < colWidth.length; i++) {
    s += '+'
    for (let j = 0; j < colWidth[i]; j++) {
      s += '-'
    }
  }
  const r = s + '+'
  console.log(r)
  return r + '\n'
}

/**
 * 在控制台绘制表格
 * @param {array} data
 * @param {array} colWidth
 * @param {object} opt
 * @example
 * let colWidth = [5, 10, 6]
 * let data = [{ id: 1, b: 'aaa', c: 'cccc1' }, { id: 2, b: true, c: 'cccc2' }, { id: 3, b: 'ccc', c: 'cccc3' }]
 * $.drawTable(data, colWidth)
 * $.drawTable(data, colWidth, { color: 1 })
 * //
 * +-----+----------+------+
 * |ID   |B         |C     |
 * +-----+----------+------+
 * |1    |aaa       |cccc1 |
 * |2    |true      |cccc2 |
 * |3    |ccc       |cccc3 |
 * +-----+----------+------+
 * */

function drawTable (data, colWidth = [], opt = { color: 0 }) {
  const len = data.length
  let s = ''
  let allStr = ''
  const keys = Object.keys(data[0])
  const keysLen = keys.length
  for (let i = 0; i < keysLen; i++) {
    colWidth[i] = colWidth[i] || 15 // 默认的列宽为15
    if (opt.color) {
      s += c.dimg(keys[i].fillStr(' ', colWidth[i]).toUpperCase()) + '|'
    } else {
      s += keys[i].fillStr(' ', colWidth[i]).toUpperCase() + '|'
    }
  }
  allStr += drawLine(colWidth)
  console.log('|' + s)
  allStr += '|' + s + '\n'
  allStr += drawLine(colWidth)
  for (let i = 0; i < len; i++) {
    s = ''
    for (let k = 0; k < keysLen; k++) {
      let v = data[i][keys[k]]
      const valueType = typeof v
      v = v + ''
      if (opt.color) {
        switch (valueType) {
          case 'number':
            s += c.dimy(v.fillStr(' ', colWidth[k])) + '|'
            break
          case 'boolean':
            s += c.dimr(v.fillStr(' ', colWidth[k])) + '|'
            break
          default:
            s += c.dimm(v.fillStr(' ', colWidth[k])) + '|'
        }
      } else {
        const diffLen = /\\u001b\[(?:\d*){0,5}\d*m/g.test(v) ? 13 : 0
        s += v.fillStr(' ', colWidth[k] + diffLen) + '|'
      }
    }
    console.log('|' + s)
    allStr += '|' + s + '\n'
  }
  allStr += drawLine(colWidth)
  return allStr
}
/**
 * @description 轮盘赌概率输出
 * @param {Array} optionArr countAdv输出形式的数组
 * @example let a1 = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5]
 * let a1Count = a1.countAdv() //对上面数据计数，{1:xx,2:xx,3:xx}
 */
function roulette (optionArr) {
  let rand = Math.random()
  let sum = optionArr[0].w //w是每个值在总数据中的权重
  let i = 0
  for (i = 1; i < optionArr.length; i++) {
    if (sum > rand) {
      return optionArr[i - 1].k
    }
    sum += optionArr[i].w
  }

  return optionArr[i - 1].k
}
tools.c = c
tools.drawTable = drawTable
tools.objByString = objByString
tools.roulette = roulette
module.exports = tools
