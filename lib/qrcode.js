/* istanbul ignore file */

/**
 * @class
 */

const VERSIONS = [
  null,
  [[10, 7, 17, 13], [1, 1, 1, 1], []],
  [
    [16, 10, 28, 22],
    [1, 1, 1, 1],
    [4, 16]
  ],
  [
    [26, 15, 22, 18],
    [1, 1, 2, 2],
    [4, 20]
  ],
  [
    [18, 20, 16, 26],
    [2, 1, 4, 2],
    [4, 24]
  ],
  [
    [24, 26, 22, 18],
    [2, 1, 4, 4],
    [4, 28]
  ],
  [
    [16, 18, 28, 24],
    [4, 2, 4, 4],
    [4, 32]
  ],
  [
    [18, 20, 26, 18],
    [4, 2, 5, 6],
    [4, 20, 36]
  ],
  [
    [22, 24, 26, 22],
    [4, 2, 6, 6],
    [4, 22, 40]
  ],
  [
    [22, 30, 24, 20],
    [5, 2, 8, 8],
    [4, 24, 44]
  ],
  [
    [26, 18, 28, 24],
    [5, 4, 8, 8],
    [4, 26, 48]
  ],
  [
    [30, 20, 24, 28],
    [5, 4, 11, 8],
    [4, 28, 52]
  ],
  [
    [22, 24, 28, 26],
    [8, 4, 11, 10],
    [4, 30, 56]
  ],
  [
    [22, 26, 22, 24],
    [9, 4, 16, 12],
    [4, 32, 60]
  ],
  [
    [24, 30, 24, 20],
    [9, 4, 16, 16],
    [4, 24, 44, 64]
  ],
  [
    [24, 22, 24, 30],
    [10, 6, 18, 12],
    [4, 24, 46, 68]
  ],
  [
    [28, 24, 30, 24],
    [10, 6, 16, 17],
    [4, 24, 48, 72]
  ],
  [
    [28, 28, 28, 28],
    [11, 6, 19, 16],
    [4, 28, 52, 76]
  ],
  [
    [26, 30, 28, 28],
    [13, 6, 21, 18],
    [4, 28, 54, 80]
  ],
  [
    [26, 28, 26, 26],
    [14, 7, 25, 21],
    [4, 28, 56, 84]
  ],
  [
    [26, 28, 28, 30],
    [16, 8, 25, 20],
    [4, 32, 60, 88]
  ],
  [
    [26, 28, 30, 28],
    [17, 8, 25, 23],
    [4, 26, 48, 70, 92]
  ],
  [
    [28, 28, 24, 30],
    [17, 9, 34, 23],
    [4, 24, 48, 72, 96]
  ],
  [
    [28, 30, 30, 30],
    [18, 9, 30, 25],
    [4, 28, 52, 76, 100]
  ],
  [
    [28, 30, 30, 30],
    [20, 10, 32, 27],
    [4, 26, 52, 78, 104]
  ],
  [
    [28, 26, 30, 30],
    [21, 12, 35, 29],
    [4, 30, 56, 82, 108]
  ],
  [
    [28, 28, 30, 28],
    [23, 12, 37, 34],
    [4, 28, 56, 84, 112]
  ],
  [
    [28, 30, 30, 30],
    [25, 12, 40, 34],
    [4, 32, 60, 88, 116]
  ],
  [
    [28, 30, 30, 30],
    [26, 13, 42, 35],
    [4, 24, 48, 72, 96, 120]
  ],
  [
    [28, 30, 30, 30],
    [28, 14, 45, 38],
    [4, 28, 52, 76, 100, 124]
  ],
  [
    [28, 30, 30, 30],
    [29, 15, 48, 40],
    [4, 24, 50, 76, 102, 128]
  ],
  [
    [28, 30, 30, 30],
    [31, 16, 51, 43],
    [4, 28, 54, 80, 106, 132]
  ],
  [
    [28, 30, 30, 30],
    [33, 17, 54, 45],
    [4, 32, 58, 84, 110, 136]
  ],
  [
    [28, 30, 30, 30],
    [35, 18, 57, 48],
    [4, 28, 56, 84, 112, 140]
  ],
  [
    [28, 30, 30, 30],
    [37, 19, 60, 51],
    [4, 32, 60, 88, 116, 144]
  ],
  [
    [28, 30, 30, 30],
    [38, 19, 63, 53],
    [4, 28, 52, 76, 100, 124, 148]
  ],
  [
    [28, 30, 30, 30],
    [40, 20, 66, 56],
    [4, 22, 48, 74, 100, 126, 152]
  ],
  [
    [28, 30, 30, 30],
    [43, 21, 70, 59],
    [4, 26, 52, 78, 104, 130, 156]
  ],
  [
    [28, 30, 30, 30],
    [45, 22, 74, 62],
    [4, 30, 56, 82, 108, 134, 160]
  ],
  [
    [28, 30, 30, 30],
    [47, 24, 77, 65],
    [4, 24, 52, 80, 108, 136, 164]
  ],
  [
    [28, 30, 30, 30],
    [49, 25, 81, 68],
    [4, 28, 56, 84, 112, 140, 168]
  ]
]

