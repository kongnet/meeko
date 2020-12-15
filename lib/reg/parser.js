/* istanbul ignore file */
// https://github.com/nuysoft/regexp
// forked from https://github.com/ForbesLindesay/regexp

function parse (n) {
  if (typeof n !== 'string') {
    const l = new TypeError('The regexp to parse must be represented as a string.')
    throw l
  }
  return index = 1, cgs = {}, parser.parse(n)
}

function Token (n) {
  this.type = n, this.offset = Token.offset(), this.text = Token.text()
}

function Alternate (n, l) {
  Token.call(this, 'alternate'), this.left = n, this.right = l
}

function Match (n) {
  Token.call(this, 'match'), this.body = n.filter(Boolean)
}

function Group (n, l) {
  Token.call(this, n), this.body = l
}

function CaptureGroup (n) {
  Group.call(this, 'capture-group'), this.index = cgs[this.offset] || (cgs[this.offset] = index++),
  this.body = n
}

function Quantified (n, l) {
  Token.call(this, 'quantified'), this.body = n, this.quantifier = l
}

function Quantifier (n, l) {
  Token.call(this, 'quantifier'), this.min = n, this.max = l, this.greedy = !0
}

function CharSet (n, l) {
  Token.call(this, 'charset'), this.invert = n, this.body = l
}

function CharacterRange (n, l) {
  Token.call(this, 'range'), this.start = n, this.end = l
}

function Literal (n) {
  Token.call(this, 'literal'), this.body = n, this.escaped = this.body != this.text
}

function Unicode (n) {
  Token.call(this, 'unicode'), this.code = n.toUpperCase()
}

function Hex (n) {
  Token.call(this, 'hex'), this.code = n.toUpperCase()
}

function Octal (n) {
  Token.call(this, 'octal'), this.code = n.toUpperCase()
}

function BackReference (n) {
  Token.call(this, 'back-reference'), this.code = n.toUpperCase()
}

function ControlCharacter (n) {
  Token.call(this, 'control-character'), this.code = n.toUpperCase()
}

