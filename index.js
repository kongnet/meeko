'use strict';
const valid = require('validator');
let option = {
  logTime: true
};
exports.option = option;
//日期原型扩展
function GetWeekIndex(dateobj) {
  var firstDay = GetFirstWeekBegDay(dateobj.getFullYear());
  if (dateobj < firstDay) {
    firstDay = GetFirstWeekBegDay(dateobj.getFullYear() - 1);
  }
  var d = Math.floor((dateobj.valueOf() - firstDay.valueOf()) / 86400000);
  return Math.floor(d / 7) + 1;
}
function GetFirstWeekBegDay(year) {
  var tempdate = new Date(year, 0, 1);
  var temp = tempdate.getDay();
  if (temp === 1) {
    return tempdate;
  }
  temp = temp == 0 ? 7 : temp;
  tempdate = tempdate.setDate(tempdate.getDate() + (8 - temp));
  return new Date(tempdate);
}
function ext(a, b) {
  if (!b || !a) {
    return null;
  }
  for (var c in b) {
    b.hasOwnProperty(c) && (a[c] = b[c]);
  }
  return a;
}
Date.prototype.getWeek = function() {
  return GetWeekIndex(this);
};
Date.prototype.date2Str = function() {
  var y = this.getFullYear();
  var mon = (this.getMonth() + 1);
  mon = mon < 10 ? ('0' + mon) : mon;
  var date = this.getDate();
  date = date < 10 ? ('0' + date) : date;
  var hour = this.getHours();
  hour = hour < 10 ? ('0' + hour) : hour;
  var min = this.getMinutes();
  min = min < 10 ? ('0' + min) : min;
  var sec = this.getSeconds();
  sec = sec < 10 ? ('0' + sec) : sec;
  return (y + '-' + mon + '-' + date + ' ' + hour + ':' + min + ':' + sec);
};
Date.prototype.date8 = function(s) {
  let m = this.getMonth() + 1,
    d = this.getDate();
  m = m <= 9 ? ('0' + m) : m;
  d = d <= 9 ? ('0' + d) : d;
  s = s || '';
  return [this.getFullYear(), m, d].join(s);
};
/* 得到日期年月日等加数字后的日期 */
Date.prototype.dateAdd = function(interval, number) {
  let d = this;
  let k = {
    'y': 'FullYear',
    'q': 'Month',
    'm': 'Month',
    'w': 'Date',
    'd': 'Date',
    'h': 'Hours',
    'n': 'Minutes',
    's': 'Seconds',
    'ms': 'MilliSeconds'
  };
  let n = {
    'q': 3,
    'w': 7
  };
  eval('d.set' + k[interval] + '(d.get' + k[interval] + '()+' + ((n[interval] || 1) * number) + ')');
  return d;
};
Array.prototype.copy = function() {
  return [].concat(this);
};
let _s = {
  fillStr: function(str, len) { //填入什么字符多少位,中文算2个字符
    let l = (this + '').len();
    return this + ((len - l) > 0 ? str.times(len - l) : '');
  },
  toMoney: function(p) { //p精度  
    var num = this + '';
    num = num.replace(new RegExp(',', 'g'), '');
    // 正负号处理   
    var symble = '';
    if (/^([-+]).*$/.test(num)) {
      symble = num.replace(/^([-+]).*$/, '$1');
      num = num.replace(/^([-+])(.*)$/, '$2');
    }
    if (/^[-.0-9]+(\.[0-9]+)?$/.test(num)) {
      num = num.replace(new RegExp('^[0]+', 'g'), '');
      if (/^\./.test(num)) {
        num = '0' + num;
      }
      var decimal = num.replace(/^[0-9]+(\.[0-9]+)?$/, '$1');
      var integer = num.replace(/^([0-9]+)(\.[0-9]+)?$/, '$1');
      var re = /(\d+)(\d{3})/;
      while (re.test(integer)) {
        integer = integer.replace(re, '$1,$2');
      }
      if (+p) {
        decimal = decimal.substr(0, (+p + 1));
      }
      if (p === 0) {
        decimal = '';
      }
      return symble + integer + decimal;

    } else {
      return p;
    }
  },
  toLow: function() {
    return this.toLowerCase();
  },
  toUp: function() {
    return this.toUpperCase();
  },
  esHtml: function() {
    return this.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  },
  toHtml: function() {
    return this.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
  },
  reHtml: function() {
    return this.replace(/<\/?[^>]+>/gi, '');
  },
  times: function(n) {
    return n > 0 ? new Array(n + 1).join(this) : '';
  },
  format: function() {
    var s = this,
      a = [];
    for (var i = 0, l = arguments.length; i < l; i++) {
      a.push(arguments[i]);
    }
    return s.replace(/\{(\d+)\}/g, function(m, i) {
      return a[i] || '{' + i + '}';
    });
  },
  len: function() {
    return this.replace(/[^\x00-\xff]/g, '**').length;
  },
  toInt: function() {
    return parseInt(this);
  },
  replaceAll: function(s1, s2) {
    var a = this.split(s1);
    return a.join(s2);
  },
  trim: function() {
    return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  },
  camelize: function() {
    return this.replace(/(-[a-z])/g, function(s) {
      return s.substring(1).toUpperCase();
    });
  },
  ec: function(s) {
    s = s.trim();
    return (new RegExp('(^' + s + '\\s)|(\\s' + s + '$)|(\\s' + s + '\\s)|(^' + s + '$)', 'g')).test(this);
  },
  tc: function(s) {
    s = s.trim();
    if (this.ec(s)) {
      return this.dc(s);
    } else {
      return this.ac(s);
    }
  },
  dc: function(s) {
    if (this.ec(s)) {
      return this.trim().split(s).join('').replace(/\s{2,}/g, ' ').trim();
    } else {
      return this;
    }
  },
  ac: function(s) {
    return this.trim().dc(s) + ' ' + s;
  }
};
ext(String.prototype, _s);