const MODE_TERMINATOR = 0
const MODE_NUMERIC = 1
const MODE_ALPHANUMERIC = 2
const MODE_OCTET = 4
const MODE_KANJI = 8

// validation regexps
const NUMERIC_REGEXP = /^\d*$/
const ALPHANUMERIC_REGEXP = /^[A-Za-z0-9 $%*+\-./:]*$/
const ALPHANUMERIC_OUT_REGEXP = /^[A-Z0-9 $%*+\-./:]*$/

const ECCLEVEL_L = 1
const ECCLEVEL_M = 0
const ECCLEVEL_Q = 3
const ECCLEVEL_H = 2

const GF256_MAP = []
const GF256_INVMAP = [-1]
for (let i = 0, v = 1; i < 255; ++i) {
  GF256_MAP.push(v)
  GF256_INVMAP[v] = i
  v = (v * 2) ^ (v >= 128 ? 0x11d : 0)
}

const GF256_GENPOLY = [[]]
for (let i = 0; i < 30; ++i) {
  const prevpoly = GF256_GENPOLY[i]
  const poly = []
  for (let j = 0; j <= i; ++j) {
    const a = j < i ? GF256_MAP[prevpoly[j]] : 0
    const b = GF256_MAP[(i + (prevpoly[j - 1] || 0)) % 255]
    poly.push(GF256_INVMAP[a ^ b])
  }
  GF256_GENPOLY.push(poly)
}

const ALPHANUMERIC_MAP = {}
for (let i = 0; i < 45; ++i) {
  ALPHANUMERIC_MAP['0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:'.charAt(i)] = i
}

const MASKFUNCS = [
  function (i, j) {
    return (i + j) % 2 == 0
  },
  function (i, j) {
    return i % 2 == 0
  },
  function (i, j) {
    return j % 3 == 0
  },
  function (i, j) {
    return (i + j) % 3 == 0
  },
  function (i, j) {
    return (((i / 2) | 0) + ((j / 3) | 0)) % 2 == 0
  },
  function (i, j) {
    return ((i * j) % 2) + ((i * j) % 3) == 0
  },
  function (i, j) {
    return (((i * j) % 2) + ((i * j) % 3)) % 2 == 0
  },
  function (i, j) {
    return (((i + j) % 2) + ((i * j) % 3)) % 2 == 0
  }
]

const needsverinfo = function (ver) {
  return ver > 6
}
const getsizebyver = function (ver) {
  return 4 * ver + 17
}

const nfullbits = function (ver) {
  const v = VERSIONS[ver]
  let nbits = 16 * ver * ver + 128 * ver + 64 // finder, timing and format info.
  if (needsverinfo(ver)) {
    nbits -= 36
  } // version information
  if (v[2].length) {
    // alignment patterns
    nbits -= 25 * v[2].length * v[2].length - 10 * v[2].length - 55
  }
  return nbits
}

const ndatabits = function (ver, ecclevel) {
  let nbits = nfullbits(ver) & ~7
  const v = VERSIONS[ver]
  nbits -= 8 * v[0][ecclevel] * v[1][ecclevel] // ecc bits
  return nbits
}

