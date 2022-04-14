/*
global define
*/
!(function () {
  'use strict'
  let f
  let b = {
    open: '{{',
    close: '}}'
  }
  let c = {
    exp (a) {
      return new RegExp(a, 'g')
    },
    query (a, c, e) {
      let f = ['#([\\s\\S])+?', '([^{#}])*?'][a || 0]
      return d((c || '') + b.open + f + b.close + (e || ''))
    },
    escape (a) {
      return String(a || '')
        .replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/'/g, '&#39;')
        .replace(/"/g, '&quot;')
    },
    error (a, b) {
      let c = 'Laytpl Error：'
      return typeof console === 'object' && console.error(c + a + '\n' + (b || '')), c + a
    }
  }

  let d = c.exp

  let e = function (a) {
    this.tpl = a
  }
  ;(e.pt = e.prototype),
    (e.pt.parse = function (a, e) {
      let f = this

      let g = a

      let h = d('^' + b.open + '#', '')

      let i = d(b.close + '$', '')
      a = a.replace(/\n/g, '＼ｎ')
      a = a.replace(/\r/g, '＼ｒ')
      // a=a.replace(/[\n\r\t]/g,"") //\t
      ;(a = a
        .replace(d(b.open + '#'), b.open + '# ')
        .replace(d(b.close + '}'), '} ' + b.close)
        .replace(/\\/g, '\\\\')
        .replace(/(?="|')/g, '\\')
        .replace(c.query(), function (a) {
          return (a = a.replace(h, '').replace(i, '')), '";' + a.replace(/\\/g, '') + '; view+="'
        })
        .replace(c.query(1), function (a) {
          let c = '"+('
          return a.replace(/\s/g, '') === b.open + b.close
            ? ''
            : ((a = a.replace(d(b.open + '|' + b.close), '')), /^=/.test(a) && ((a = a.replace(/^=/, '')), (c = '"+_escape_(')), c + a.replace(/\\/g, '') + ')+"')
        })),
        (a = '"use strict";let view = "' + a + '";return view;')
      try {
        return (f.cache = a = new Function('d, _escape_', a)), a(e, c.escape)
      } catch (j) {
        return delete f.cache, c.error(j, g)
      }
    }),
    (e.pt.render = function (a, b) {
      let e
      let d = this
      return a
        ? ((e = d.cache
            ? d.cache(a, c.escape)
            : d
                .parse(d.tpl, a)
                .replaceAll('＼ｎ', '\n')
                .replaceAll('＼ｒ', '\r')),
          b ? (b(e), void 0) : e)
        : c.error('no data')
    }),
    (f = function (a) {
      return typeof a !== 'string' ? c.error('Template not found') : new e(a)
    }),
    (f.config = function (a) {
      a = a || {}
      for (let c in a) {
        b[c] = a[c]
      }
    }),
    (f.v = '1.1'),
    typeof define === 'function'
      ? define(function () {
          return f
        })
      : typeof exports !== 'undefined'
      ? (module.exports = f)
      : (window.laytpl = f)
})()
