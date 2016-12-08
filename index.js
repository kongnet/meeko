'use strict';
let option = {
  logTime: true
};
//日期原型扩展
function getFirstWeekBegDay(year) {
  var tempdate = new Date(year, 0, 1);
  var temp = tempdate.getDay();
  if (temp === 1) {
    return tempdate;
  }
  temp = temp === 0 ? 7 : temp;
  tempdate = tempdate.setDate(tempdate.getDate() + (8 - temp));
  return new Date(tempdate);
}

function getWeekIndex(dateobj) {
  var firstDay = getFirstWeekBegDay(dateobj.getFullYear());
  if (dateobj < firstDay) {
    firstDay = getFirstWeekBegDay(dateobj.getFullYear() - 1);
  }
  var d = Math.floor((dateobj.valueOf() - firstDay.valueOf()) / 86400000);
  return Math.floor(d / 7) + 1;
}

function ext(a, b) {
  if (a && b) {
    for (let c in b) {
      if (b.hasOwnProperty(c)) {
        a[c] = b[c];
      }
    }
    return a;
  }
  return null;
}
Date.prototype.getWeek = function() {
  return getWeekIndex(this);
};
Date.prototype.date2Str = function() {
  let y = this.getFullYear();
  let mon = (this.getMonth() + 1);
  mon = mon < 10 ? ('0' + mon) : mon;
  let date = this.getDate();
  date = date < 10 ? ('0' + date) : date;
  let hour = this.getHours();
  hour = hour < 10 ? ('0' + hour) : hour;
  let min = this.getMinutes();
  min = min < 10 ? ('0' + min) : min;
  let sec = this.getSeconds();
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
  fillStr(str, len) { //填入什么字符多少位,中文算2个字符
    let l = (this + '').len();
    return this + ((len - l) > 0 ? str.times(len - l) : '');
  },
  toMoney(p) { //p精度  
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
  toLow() {
    return this.toLowerCase();
  },
  toUp() {
    return this.toUpperCase();
  },
  esHtml() {
    return this.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  },
  toHtml() {
    return this.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
  },
  reHtml() {
    return this.replace(/<\/?[^>]+>/gi, '');
  },
  times(n) {
    return n > 0 ? new Array(n + 1).join(this) : '';
  },
  format() {
    var s = this,
      a = [];
    for (var i = 0, l = arguments.length; i < l; i++) {
      a.push(arguments[i]);
    }
    return s.replace(/\{(\d+)\}/g, function(m, i) {
      return a[i] || '{' + i + '}';
    });
  },
  len() {
    return this.replace(/[^\x00-\xff]/g, '**').length;
  },
  toInt() {
    return parseInt(this);
  },
  replaceAll(s1, s2) {
    var a = this.split(s1);
    return a.join(s2);
  },
  trim() {
    return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  },
  camelize() {
    return this.replace(/(-[a-z])/g, function(s) {
      return s.substring(1).toUpperCase();
    });
  },
  ec(s) {
    s = s.trim();
    return (new RegExp('(^' + s + '\\s)|(\\s' + s + '$)|(\\s' + s + '\\s)|(^' + s + '$)', 'g')).test(this);
  },
  tc(s) {
    s = s.trim();
    if (this.ec(s)) {
      return this.dc(s);
    } else {
      return this.ac(s);
    }
  },
  dc(s) {
    if (this.ec(s)) {
      return this.trim().split(s).join('').replace(/\s{2,}/g, ' ').trim();
    } else {
      return this;
    }
  },
  ac(s) {
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
let c = {
  /*
  http://stanislavs.org/helppc/ansi_codes.html
  */
  cls: '\x1b[0;0;H\x1b[0J',
  xy(x, y) {
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

let getStackTrace = function() {
  let obj = {};
  Error.captureStackTrace(obj, getStackTrace);
  return obj.stack;
};

let re = /\\(.+)\.js:(\d+:\d+)/g;
let log = function(...args) {
  getStackTrace().split('\n')[2].match(re);
  let s = c.none + ' [' + c.lgreen + RegExp.$1.split('\\').pop() + ':' + RegExp.$2 + ' ' + new Date().date2Str().replaceAll('-', '') + c.none + ']';
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
  let s = c.none + ' [' + c.lred + RegExp.$1.split('\\').pop() + ':' + RegExp.$2 + ' ' + new Date().date2Str().replaceAll('-', '') + c.none + ']';
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


let tools = require('./lib/tools');
let fake = require('./lib/fake');
module.exports = {
  option,
  c,
  ext,
  log,
  err,
  tools,
  fake
};