const ndatalenbits = function (ver, mode) {
  switch (mode) {
    case MODE_NUMERIC:
      return ver < 10 ? 10 : ver < 27 ? 12 : 14
    case MODE_ALPHANUMERIC:
      return ver < 10 ? 9 : ver < 27 ? 11 : 13
    case MODE_OCTET:
      return ver < 10 ? 8 : 16
    case MODE_KANJI:
      return ver < 10 ? 8 : ver < 27 ? 10 : 12
  }
}

const getmaxdatalen = function (ver, mode, ecclevel) {
  const nbits = ndatabits(ver, ecclevel) - 4 - ndatalenbits(ver, mode)
  switch (mode) {
    case MODE_NUMERIC:
      return ((nbits / 10) | 0) * 3 + (nbits % 10 < 4 ? 0 : nbits % 10 < 7 ? 1 : 2)
    case MODE_ALPHANUMERIC:
      return ((nbits / 11) | 0) * 2 + (nbits % 11 < 6 ? 0 : 1)
    case MODE_OCTET:
      return (nbits / 8) | 0
    case MODE_KANJI:
      return (nbits / 13) | 0
  }
}

const validatedata = function (mode, data) {
  switch (mode) {
    case MODE_NUMERIC:
      if (!data.match(NUMERIC_REGEXP)) {
        return null
      }
      return data

    case MODE_ALPHANUMERIC:
      if (!data.match(ALPHANUMERIC_REGEXP)) {
        return null
      }
      return data.toUpperCase()

    case MODE_OCTET:
      if (typeof data === 'string') {
        // encode as utf-8 string
        const newdata = []
        for (let i = 0; i < data.length; ++i) {
          const ch = data.charCodeAt(i)
          if (ch < 0x80) {
            newdata.push(ch)
          } else if (ch < 0x800) {
            newdata.push(0xc0 | (ch >> 6), 0x80 | (ch & 0x3f))
          } else if (ch < 0x10000) {
            newdata.push(0xe0 | (ch >> 12), 0x80 | ((ch >> 6) & 0x3f), 0x80 | (ch & 0x3f))
          } else {
            newdata.push(0xf0 | (ch >> 18), 0x80 | ((ch >> 12) & 0x3f), 0x80 | ((ch >> 6) & 0x3f), 0x80 | (ch & 0x3f))
          }
        }
        return newdata
      } else {
        return data
      }
  }
}

const encode = function (ver, mode, data, maxbuflen) {
  const buf = []
  let bits = 0
  let remaining = 8
  const datalen = data.length
  let i
  const pack = function (x, n) {
    if (n >= remaining) {
      buf.push(bits | (x >> (n -= remaining)))
      while (n >= 8) {
        buf.push((x >> (n -= 8)) & 255)
      }
      bits = 0
      remaining = 8
    }
    if (n > 0) {
      bits |= (x & ((1 << n) - 1)) << (remaining -= n)
    }
  }

  const nlenbits = ndatalenbits(ver, mode)
  pack(mode, 4)
  pack(datalen, nlenbits)

  switch (mode) {
    case MODE_NUMERIC:
      for (i = 2; i < datalen; i += 3) {
        pack(parseInt(data.substring(i - 2, i + 1), 10), 10)
      }
      pack(parseInt(data.substring(i - 2), 10), [0, 4, 7][datalen % 3])
      break

    case MODE_ALPHANUMERIC:
      for (i = 1; i < datalen; i += 2) {
        pack(ALPHANUMERIC_MAP[data.charAt(i - 1)] * 45 + ALPHANUMERIC_MAP[data.charAt(i)], 11)
      }
      if (datalen % 2 == 1) {
        pack(ALPHANUMERIC_MAP[data.charAt(i - 1)], 6)
      }
      break

    case MODE_OCTET:
      for (i = 0; i < datalen; ++i) {
        pack(data[i], 8)
      }
      break
  }

  pack(MODE_TERMINATOR, 4)
  if (remaining < 8) {
    buf.push(bits)
  }

  while (buf.length + 1 < maxbuflen) {
    buf.push(0xec, 0x11)
  }
  if (buf.length < maxbuflen) {
    buf.push(0xec)
  }
  return buf
}