Number.prototype.round = function(p) {
  p = Math.pow(10, p || 0);
  return Math.round(this * p) / p;
};
Number.prototype.fillStr = String.prototype.fillStr;
Date.prototype.fillStr = String.prototype.fillStr;
Buffer.prototype.contact = function(b) {
  /*
  utf8 有bom头
  EF BB BF [239 187 191]
  */
  let buf = new Buffer(this.length + b.length);
  this.copy(buf, 0, 0, this.length);
  b.copy(buf, this.length, 0, b.length);
  return buf;
};

exports.ext = ext;

let c = {
  /*
  http://stanislavs.org/helppc/ansi_codes.html
  */
  cls: '\x1b[0;0;H\x1b[0J',
  xy: function(x, y) {
    return `\x1b[${y};${x};H`;
  },
  none: '\x1b[m',
  black: '\x1b[30m',
  red: '\x1b[31m\x1b[1m',
  green: '\x1b[32m\x1b[1m',
  yellow: '\x1b[33m\x1b[1m',
  blue: '\x1b[34m\x1b[1m',
  magenta: '\x1b[35m\x1b[1m',
  cyan: '\x1b[36m\x1b[1m',
  white: '\x1b[37m\x1b[1m',
  lred: '\x1b[31m',
  lgreen: '\x1b[32m',
  lyellow: '\x1b[33m',
  lblue: '\x1b[34m',
  lmagenta: '\x1b[35m',
  lcyan: '\x1b[36m',
  lwhite: '\x1b[37m'
};

exports.c = c;


var getStackTrace = function() {
  var obj = {};
  Error.captureStackTrace(obj, getStackTrace);
  return obj.stack;
};

let re = /\\(.+)\.js:(\d+:\d+)/g;
let log = function(...args) {
  getStackTrace().split('\n')[2].match(re);
  let s = ' [' + c.lgreen + RegExp.$1.split('\\').pop() + ':' + RegExp.$2 + ' ' + new Date().date2Str().replaceAll('-', '') + c.none + ']';
  let str = '';
  for (let i = 0; i < args.length; i++) {
    if (typeof args[i] === 'object') {
      str = str + JSON.stringify(args[i]) + ' ';
    } else {
      str = str + args[i] + ' ';
    }
  }
  console.log(str + (option.logTime ? s : ''));
  return 1;
};
let err = function(...args) {
  getStackTrace().split('\n')[2].match(re);
  let s = ' [' + c.lred + RegExp.$1.split('\\').pop() + ':' + RegExp.$2 + ' ' + new Date().date2Str().replaceAll('-', '') + c.none + ']';
  let str = '';
  for (let i = 0; i < args.length; i++) {
    if (typeof args[i] === 'object') {
      str = str + JSON.stringify(args[i]) + ' ';
    } else {
      str = str + args[i] + ' ';
    }
  }
  console.log(str + (option.logTime ? s : ''));
  return 1;
};
exports.log = log;
exports.err = err;