var parser = (function () {
  function n (n, l) {
    function u () {
      this.constructor = n
    }
    u.prototype = l.prototype, n.prototype = new u()
  }
  function l (n, l, u, t, r) {
    function e (n, l) {
      function u (n) {
        function l (n) {
          return n.charCodeAt(0).toString(16)
            .toUpperCase()
        }
        return n.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
          .replace(/\x08/g, '\\b')
          .replace(/\t/g, '\\t')
          .replace(/\n/g, '\\n')
          .replace(/\f/g, '\\f')
          .replace(/\r/g, '\\r')
          .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function (n) {
            return '\\x0' + l(n)
          })
          .replace(/[\x10-\x1F\x80-\xFF]/g, function (n) {
            return '\\x' + l(n)
          })
          .replace(/[\u0180-\u0FFF]/g, function (n) {
            return '\\u0' + l(n)
          })
          .replace(/[\u1080-\uFFFF]/g, function (n) {
            return '\\u' + l(n)
          })
      }
      let t, r
      switch (n.length) {
        case 0:
          t = 'end of input'
          break

        case 1:
          t = n[0]
          break

        default:
          t = n.slice(0, -1).join(', ') + ' or ' + n[n.length - 1]
      }
      return r = l ? '"' + u(l) + '"' : 'end of input', 'Expected ' + t + ' but ' + r + ' found.'
    }
    this.expected = n, this.found = l, this.offset = u, this.line = t, this.column = r,
    this.name = 'SyntaxError', this.message = e(n, l)
  }
  function u (n) {
    function u () {
      return n.substring(Lt, qt)
    }
    function t () {
      return Lt
    }
    function r (l) {
      function u (l, u, t) {
        let r, e
        for (r = u; t > r; r++) {
          e = n.charAt(r), e === '\n' ? (l.seenCR || l.line++, l.column = 1,
          l.seenCR = !1) : e === '\r' || e === '\u2028' || e === '\u2029' ? (l.line++, l.column = 1,
          l.seenCR = !0) : (l.column++, l.seenCR = !1)
        }
      }
      return Mt !== l && (Mt > l && (Mt = 0, Dt = {
        line: 1,
        column: 1,
        seenCR: !1
      }), u(Dt, Mt, l), Mt = l), Dt
    }
    function e (n) {
      Ht > qt || (qt > Ht && (Ht = qt, Ot = []), Ot.push(n))
    }
    function o (n) {
      let l = 0
      for (n.sort(); l < n.length;) { n[l - 1] === n[l] ? n.splice(l, 1) : l++ }
    }
    function c () {
      let l, u, t, r, o
      return l = qt, u = i(), u !== null ? (t = qt, n.charCodeAt(qt) === 124 ? (r = fl,
      qt++) : (r = null, Wt === 0 && e(sl)), r !== null ? (o = c(), o !== null ? (r = [r, o],
      t = r) : (qt = t, t = il)) : (qt = t, t = il), t === null && (t = al), t !== null ? (Lt = l,
      u = hl(u, t), u === null ? (qt = l, l = u) : l = u) : (qt = l, l = il)) : (qt = l,
      l = il), l
    }
    function i () {
      let n, l, u, t, r
      if (n = qt, l = f(), l === null && (l = al), l !== null) {
        if (u = qt, Wt++, t = d(),
        Wt--, t === null ? u = al : (qt = u, u = il), u !== null) {
          for (t = [], r = h(), r === null && (r = a()); r !== null;) {
            t.push(r), r = h(),
            r === null && (r = a())
          }
          t !== null ? (r = s(), r === null && (r = al), r !== null ? (Lt = n, l = dl(l, t, r),
          l === null ? (qt = n, n = l) : n = l) : (qt = n, n = il)) : (qt = n, n = il)
        } else { qt = n, n = il }
      } else { qt = n, n = il }
      return n
    }
    function a () {
      let n
      return n = x(), n === null && (n = Q(), n === null && (n = B())), n
    }
    function f () {
      let l, u
      return l = qt, n.charCodeAt(qt) === 94 ? (u = pl, qt++) : (u = null, Wt === 0 && e(vl)),
      u !== null && (Lt = l, u = wl()), u === null ? (qt = l, l = u) : l = u, l
    }
    function s () {
      let l, u
      return l = qt, n.charCodeAt(qt) === 36 ? (u = Al, qt++) : (u = null, Wt === 0 && e(Cl)),
      u !== null && (Lt = l, u = gl()), u === null ? (qt = l, l = u) : l = u, l
    }
    function h () {
      let n, l, u
      return n = qt, l = a(), l !== null ? (u = d(), u !== null ? (Lt = n, l = bl(l, u),
      l === null ? (qt = n, n = l) : n = l) : (qt = n, n = il)) : (qt = n, n = il), n
    }
    function d () {
      let n, l, u
      return Wt++, n = qt, l = p(), l !== null ? (u = k(), u === null && (u = al), u !== null ? (Lt = n,
      l = Tl(l, u), l === null ? (qt = n, n = l) : n = l) : (qt = n, n = il)) : (qt = n,
      n = il), Wt--, n === null && (l = null, Wt === 0 && e(kl)), n
    }
    function p () {
      let n
      return n = v(), n === null && (n = w(), n === null && (n = A(), n === null && (n = C(),
      n === null && (n = g(), n === null && (n = b()))))), n
    }
    function v () {
      let l, u, t, r, o, c
      return l = qt, n.charCodeAt(qt) === 123 ? (u = xl, qt++) : (u = null, Wt === 0 && e(yl)),
      u !== null ? (t = T(), t !== null ? (n.charCodeAt(qt) === 44 ? (r = ml, qt++) : (r = null,
      Wt === 0 && e(Rl)), r !== null ? (o = T(), o !== null ? (n.charCodeAt(qt) === 125 ? (c = Fl,
      qt++) : (c = null, Wt === 0 && e(Ql)), c !== null ? (Lt = l, u = Sl(t, o), u === null ? (qt = l,
      l = u) : l = u) : (qt = l, l = il)) : (qt = l, l = il)) : (qt = l, l = il)) : (qt = l,
      l = il)) : (qt = l, l = il), l
    }
    function w () {
      let l, u, t, r
      return l = qt, n.charCodeAt(qt) === 123 ? (u = xl, qt++) : (u = null, Wt === 0 && e(yl)),
      u !== null ? (t = T(), t !== null ? (n.substr(qt, 2) === Ul ? (r = Ul, qt += 2) : (r = null,
      Wt === 0 && e(El)), r !== null ? (Lt = l, u = Gl(t), u === null ? (qt = l, l = u) : l = u) : (qt = l,
      l = il)) : (qt = l, l = il)) : (qt = l, l = il), l
    }
    function A () {
      let l, u, t, r
      return l = qt, n.charCodeAt(qt) === 123 ? (u = xl, qt++) : (u = null, Wt === 0 && e(yl)),
      u !== null ? (t = T(), t !== null ? (n.charCodeAt(qt) === 125 ? (r = Fl, qt++) : (r = null,
      Wt === 0 && e(Ql)), r !== null ? (Lt = l, u = Bl(t), u === null ? (qt = l, l = u) : l = u) : (qt = l,
      l = il)) : (qt = l, l = il)) : (qt = l, l = il), l
    }
    function C () {
      let l, u
      return l = qt, n.charCodeAt(qt) === 43 ? (u = jl, qt++) : (u = null, Wt === 0 && e($l)),
      u !== null && (Lt = l, u = ql()), u === null ? (qt = l, l = u) : l = u, l
    }
    function g () {
      let l, u
      return l = qt, n.charCodeAt(qt) === 42 ? (u = Ll, qt++) : (u = null, Wt === 0 && e(Ml)),
      u !== null && (Lt = l, u = Dl()), u === null ? (qt = l, l = u) : l = u, l
    }
    function b () {
      let l, u
      return l = qt, n.charCodeAt(qt) === 63 ? (u = Hl, qt++) : (u = null, Wt === 0 && e(Ol)),
      u !== null && (Lt = l, u = Wl()), u === null ? (qt = l, l = u) : l = u, l
    }
    function k () {
      let l
      return n.charCodeAt(qt) === 63 ? (l = Hl, qt++) : (l = null, Wt === 0 && e(Ol)),
      l
    }
    function T () {
      let l, u, t
      if (l = qt, u = [], zl.test(n.charAt(qt)) ? (t = n.charAt(qt), qt++) : (t = null,
      Wt === 0 && e(Il)), t !== null) {
        for (; t !== null;) {
          u.push(t), zl.test(n.charAt(qt)) ? (t = n.charAt(qt),
          qt++) : (t = null, Wt === 0 && e(Il))
        }
      } else { u = il }
      return u !== null && (Lt = l, u = Jl(u)), u === null ? (qt = l, l = u) : l = u,
      l
    }
    function x () {
      let l, u, t, r
      return l = qt, n.charCodeAt(qt) === 40 ? (u = Kl, qt++) : (u = null, Wt === 0 && e(Nl)),
      u !== null ? (t = R(), t === null && (t = F(), t === null && (t = m(), t === null && (t = y()))),
      t !== null ? (n.charCodeAt(qt) === 41 ? (r = Pl, qt++) : (r = null, Wt === 0 && e(Vl)),
      r !== null ? (Lt = l, u = Xl(t), u === null ? (qt = l, l = u) : l = u) : (qt = l,
      l = il)) : (qt = l, l = il)) : (qt = l, l = il), l
    }
    function y () {
      let n, l
      return n = qt, l = c(), l !== null && (Lt = n, l = Yl(l)), l === null ? (qt = n,
      n = l) : n = l, n
    }
    function m () {
      let l, u, t
      return l = qt, n.substr(qt, 2) === Zl ? (u = Zl, qt += 2) : (u = null, Wt === 0 && e(_l)),
      u !== null ? (t = c(), t !== null ? (Lt = l, u = nu(t), u === null ? (qt = l, l = u) : l = u) : (qt = l,
      l = il)) : (qt = l, l = il), l
    }
    function R () {
      let l, u, t
      return l = qt, n.substr(qt, 2) === lu ? (u = lu, qt += 2) : (u = null, Wt === 0 && e(uu)),
      u !== null ? (t = c(), t !== null ? (Lt = l, u = tu(t), u === null ? (qt = l, l = u) : l = u) : (qt = l,
      l = il)) : (qt = l, l = il), l
    }
    function F () {
      let l, u, t
      return l = qt, n.substr(qt, 2) === ru ? (u = ru, qt += 2) : (u = null, Wt === 0 && e(eu)),
      u !== null ? (t = c(), t !== null ? (Lt = l, u = ou(t), u === null ? (qt = l, l = u) : l = u) : (qt = l,
      l = il)) : (qt = l, l = il), l
    }
    function Q () {
      let l, u, t, r, o
      if (Wt++, l = qt, n.charCodeAt(qt) === 91 ? (u = iu, qt++) : (u = null, Wt === 0 && e(au)),
      u !== null) {
        if (n.charCodeAt(qt) === 94 ? (t = pl, qt++) : (t = null, Wt === 0 && e(vl)),
        t === null && (t = al), t !== null) {
          for (r = [], o = S(), o === null && (o = U()); o !== null;) {
            r.push(o), o = S(),
            o === null && (o = U())
          }
          r !== null ? (n.charCodeAt(qt) === 93 ? (o = fu, qt++) : (o = null, Wt === 0 && e(su)),
          o !== null ? (Lt = l, u = hu(t, r), u === null ? (qt = l, l = u) : l = u) : (qt = l,
          l = il)) : (qt = l, l = il)
        } else { qt = l, l = il }
      } else { qt = l, l = il }
      return Wt--, l === null && (u = null, Wt === 0 && e(cu)), l
    }
    function S () {
      let l, u, t, r
      return Wt++, l = qt, u = U(), u !== null ? (n.charCodeAt(qt) === 45 ? (t = pu, qt++) : (t = null,
      Wt === 0 && e(vu)), t !== null ? (r = U(), r !== null ? (Lt = l, u = wu(u, r), u === null ? (qt = l,
      l = u) : l = u) : (qt = l, l = il)) : (qt = l, l = il)) : (qt = l, l = il), Wt--,
      l === null && (u = null, Wt === 0 && e(du)), l
    }
    function U () {
      let n, l
      return Wt++, n = G(), n === null && (n = E()), Wt--, n === null && (l = null, Wt === 0 && e(Au)),
      n
    }
    function E () {
      let l, u
      return l = qt, Cu.test(n.charAt(qt)) ? (u = n.charAt(qt), qt++) : (u = null, Wt === 0 && e(gu)),
      u !== null && (Lt = l, u = bu(u)), u === null ? (qt = l, l = u) : l = u, l
    }
    function G () {
      let n
      return n = L(), n === null && (n = Y(), n === null && (n = H(), n === null && (n = O(),
      n === null && (n = W(), n === null && (n = z(), n === null && (n = I(), n === null && (n = J(),
      n === null && (n = K(), n === null && (n = N(), n === null && (n = P(), n === null && (n = V(),
      n === null && (n = X(), n === null && (n = _(), n === null && (n = nl(), n === null && (n = ll(),
      n === null && (n = ul(), n === null && (n = tl()))))))))))))))))), n
    }
    function B () {
      let n
      return n = j(), n === null && (n = q(), n === null && (n = $())), n
    }
    function j () {
      let l, u
      return l = qt, n.charCodeAt(qt) === 46 ? (u = ku, qt++) : (u = null, Wt === 0 && e(Tu)),
      u !== null && (Lt = l, u = xu()), u === null ? (qt = l, l = u) : l = u, l
    }
    function $ () {
      let l, u
      return Wt++, l = qt, mu.test(n.charAt(qt)) ? (u = n.charAt(qt), qt++) : (u = null,
      Wt === 0 && e(Ru)), u !== null && (Lt = l, u = bu(u)), u === null ? (qt = l, l = u) : l = u,
      Wt--, l === null && (u = null, Wt === 0 && e(yu)), l
    }
    function q () {
      let n
      return n = M(), n === null && (n = D(), n === null && (n = Y(), n === null && (n = H(),
      n === null && (n = O(), n === null && (n = W(), n === null && (n = z(), n === null && (n = I(),
      n === null && (n = J(), n === null && (n = K(), n === null && (n = N(), n === null && (n = P(),
      n === null && (n = V(), n === null && (n = X(), n === null && (n = Z(), n === null && (n = _(),
      n === null && (n = nl(), n === null && (n = ll(), n === null && (n = ul(), n === null && (n = tl()))))))))))))))))))),
      n
    }
    function L () {
      let l, u
      return l = qt, n.substr(qt, 2) === Fu ? (u = Fu, qt += 2) : (u = null, Wt === 0 && e(Qu)),
      u !== null && (Lt = l, u = Su()), u === null ? (qt = l, l = u) : l = u, l
    }
    function M () {
      let l, u
      return l = qt, n.substr(qt, 2) === Fu ? (u = Fu, qt += 2) : (u = null, Wt === 0 && e(Qu)),
      u !== null && (Lt = l, u = Uu()), u === null ? (qt = l, l = u) : l = u, l
    }
    function D () {
      let l, u
      return l = qt, n.substr(qt, 2) === Eu ? (u = Eu, qt += 2) : (u = null, Wt === 0 && e(Gu)),
      u !== null && (Lt = l, u = Bu()), u === null ? (qt = l, l = u) : l = u, l
    }
    function H () {
      let l, u
      return l = qt, n.substr(qt, 2) === ju ? (u = ju, qt += 2) : (u = null, Wt === 0 && e($u)),
      u !== null && (Lt = l, u = qu()), u === null ? (qt = l, l = u) : l = u, l
    }
    function O () {
      let l, u
      return l = qt, n.substr(qt, 2) === Lu ? (u = Lu, qt += 2) : (u = null, Wt === 0 && e(Mu)),
      u !== null && (Lt = l, u = Du()), u === null ? (qt = l, l = u) : l = u, l
    }
    function W () {
      let l, u
      return l = qt, n.substr(qt, 2) === Hu ? (u = Hu, qt += 2) : (u = null, Wt === 0 && e(Ou)),
      u !== null && (Lt = l, u = Wu()), u === null ? (qt = l, l = u) : l = u, l
    }
    function z () {
      let l, u
      return l = qt, n.substr(qt, 2) === zu ? (u = zu, qt += 2) : (u = null, Wt === 0 && e(Iu)),
      u !== null && (Lt = l, u = Ju()), u === null ? (qt = l, l = u) : l = u, l
    }
    function I () {
      let l, u
      return l = qt, n.substr(qt, 2) === Ku ? (u = Ku, qt += 2) : (u = null, Wt === 0 && e(Nu)),
      u !== null && (Lt = l, u = Pu()), u === null ? (qt = l, l = u) : l = u, l
    }
    function J () {
      let l, u
      return l = qt, n.substr(qt, 2) === Vu ? (u = Vu, qt += 2) : (u = null, Wt === 0 && e(Xu)),
      u !== null && (Lt = l, u = Yu()), u === null ? (qt = l, l = u) : l = u, l
    }
    function K () {
      let l, u
      return l = qt, n.substr(qt, 2) === Zu ? (u = Zu, qt += 2) : (u = null, Wt === 0 && e(_u)),
      u !== null && (Lt = l, u = nt()), u === null ? (qt = l, l = u) : l = u, l
    }
    function N () {
      let l, u
      return l = qt, n.substr(qt, 2) === lt ? (u = lt, qt += 2) : (u = null, Wt === 0 && e(ut)),
      u !== null && (Lt = l, u = tt()), u === null ? (qt = l, l = u) : l = u, l
    }
    function P () {
      let l, u
      return l = qt, n.substr(qt, 2) === rt ? (u = rt, qt += 2) : (u = null, Wt === 0 && e(et)),
      u !== null && (Lt = l, u = ot()), u === null ? (qt = l, l = u) : l = u, l
    }
    function V () {
      let l, u
      return l = qt, n.substr(qt, 2) === ct ? (u = ct, qt += 2) : (u = null, Wt === 0 && e(it)),
      u !== null && (Lt = l, u = at()), u === null ? (qt = l, l = u) : l = u, l
    }
    function X () {
      let l, u
      return l = qt, n.substr(qt, 2) === ft ? (u = ft, qt += 2) : (u = null, Wt === 0 && e(st)),
      u !== null && (Lt = l, u = ht()), u === null ? (qt = l, l = u) : l = u, l
    }
    function Y () {
      let l, u, t
      return l = qt, n.substr(qt, 2) === dt ? (u = dt, qt += 2) : (u = null, Wt === 0 && e(pt)),
      u !== null ? (n.length > qt ? (t = n.charAt(qt), qt++) : (t = null, Wt === 0 && e(vt)),
      t !== null ? (Lt = l, u = wt(t), u === null ? (qt = l, l = u) : l = u) : (qt = l,
      l = il)) : (qt = l, l = il), l
    }
    function Z () {
      let l, u, t
      return l = qt, n.charCodeAt(qt) === 92 ? (u = At, qt++) : (u = null, Wt === 0 && e(Ct)),
      u !== null ? (gt.test(n.charAt(qt)) ? (t = n.charAt(qt), qt++) : (t = null, Wt === 0 && e(bt)),
      t !== null ? (Lt = l, u = kt(t), u === null ? (qt = l, l = u) : l = u) : (qt = l,
      l = il)) : (qt = l, l = il), l
    }
    function _ () {
      let l, u, t, r
      if (l = qt, n.substr(qt, 2) === Tt ? (u = Tt, qt += 2) : (u = null, Wt === 0 && e(xt)),
      u !== null) {
        if (t = [], yt.test(n.charAt(qt)) ? (r = n.charAt(qt), qt++) : (r = null, Wt === 0 && e(mt)),
        r !== null) {
          for (; r !== null;) {
            t.push(r), yt.test(n.charAt(qt)) ? (r = n.charAt(qt),
            qt++) : (r = null, Wt === 0 && e(mt))
          }
        } else { t = il }
        t !== null ? (Lt = l, u = Rt(t), u === null ? (qt = l, l = u) : l = u) : (qt = l,
        l = il)
      } else { qt = l, l = il }
      return l
    }
    function nl () {
      let l, u, t, r
      if (l = qt, n.substr(qt, 2) === Ft ? (u = Ft, qt += 2) : (u = null, Wt === 0 && e(Qt)),
      u !== null) {
        if (t = [], St.test(n.charAt(qt)) ? (r = n.charAt(qt), qt++) : (r = null, Wt === 0 && e(Ut)),
        r !== null) {
          for (; r !== null;) {
            t.push(r), St.test(n.charAt(qt)) ? (r = n.charAt(qt),
            qt++) : (r = null, Wt === 0 && e(Ut))
          }
        } else { t = il }
        t !== null ? (Lt = l, u = Et(t), u === null ? (qt = l, l = u) : l = u) : (qt = l,
        l = il)
      } else { qt = l, l = il }
      return l
    }
    function ll () {
      let l, u, t, r
      if (l = qt, n.substr(qt, 2) === Gt ? (u = Gt, qt += 2) : (u = null, Wt === 0 && e(Bt)),
      u !== null) {
        if (t = [], St.test(n.charAt(qt)) ? (r = n.charAt(qt), qt++) : (r = null, Wt === 0 && e(Ut)),
        r !== null) {
          for (; r !== null;) {
            t.push(r), St.test(n.charAt(qt)) ? (r = n.charAt(qt),
            qt++) : (r = null, Wt === 0 && e(Ut))
          }
        } else { t = il }
        t !== null ? (Lt = l, u = jt(t), u === null ? (qt = l, l = u) : l = u) : (qt = l,
        l = il)
      } else { qt = l, l = il }
      return l
    }
    function ul () {
      let l, u
      return l = qt, n.substr(qt, 2) === Tt ? (u = Tt, qt += 2) : (u = null, Wt === 0 && e(xt)),
      u !== null && (Lt = l, u = $t()), u === null ? (qt = l, l = u) : l = u, l
    }
    function tl () {
      let l, u, t
      return l = qt, n.charCodeAt(qt) === 92 ? (u = At, qt++) : (u = null, Wt === 0 && e(Ct)),
      u !== null ? (n.length > qt ? (t = n.charAt(qt), qt++) : (t = null, Wt === 0 && e(vt)),
      t !== null ? (Lt = l, u = bu(t), u === null ? (qt = l, l = u) : l = u) : (qt = l,
      l = il)) : (qt = l, l = il), l
    }
    let rl; const el = arguments.length > 1 ? arguments[1] : {}; const ol = {
      regexp: c
    }; let cl = c; var il = null; var al = ''; var fl = '|'; var sl = '"|"'; var hl = function (n, l) {
      return l ? new Alternate(n, l[1]) : n
    }; var dl = function (n, l, u) {
      return new Match([n].concat(l).concat([u]))
    }; var pl = '^'; var vl = '"^"'; var wl = function () {
      return new Token('start')
    }; var Al = '$'; var Cl = '"$"'; var gl = function () {
      return new Token('end')
    }; var bl = function (n, l) {
      return new Quantified(n, l)
    }; var kl = 'Quantifier'; var Tl = function (n, l) {
      return l && (n.greedy = !1), n
    }; var xl = '{'; var yl = '"{"'; var ml = ','; var Rl = '","'; var Fl = '}'; var Ql = '"}"'; var Sl = function (n, l) {
      return new Quantifier(n, l)
    }; var Ul = ',}'; var El = '",}"'; var Gl = function (n) {
      return new Quantifier(n, 1 / 0)
    }; var Bl = function (n) {
      return new Quantifier(n, n)
    }; var jl = '+'; var $l = '"+"'; var ql = function () {
      return new Quantifier(1, 1 / 0)
    }; var Ll = '*'; var Ml = '"*"'; var Dl = function () {
      return new Quantifier(0, 1 / 0)
    }; var Hl = '?'; var Ol = '"?"'; var Wl = function () {
      return new Quantifier(0, 1)
    }; var zl = /^[0-9]/; var Il = '[0-9]'; var Jl = function (n) {
      return +n.join('')
    }; var Kl = '('; var Nl = '"("'; var Pl = ')'; var Vl = '")"'; var Xl = function (n) {
      return n
    }; var Yl = function (n) {
      return new CaptureGroup(n)
    }; var Zl = '?:'; var _l = '"?:"'; var nu = function (n) {
      return new Group('non-capture-group', n)
    }; var lu = '?='; var uu = '"?="'; var tu = function (n) {
      return new Group('positive-lookahead', n)
    }; var ru = '?!'; var eu = '"?!"'; var ou = function (n) {
      return new Group('negative-lookahead', n)
    }; var cu = 'CharacterSet'; var iu = '['; var au = '"["'; var fu = ']'; var su = '"]"'; var hu = function (n, l) {
      return new CharSet(!!n, l)
    }; var du = 'CharacterRange'; var pu = '-'; var vu = '"-"'; var wu = function (n, l) {
      return new CharacterRange(n, l)
    }; var Au = 'Character'; var Cu = /^[^\\\]]/; var gu = '[^\\\\\\]]'; var bu = function (n) {
      return new Literal(n)
    }; var ku = '.'; var Tu = '"."'; var xu = function () {
      return new Token('any-character')
    }; var yu = 'Literal'; var mu = /^[^|\\\/.[()?+*$\^]/; var Ru = '[^|\\\\\\/.[()?+*$\\^]'; var Fu = '\\b'; var Qu = '"\\\\b"'; var Su = function () {
      return new Token('backspace')
    }; var Uu = function () {
      return new Token('word-boundary')
    }; var Eu = '\\B'; var Gu = '"\\\\B"'; var Bu = function () {
      return new Token('non-word-boundary')
    }; var ju = '\\d'; var $u = '"\\\\d"'; var qu = function () {
      return new Token('digit')
    }; var Lu = '\\D'; var Mu = '"\\\\D"'; var Du = function () {
      return new Token('non-digit')
    }; var Hu = '\\f'; var Ou = '"\\\\f"'; var Wu = function () {
      return new Token('form-feed')
    }; var zu = '\\n'; var Iu = '"\\\\n"'; var Ju = function () {
      return new Token('line-feed')
    }; var Ku = '\\r'; var Nu = '"\\\\r"'; var Pu = function () {
      return new Token('carriage-return')
    }; var Vu = '\\s'; var Xu = '"\\\\s"'; var Yu = function () {
      return new Token('white-space')
    }; var Zu = '\\S'; var _u = '"\\\\S"'; var nt = function () {
      return new Token('non-white-space')
    }; var lt = '\\t'; var ut = '"\\\\t"'; var tt = function () {
      return new Token('tab')
    }; var rt = '\\v'; var et = '"\\\\v"'; var ot = function () {
      return new Token('vertical-tab')
    }; var ct = '\\w'; var it = '"\\\\w"'; var at = function () {
      return new Token('word')
    }; var ft = '\\W'; var st = '"\\\\W"'; var ht = function () {
      return new Token('non-word')
    }; var dt = '\\c'; var pt = '"\\\\c"'; var vt = 'any character'; var wt = function (n) {
      return new ControlCharacter(n)
    }; var At = '\\'; var Ct = '"\\\\"'; var gt = /^[1-9]/; var bt = '[1-9]'; var kt = function (n) {
      return new BackReference(n)
    }; var Tt = '\\0'; var xt = '"\\\\0"'; var yt = /^[0-7]/; var mt = '[0-7]'; var Rt = function (n) {
      return new Octal(n.join(''))
    }; var Ft = '\\x'; var Qt = '"\\\\x"'; var St = /^[0-9a-fA-F]/; var Ut = '[0-9a-fA-F]'; var Et = function (n) {
      return new Hex(n.join(''))
    }; var Gt = '\\u'; var Bt = '"\\\\u"'; var jt = function (n) {
      return new Unicode(n.join(''))
    }; var $t = function () {
      return new Token('null-character')
    }; var qt = 0; var Lt = 0; var Mt = 0; var Dt = {
      line: 1,
      column: 1,
      seenCR: !1
    }; var Ht = 0; var Ot = []; var Wt = 0
    if ('startRule' in el) {
      if (!(el.startRule in ol)) { throw new Error("Can't start parsing from rule \"" + el.startRule + '".') }
      cl = ol[el.startRule]
    }
    if (Token.offset = t, Token.text = u, rl = cl(), rl !== null && qt === n.length) { return rl }
    throw o(Ot), Lt = Math.max(qt, Ht), new l(Ot, Lt < n.length ? n.charAt(Lt) : null, Lt, r(Lt).line, r(Lt).column)
  }
  return n(l, Error), {
    SyntaxError: l,
    parse: u
  }
}()); var index = 1; var cgs = {}

module.exports = parser