const calculateecc = function (poly, genpoly) {
  const modulus = poly.slice(0)
  const polylen = poly.length
  const genpolylen = genpoly.length
  for (let i = 0; i < genpolylen; ++i) {
    modulus.push(0)
  }
  for (let i = 0; i < polylen; ) {
    const quotient = GF256_INVMAP[modulus[i++]]
    if (quotient >= 0) {
      for (let j = 0; j < genpolylen; ++j) {
        modulus[i + j] ^= GF256_MAP[(quotient + genpoly[j]) % 255]
      }
    }
  }
  return modulus.slice(polylen)
}

const augumenteccs = function (poly, nblocks, genpoly) {
  const subsizes = []
  const subsize = (poly.length / nblocks) | 0
  let subsize0 = 0
  const pivot = nblocks - (poly.length % nblocks)
  for (let i = 0; i < pivot; ++i) {
    subsizes.push(subsize0)
    subsize0 += subsize
  }
  for (let i = pivot; i < nblocks; ++i) {
    subsizes.push(subsize0)
    subsize0 += subsize + 1
  }
  subsizes.push(subsize0)

  const eccs = []
  for (let i = 0; i < nblocks; ++i) {
    eccs.push(calculateecc(poly.slice(subsizes[i], subsizes[i + 1]), genpoly))
  }

  const result = []
  const nitemsperblock = (poly.length / nblocks) | 0
  for (let i = 0; i < nitemsperblock; ++i) {
    for (let j = 0; j < nblocks; ++j) {
      result.push(poly[subsizes[j] + i])
    }
  }
  for (let j = pivot; j < nblocks; ++j) {
    result.push(poly[subsizes[j + 1] - 1])
  }
  for (let i = 0; i < genpoly.length; ++i) {
    for (let j = 0; j < nblocks; ++j) {
      result.push(eccs[j][i])
    }
  }
  return result
}

const augumentbch = function (poly, p, genpoly, q) {
  let modulus = poly << q
  for (let i = p - 1; i >= 0; --i) {
    if ((modulus >> (q + i)) & 1) {
      modulus ^= genpoly << i
    }
  }
  return (poly << q) | modulus
}

const makebasematrix = function (ver) {
  const v = VERSIONS[ver]
  const n = getsizebyver(ver)
  const matrix = []
  const reserved = []
  for (let i = 0; i < n; ++i) {
    matrix.push([])
    reserved.push([])
  }

  const blit = function (y, x, h, w, bits) {
    for (let i = 0; i < h; ++i) {
      for (let j = 0; j < w; ++j) {
        matrix[y + i][x + j] = (bits[i] >> j) & 1
        reserved[y + i][x + j] = 1
      }
    }
  }

  // finder patterns and a part of timing patterns
  blit(0, 0, 9, 9, [0x7f, 0x41, 0x5d, 0x5d, 0x5d, 0x41, 0x17f, 0x00, 0x40])
  blit(n - 8, 0, 8, 9, [0x100, 0x7f, 0x41, 0x5d, 0x5d, 0x5d, 0x41, 0x7f])
  blit(0, n - 8, 9, 8, [0xfe, 0x82, 0xba, 0xba, 0xba, 0x82, 0xfe, 0x00, 0x00])

  // the rest of timing patterns
  for (let i = 9; i < n - 8; ++i) {
    matrix[6][i] = matrix[i][6] = ~i & 1
    reserved[6][i] = reserved[i][6] = 1
  }

  // alignment patterns
  const aligns = v[2]
  const m = aligns.length
  for (let i = 0; i < m; ++i) {
    const minj = i == 0 || i == m - 1 ? 1 : 0
    const maxj = i == 0 ? m - 1 : m
    for (let j = minj; j < maxj; ++j) {
      blit(aligns[i], aligns[j], 5, 5, [0x1f, 0x11, 0x15, 0x11, 0x1f])
    }
  }

  // version information
  if (needsverinfo(ver)) {
    const code = augumentbch(ver, 6, 0x1f25, 12)
    let k = 0
    for (let i = 0; i < 6; ++i) {
      for (let j = 0; j < 3; ++j) {
        matrix[i][n - 11 + j] = matrix[n - 11 + j][i] = (code >> k++) & 1
        reserved[i][n - 11 + j] = reserved[n - 11 + j][i] = 1
      }
    }
  }

  return {
    matrix: matrix,
    reserved: reserved
  }
}