//tools库扩展
exports.tools = {};
exports.tools.copy = function(o) { //复制对象
  return JSON.parse(JSON.stringify(o));
};
exports.tools.uuid = function(len, radix) { //返回多位随机字符
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [],
    i;
  radix = radix || chars.length;
  if (len) {
    // Compact form
    for (i = 0; i < len; i++) {
      uuid[i] = chars[0 | Math.random() * radix];
    }
  } else {
    // rfc4122, version 4 form
    var r;
    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join('');
};
exports.tools.wait = function(t) { //promise停止n秒
  return function(cb) {
    setTimeout(cb, t);
  };
};
exports.tools.rnd = function(a, b) { //返回a,b之间的整数
  return Math.round(Math.random() * (b - a)) + a;
};
exports.tools.timeAgo = function(t1, t2) { //两个时间差 中文显示函数
  t1 = new Date(t1), t2 = new Date(t2);
  let r = '',
    n = 0;
  const aTime = [{
    k: '年',
    v: 1000 * 60 * 60 * 24 * 365
  }, {
    k: '个月',
    v: 1000 * 60 * 60 * 24 * 30
  }, {
    k: '天',
    v: 1000 * 60 * 60 * 24
  }, {
    k: '小时',
    v: 1000 * 60 * 60
  }, {
    k: '分钟',
    v: 1000 * 60
  }, {
    k: '秒',
    v: 1000
  }]; //ymdhms格式
  aTime.some((item, idx) => {
    n = Math.abs(t2 - t1) / item.v;
    if (n >= 1) {
      r = ~~n + aTime[idx].k + '前后'.split('')[(t2 - t1) >= 0 ? 0 : 1];
      return 1;
    }
  });
  return r;
};
//测试
/*console.log($.tools.timeAgo('2016-1-1','2017-2-1'));
console.log($.tools.timeAgo('2016-1-1','2016-3-1'));
console.log($.tools.timeAgo('2016-1-1','2016-1-16'));
console.log($.tools.timeAgo('2016-1-1','2016-1-1 1:13:01'));
console.log($.tools.timeAgo('2016-1-1','2016-1-1 0:13:01'));
console.log($.tools.timeAgo('2016-1-1','2016-1-1 0:0:50'));*/

exports.tools.checkParam = function(a, b) { //检查两个对象是否符合参数要求
  // NOTICE : 0的问题
  var c = {};
  var _n;
  for (let i in b) {
    if (b[i].req === 1 && !a[i]) {
      return {
        code: 400,
        msg: i + '必填'
      };
    }
    if (a[i] === undefined) {
      c[i] = a[i] || b[i].def;
      continue;
    }
    switch (b[i].type.toLow()) {
      case 'int':
        _n = a[i] === 0 ? 0 : (a[i] || b[i].def);
        if (!valid.isInt(_n + '')) {
          return {
            code: 400,
            msg: i + '类型错误,应为整型'
          };
        }
        c[i] = _n;
        break;
      case 'positive':
        _n = a[i] === 0 ? 0 : (a[i] || b[i].def);
        if (!valid.isInt(_n + '') || _n <= 0) {
          return {
            code: 400,
            msg: i + '类型错误,应为正数'
          };
        }
        c[i] = _n;
        break;
      case 'negative':
        _n = a[i] === 0 ? 0 : (a[i] || b[i].def);
        if (!valid.isInt(_n + '') || _n >= 0) {
          return {
            code: 400,
            msg: i + '类型错误,应为负数'
          };
        }
        c[i] = _n;
        break;
      case 'string':
        _n = a[i] === '' ? '' : ((a[i] || '') + '' || b[i].def);
        c[i] = _n;
        break;
      case 'datetime':
        // TODO : ie 需要补一个 toISOString 函数
        _n = (a[i] || b[i].def);
        if (!valid.isISO8601(_n + '')) {
          return {
            code: 400,
            msg: i + '类型错误,应为日期型'
          };
        }
        c[i] = _n;
        break;
      case 'bool':
        _n = a[i];
        if (!valid.isBoolean(_n + '')) {
          return {
            code: 400,
            msg: i + '类型错误，,应为布尔型'
          };
        }
        c[i] = _n;
        break;
      case 'number':
        _n = a[i] === 0 ? 0 : (a[i] || b[i].def);
        if (!valid.isDecimal(_n + '')) {
          return {
            code: 400,
            msg: i + '类型错误,应为数值型'
          };
        }
        c[i] = _n;
        break;
      default:
        return {
          code: 500,
          msg: '参数定义错误'
        };
    }
  }
  return {
    code: 200,
    msg: '',
    data: c
  };
};

let utf8 = {
  'encode': function(s) {
    var r = "";
    var len = s.length;
    var fromCode = String.fromCharCode;
    for (var n = 0; n < len; n++) {
      var c = s.charCodeAt(n);
      if (c < 128) {
        r += fromCode(c);
      } else if (c > 127 && c < 2048) {
        r += fromCode((c >> 6) | 192);
        r += fromCode((c & 63) | 128);
      } else {
        r += fromCode((c >> 12) | 224);
        r += fromCode(((c >> 6) & 63) | 128);
        r += fromCode((c & 63) | 128);
      }
    }
    return r;
  },
  'decode': function(s) {
    var r = "";
    var i = 0;
    var c1 = 0;
    var c2 = 0;
    var c3 = 0;
    var fromCode = String.fromCharCode;
    while (i < s.length) {
      c1 = s.charCodeAt(i);
      if (c1 < 128) {
        r += fromCode(c1);
        i++;
      } else if (c1 > 191 && c1 < 224) {
        c2 = s.charCodeAt(i + 1);
        r += fromCode(((c1 & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = s.charCodeAt(i + 1);
        c3 = s.charCodeAt(i + 2);
        r += fromCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
    }
    return r;
  }
};
exports.tools.utf8 = utf8;
let lzw = {
  'compress': function(str) {
    var fromCode = String.fromCharCode;
    var rStr = '';
    rStr = utf8.encode(str);
    var i = 0;
    var size = 0;
    var xstr = '';
    var chars = 256;
    var dict = [];
    for (i = 0; i < chars; i++) {
      dict[i + ''] = i;
    }
    var splitted = [];
    splitted = rStr.split('');
    var buffer = [];
    size = splitted.length;
    var current = '';
    var r = '';
    for (i = 0; i <= size; i++) {
      current = splitted[i] + '';
      xstr = (buffer.length == 0) ? String(current.charCodeAt(0)) : (buffer.join('-') + '-' + String(current.charCodeAt(0)));
      if (dict[xstr] !== undefined) {
        buffer.push(current.charCodeAt(0));
      } else {
        r += fromCode(dict[buffer.join('-')]);
        dict[xstr] = chars;
        chars++;
        buffer = [];
        buffer.push(current.charCodeAt(0));
      }
    }
    return r;
  },
  'uncompress': function(str) {
    var i;
    var chars = 256;
    var dict = [];
    var fromCode = String.fromCharCode;
    for (i = 0; i < chars; i++) {
      dict[i] = fromCode(i);
    }
    var original = str + '';
    var splitted = original.split('');
    var size = splitted.length;
    var buffer = '';
    var chain = '';
    var r = '';
    for (i = 0; i < size; i++) {
      var code = original.charCodeAt(i);
      var current = dict[code];
      if (buffer === '') {
        buffer = current;
        r += current;
      } else {
        if (code <= 255) {
          r += current;
          chain = buffer + current;
          dict[chars] = chain;
          chars++;
          buffer = current;
        } else {
          chain = dict[code];
          if (chain == null) {
            chain = buffer + buffer.slice(0, 1);
          }
          r += chain;
          dict[chars] = buffer + chain.slice(0, 1);
          chars++;
          buffer = chain;
        }
      }
    }
    r = utf8.decode(r);
    return r;
  }
};
exports.tools.lzw = lzw;