const putdata = function (matrix, reserved, buf) {
  const n = matrix.length
  let k = 0
  let dir = -1
  for (let i = n - 1; i >= 0; i -= 2) {
    if (i == 6) {
      --i
    } // skip the entire timing pattern column
    let jj = dir < 0 ? n - 1 : 0
    for (let j = 0; j < n; ++j) {
      for (let ii = i; ii > i - 2; --ii) {
        if (!reserved[jj][ii]) {
          matrix[jj][ii] = (buf[k >> 3] >> (~k & 7)) & 1
          ++k
        }
      }
      jj += dir
    }
    dir = -dir
  }
  return matrix
}

const maskdata = function (matrix, reserved, mask) {
  const maskf = MASKFUNCS[mask]
  const n = matrix.length
  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < n; ++j) {
      if (!reserved[i][j]) {
        matrix[i][j] ^= maskf(i, j)
      }
    }
  }
  return matrix
}

// puts the format information.
const putformatinfo = function (matrix, reserved, ecclevel, mask) {
  const n = matrix.length
  const code = augumentbch((ecclevel << 3) | mask, 5, 0x537, 10) ^ 0x5412
  for (let i = 0; i < 15; ++i) {
    const r = [0, 1, 2, 3, 4, 5, 7, 8, n - 7, n - 6, n - 5, n - 4, n - 3, n - 2, n - 1][i]
    const c = [n - 1, n - 2, n - 3, n - 4, n - 5, n - 6, n - 7, n - 8, 7, 5, 4, 3, 2, 1, 0][i]
    matrix[r][8] = matrix[8][c] = (code >> i) & 1
  }
  return matrix
}

const evaluatematrix = function (matrix) {
  const PENALTY_CONSECUTIVE = 3

  const PENALTY_TWOBYTWO = 3

  const PENALTY_FINDERLIKE = 40

  const PENALTY_DENSITY = 10

  const evaluategroup = function (groups) {
    let score = 0
    for (let i = 0; i < groups.length; ++i) {
      if (groups[i] >= 5) {
        score += PENALTY_CONSECUTIVE + (groups[i] - 5)
      }
    }
    for (let i = 5; i < groups.length; i += 2) {
      const p = groups[i]
      if (groups[i - 1] == p && groups[i - 2] == 3 * p && groups[i - 3] == p && groups[i - 4] == p && (groups[i - 5] >= 4 * p || groups[i + 1] >= 4 * p)) {
        score += PENALTY_FINDERLIKE
      }
    }
    return score
  }

  const n = matrix.length
  let score = 0
  let nblacks = 0
  for (let i = 0; i < n; ++i) {
    const row = matrix[i]
    let groups

    groups = [0]
    for (let j = 0; j < n; ) {
      let k
      for (k = 0; j < n && row[j]; ++k) {
        ++j
      }
      groups.push(k)
      for (k = 0; j < n && !row[j]; ++k) {
        ++j
      }
      groups.push(k)
    }
    score += evaluategroup(groups)

    groups = [0]
    for (let j = 0; j < n; ) {
      let k
      for (k = 0; j < n && matrix[j][i]; ++k) {
        ++j
      }
      groups.push(k)
      for (k = 0; j < n && !matrix[j][i]; ++k) {
        ++j
      }
      groups.push(k)
    }
    score += evaluategroup(groups)

    const nextrow = matrix[i + 1] || []
    nblacks += row[0]
    for (let j = 1; j < n; ++j) {
      const p = row[j]
      nblacks += p
      if (row[j - 1] == p && nextrow[j] === p && nextrow[j - 1] === p) {
        score += PENALTY_TWOBYTWO
      }
    }
  }

  score += PENALTY_DENSITY * ((Math.abs(nblacks / n / n - 0.5) / 0.05) | 0)
  return score
}

const generate = function (data, ver, mode, ecclevel, mask) {
  const v = VERSIONS[ver]
  let buf = encode(ver, mode, data, ndatabits(ver, ecclevel) >> 3)
  buf = augumenteccs(buf, v[1][ecclevel], GF256_GENPOLY[v[0][ecclevel]])

  const result = makebasematrix(ver)
  const matrix = result.matrix
  const reserved = result.reserved
  putdata(matrix, reserved, buf)

  if (mask < 0) {
    maskdata(matrix, reserved, 0)
    putformatinfo(matrix, reserved, ecclevel, 0)
    let bestmask = 0
    let bestscore = evaluatematrix(matrix)
    maskdata(matrix, reserved, 0)
    for (mask = 1; mask < 8; ++mask) {
      maskdata(matrix, reserved, mask)
      putformatinfo(matrix, reserved, ecclevel, mask)
      const score = evaluatematrix(matrix)
      if (bestscore > score) {
        bestscore = score
        bestmask = mask
      }
      maskdata(matrix, reserved, mask)
    }
    mask = bestmask
  }

  maskdata(matrix, reserved, mask)
  putformatinfo(matrix, reserved, ecclevel, mask)
  return matrix
}

const QRCode = {
  // we can input some value about the QR code,such as size,ecc level,padding,mode,version,mask and so on,so we can generate different QR code;
  generate: function (data, options) {
    const MODES = {
      numeric: MODE_NUMERIC,
      alphanumeric: MODE_ALPHANUMERIC,
      octet: MODE_OCTET
    }
    const ECCLEVELS = {
      L: ECCLEVEL_L,
      M: ECCLEVEL_M,
      Q: ECCLEVEL_Q,
      H: ECCLEVEL_H
    }

    options = options || {}
    let ver = options.version || -1
    const ecclevel = ECCLEVELS[(options.ecclevel || 'L').toUpperCase()]
    let mode = options.mode ? MODES[options.mode.toLowerCase()] : -1
    const mask = 'mask' in options ? options.mask : -1

    if (mode < 0) {
      if (typeof data === 'string') {
        if (data.match(NUMERIC_REGEXP)) {
          mode = MODE_NUMERIC
        } else if (data.match(ALPHANUMERIC_OUT_REGEXP)) {
          mode = MODE_ALPHANUMERIC
        } else {
          mode = MODE_OCTET
        }
      } else {
        mode = MODE_OCTET
      }
    } else if (!(mode == MODE_NUMERIC || mode == MODE_ALPHANUMERIC || mode == MODE_OCTET)) {
      throw '暂时不支持你所输入的内容格式'
    }

    data = validatedata(mode, data)
    if (data === null) {
      throw '请输入内容'
    }

    if (ecclevel < 0 || ecclevel > 3) {
      throw 'ecc错误纠正级别有误'
    }

    if (ver < 0) {
      for (ver = 1; ver <= 40; ++ver) {
        if (data.length <= getmaxdatalen(ver, mode, ecclevel)) {
          break
        }
      }
      if (ver > 40) {
        throw '数据太大'
      }
    } else if (ver < 1 || ver > 40) {
      throw 'invalid version'
    }

    if (mask != -1 && (mask < 0 || mask > 8)) {
      throw 'invalid mask'
    }

    return generate(data, ver, mode, ecclevel, mask)
  },
  // if there is not support canvas, use table to replace canvas
  generateHTML: function (data, options) {
    options = options || {}
    const matrix = QRCode.generate(data, options)
    const modsize = Math.max(options.modulesize || 5, 0.5)
    const margin = Math.max(options.margin || 4, 0.0)

    // let e = document.createElement('div')
    const n = matrix.length
    const html = ['<table border="0" cellspacing="0" cellpadding="0" style="border:' + modsize * margin + 'px solid #fff;background:#fff">']
    for (let i = 0; i < n; ++i) {
      html.push('<tr>')
      for (let j = 0; j < n; ++j) {
        html.push('<td style="width:' + modsize + 'px;height:' + modsize + 'px' + (matrix[i][j] ? ';background:#000' : '') + '"></td>')
      }
      html.push('</tr>')
    }
    // e.className = 'qrcode'
    // e.innerHTML = '<div>'+html.join('') + '</table><div>'
    return '<div>' + html.join('') + '</table><div>'
  }
}
module.exports = QRCode
