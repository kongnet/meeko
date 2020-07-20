/**
 * @namespace Geo
 */
let BASE32_CODES = '0123456789bcdefghjkmnpqrstuvwxyz'
let BASE32_CODES_DICT = {}
for (let i = 0; i < BASE32_CODES.length; i++) {
  BASE32_CODES_DICT[BASE32_CODES.charAt(i)] = i
}

let ENCODE_AUTO = 'auto'

let MIN_LAT = -90
let MAX_LAT = 90
let MIN_LON = -180
let MAX_LON = 180

//                        0  1  2  3  4   5   6   7   8   9  10
let SIGFIG_HASH_LENGTH = [0, 5, 7, 8, 11, 12, 13, 15, 16, 17, 18]

/**
 * Encode
 *
 * @param {Number|String} latitude
 * @param {Number|String} longitude
 * @param {Number} numberOfChars
 * @returns {String}
 */

let encode = function (latitude, longitude, numberOfChars) {
  if (numberOfChars === ENCODE_AUTO) {
    if (typeof latitude === 'number' || typeof longitude === 'number') {
      throw new Error('自动精度需要字符串')
    }
    let decSigFigsLat = latitude.split('.')[1].length
    let decSigFigsLong = longitude.split('.')[1].length
    let numberOfSigFigs = Math.max(decSigFigsLat, decSigFigsLong)
    numberOfChars = SIGFIG_HASH_LENGTH[numberOfSigFigs]
  } else if (numberOfChars === undefined) {
    numberOfChars = 9
  }

  let chars = []
  let bits = 0
  let bitsTotal = 0
  let hash_value = 0
  let maxLat = MAX_LAT
  let minLat = MIN_LAT
  let maxLon = MAX_LON
  let minLon = MIN_LON
  let mid
  while (chars.length < numberOfChars) {
    if (bitsTotal % 2 === 0) {
      mid = (maxLon + minLon) / 2
      if (longitude > mid) {
        hash_value = (hash_value << 1) + 1
        minLon = mid
      } else {
        hash_value = (hash_value << 1) + 0
        maxLon = mid
      }
    } else {
      mid = (maxLat + minLat) / 2
      if (latitude > mid) {
        hash_value = (hash_value << 1) + 1
        minLat = mid
      } else {
        hash_value = (hash_value << 1) + 0
        maxLat = mid
      }
    }

    bits++
    bitsTotal++
    if (bits === 5) {
      let code = BASE32_CODES[hash_value]
      chars.push(code)
      bits = 0
      hash_value = 0
    }
  }
  return chars.join('')
}

/**
 * Encode Integer
 *
 * @param {Number} latitude
 * @param {Number} longitude
 * @param {Number} bitDepth
 * @returns {Number}
 */

let encode_int = function (latitude, longitude, bitDepth) {
  bitDepth = bitDepth || 52

  let bitsTotal = 0
  let maxLat = MAX_LAT
  let minLat = MIN_LAT
  let maxLon = MAX_LON
  let minLon = MIN_LON
  let mid
  let combinedBits = 0

  while (bitsTotal < bitDepth) {
    combinedBits *= 2
    if (bitsTotal % 2 === 0) {
      mid = (maxLon + minLon) / 2
      if (longitude > mid) {
        combinedBits += 1
        minLon = mid
      } else {
        maxLon = mid
      }
    } else {
      mid = (maxLat + minLat) / 2
      if (latitude > mid) {
        combinedBits += 1
        minLat = mid
      } else {
        maxLat = mid
      }
    }
    bitsTotal++
  }
  return combinedBits
}

/**
 * Decode Bounding Box
 *
 * @param {String} hash_string
 * @returns {Array}
 */

let decode_bbox = function (hash_string) {
  let isLon = true
  let maxLat = MAX_LAT
  let minLat = MIN_LAT
  let maxLon = MAX_LON
  let minLon = MIN_LON
  let mid

  let hashValue = 0
  for (let i = 0, l = hash_string.length; i < l; i++) {
    let code = hash_string[i].toLowerCase()
    hashValue = BASE32_CODES_DICT[code]

    for (let bits = 4; bits >= 0; bits--) {
      let bit = (hashValue >> bits) & 1
      if (isLon) {
        mid = (maxLon + minLon) / 2
        if (bit === 1) {
          minLon = mid
        } else {
          maxLon = mid
        }
      } else {
        mid = (maxLat + minLat) / 2
        if (bit === 1) {
          minLat = mid
        } else {
          maxLat = mid
        }
      }
      isLon = !isLon
    }
  }
  return [minLat, minLon, maxLat, maxLon]
}

/**
 * Decode Bounding Box Integer
 *
 * @param {Number} hashInt
 * @param {Number} bitDepth
 * @returns {Array}
 */

let decode_bbox_int = function (hashInt, bitDepth) {
  bitDepth = bitDepth || 52

  let maxLat = MAX_LAT
  let minLat = MIN_LAT
  let maxLon = MAX_LON
  let minLon = MIN_LON

  let latBit = 0
  let lonBit = 0
  let step = bitDepth / 2

  for (let i = 0; i < step; i++) {
    lonBit = get_bit(hashInt, (step - i) * 2 - 1)
    latBit = get_bit(hashInt, (step - i) * 2 - 2)

    if (latBit === 0) {
      maxLat = (maxLat + minLat) / 2
    } else {
      minLat = (maxLat + minLat) / 2
    }

    if (lonBit === 0) {
      maxLon = (maxLon + minLon) / 2
    } else {
      minLon = (maxLon + minLon) / 2
    }
  }
  return [minLat, minLon, maxLat, maxLon]
}

function get_bit (bits, position) {
  return (bits / Math.pow(2, position)) & 0x01
}

/**
 * Decode
 *
 * @param {String} hashString
 * @returns {Object}
 */

let decode = function (hashString) {
  let bbox = decode_bbox(hashString)
  let lat = (bbox[0] + bbox[2]) / 2
  let lon = (bbox[1] + bbox[3]) / 2
  let latErr = bbox[2] - lat
  let lonErr = bbox[3] - lon
  return {
    latitude: lat,
    longitude: lon,
    error: { latitude: latErr, longitude: lonErr }
  }
}

/**
 * Decode Integer
 *
 * @param {Number} hash_int
 * @param {Number} bitDepth
 * @returns {Object}
 */

let decode_int = function (hash_int, bitDepth) {
  let bbox = decode_bbox_int(hash_int, bitDepth)
  let lat = (bbox[0] + bbox[2]) / 2
  let lon = (bbox[1] + bbox[3]) / 2
  let latErr = bbox[2] - lat
  let lonErr = bbox[3] - lon
  return {
    latitude: lat,
    longitude: lon,
    error: { latitude: latErr, longitude: lonErr }
  }
}

/**
 * Neighbor
 *
 * [1,0] 北, [-1,-1] 西南.
 * 方向 [lat, lon]
 * [1,0] - 北
 * [1,1] - 东北
 * ...
 * @param {String} hashString
 * @param {Array} Direction
 * @returns {String}
 */

let neighbor = function (hashString, direction) {
  let lonLat = decode(hashString)
  let neighborLat = lonLat.latitude + direction[0] * lonLat.error.latitude * 2
  let neighborLon = lonLat.longitude + direction[1] * lonLat.error.longitude * 2
  neighborLon = ensure_valid_lon(neighborLon)
  neighborLat = ensure_valid_lat(neighborLat)
  return encode(neighborLat, neighborLon, hashString.length)
}

/**
 * Neighbor Integer
 *
 * ...
 * @param {String} hash_string
 * @returns {Array}
 */

let neighbor_int = function (hash_int, direction, bitDepth) {
  bitDepth = bitDepth || 52
  let lonlat = decode_int(hash_int, bitDepth)
  let neighbor_lat = lonlat.latitude + direction[0] * lonlat.error.latitude * 2
  let neighbor_lon =
    lonlat.longitude + direction[1] * lonlat.error.longitude * 2
  neighbor_lon = ensure_valid_lon(neighbor_lon)
  neighbor_lat = ensure_valid_lat(neighbor_lat)
  return encode_int(neighbor_lat, neighbor_lon, bitDepth)
}

/**
 * Neighbors
 *
 * 7 0 1
 * 6 x 2
 * 5 4 3
 * @param {String} hash_string
 * @returns {Array}
 */

let neighbors = function (hash_string) {
  let hashstringLength = hash_string.length

  let lonlat = decode(hash_string)
  let lat = lonlat.latitude
  let lon = lonlat.longitude
  let latErr = lonlat.error.latitude * 2
  let lonErr = lonlat.error.longitude * 2

  let neighbor_lat, neighbor_lon

  let neighborHashList = [
    encodeNeighbor(1, 0),
    encodeNeighbor(1, 1),
    encodeNeighbor(0, 1),
    encodeNeighbor(-1, 1),
    encodeNeighbor(-1, 0),
    encodeNeighbor(-1, -1),
    encodeNeighbor(0, -1),
    encodeNeighbor(1, -1)
  ]

  function encodeNeighbor (neighborLatDir, neighborLonDir) {
    neighbor_lat = lat + neighborLatDir * latErr
    neighbor_lon = lon + neighborLonDir * lonErr
    neighbor_lon = ensure_valid_lon(neighbor_lon)
    neighbor_lat = ensure_valid_lat(neighbor_lat)
    return encode(neighbor_lat, neighbor_lon, hashstringLength)
  }

  return neighborHashList
}

/**
 * Neighbors Integer
 *
 * 7 0 1
 * 6 x 2
 * 5 4 3
 * @param {Number} hash_int
 * @param {Number} bitDepth
 * @returns {Array}
 */

let neighbors_int = function (hash_int, bitDepth) {
  bitDepth = bitDepth || 52

  let lonlat = decode_int(hash_int, bitDepth)
  let lat = lonlat.latitude
  let lon = lonlat.longitude
  let latErr = lonlat.error.latitude * 2
  let lonErr = lonlat.error.longitude * 2

  let neighbor_lat, neighbor_lon

  let neighborHashIntList = [
    encodeNeighbor_int(1, 0),
    encodeNeighbor_int(1, 1),
    encodeNeighbor_int(0, 1),
    encodeNeighbor_int(-1, 1),
    encodeNeighbor_int(-1, 0),
    encodeNeighbor_int(-1, -1),
    encodeNeighbor_int(0, -1),
    encodeNeighbor_int(1, -1)
  ]

  function encodeNeighbor_int (neighborLatDir, neighborLonDir) {
    neighbor_lat = lat + neighborLatDir * latErr
    neighbor_lon = lon + neighborLonDir * lonErr
    neighbor_lon = ensure_valid_lon(neighbor_lon)
    neighbor_lat = ensure_valid_lat(neighbor_lat)
    return encode_int(neighbor_lat, neighbor_lon, bitDepth)
  }

  return neighborHashIntList
}

/**
 * Bounding Boxes
 *
 * @param {Number} minLat
 * @param {Number} minLon
 * @param {Number} maxLat
 * @param {Number} maxLon
 * @param {Number} numberOfChars
 * @returns {bboxes.hashList|Array}
 */

let bboxes = function (minLat, minLon, maxLat, maxLon, numberOfChars) {
  if (numberOfChars <= 0) {
    throw new Error('要正数形式')
  }
  numberOfChars = numberOfChars || 9

  let hashSouthWest = encode(minLat, minLon, numberOfChars)
  let hashNorthEast = encode(maxLat, maxLon, numberOfChars)

  let latLon = decode(hashSouthWest)

  let perLat = latLon.error.latitude * 2
  let perLon = latLon.error.longitude * 2

  let boxSouthWest = decode_bbox(hashSouthWest)
  let boxNorthEast = decode_bbox(hashNorthEast)

  let latStep = Math.round((boxNorthEast[0] - boxSouthWest[0]) / perLat)
  let lonStep = Math.round((boxNorthEast[1] - boxSouthWest[1]) / perLon)

  let hashList = []

  for (let lat = 0; lat <= latStep; lat++) {
    for (let lon = 0; lon <= lonStep; lon++) {
      hashList.push(neighbor(hashSouthWest, [lat, lon]))
    }
  }

  return hashList
}

/**
 * Bounding Boxes Integer
 *
 * @param {Number} minLat
 * @param {Number} minLon
 * @param {Number} maxLat
 * @param {Number} maxLon
 * @param {Number} bitDepth
 * @returns {bboxes_int.hashList|Array}
 */

let bboxes_int = function (minLat, minLon, maxLat, maxLon, bitDepth) {
  bitDepth = bitDepth || 52

  let hashSouthWest = encode_int(minLat, minLon, bitDepth)
  let hashNorthEast = encode_int(maxLat, maxLon, bitDepth)

  let latlon = decode_int(hashSouthWest, bitDepth)

  let perLat = latlon.error.latitude * 2
  let perLon = latlon.error.longitude * 2

  let boxSouthWest = decode_bbox_int(hashSouthWest, bitDepth)
  let boxNorthEast = decode_bbox_int(hashNorthEast, bitDepth)

  let latStep = Math.round((boxNorthEast[0] - boxSouthWest[0]) / perLat)
  let lonStep = Math.round((boxNorthEast[1] - boxSouthWest[1]) / perLon)

  let hashList = []

  for (let lat = 0; lat <= latStep; lat++) {
    for (let lon = 0; lon <= lonStep; lon++) {
      hashList.push(neighbor_int(hashSouthWest, [lat, lon], bitDepth))
    }
  }

  return hashList
}

function ensure_valid_lon (lon) {
  if (lon > MAX_LON) {
    return MIN_LON + (lon % MAX_LON)
  }
  if (lon < MIN_LON) {
    return MAX_LON + (lon % MAX_LON)
  }
  return lon
}

function ensure_valid_lat (lat) {
  if (lat > MAX_LAT) {
    return MAX_LAT
  }
  if (lat < MIN_LAT) {
    return MIN_LAT
  }
  return lat
}

/** 百度坐标转高德（传入纬度,经度）
 * @memberof Geo#
 * @param {Number} lat
 * @param {Number} lng
 */

function bd2gd (lat, lng) {
  let xPI = (Math.PI * 3000.0) / 180.0
  let x = lng - 0.0065
  let y = lat - 0.006
  let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * xPI)
  let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * xPI)
  let gd_lng = z * Math.cos(theta)
  let gd_lat = z * Math.sin(theta)
  return { lat: gd_lat, lng: gd_lng }
}
/** 高德坐标转百度（传入纬度,经度）
 * @memberof Geo#
 * @param {Number} lat
 * @param {Number} lng
 */
function gd2bd (lat, lng) {
  let X_PI = (Math.PI * 3000.0) / 180.0
  let x = lng
  let y = lat
  let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI)
  let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI)
  let bd_lng = z * Math.cos(theta) + 0.0065
  let bd_lat = z * Math.sin(theta) + 0.006
  return {
    lat: bd_lat,
    lng: bd_lng
  }
}
/** 百度坐标转腾讯（传入纬度,经度）
 * @memberof Geo#
 * @param {Number} lat
 * @param {Number} lng
 */
function bd2tx (lat, lng) {
  if (lng == null || lng == '' || lat == null || lat == '') return { lat, lng }

  var x_pi = Math.PI
  var x = parseFloat(lng) - 0.0065
  var y = parseFloat(lat) - 0.006
  var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi)
  var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi)
  var lng = (z * Math.cos(theta)).toFixed(7)
  var lat = (z * Math.sin(theta)).toFixed(7)

  return { lat, lng }
}
/** 腾讯坐标转百度（传入纬度,经度）
 * @memberof Geo#
 * @param {Number} lat
 * @param {Number} lng
 */
function tx2bd (lat, lng) {
  if (lng == null || lng == '' || lat == null || lat == '') return { lat, lng }

  var x_pi = Math.PI
  var x = parseFloat(lng)
  var y = parseFloat(lat)
  var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi)
  var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi)
  var lng = (z * Math.cos(theta) + 0.0065).toFixed(6)
  var lat = (z * Math.sin(theta) + 0.006).toFixed(6)
  return { lat, lng }
}
/** 两点之间距离
 * @memberof Geo#
 * @param {Number} lat1
 * @param {Number} lng1
 * @param {Number} lat2
 * @param {Number} lng2
 */

function getDistance (lat1, lng1, lat2, lng2) {
  let radLat1 = (lat1 * Math.PI) / 180.0
  let radLat2 = (lat2 * Math.PI) / 180.0
  let a = radLat1 - radLat2
  let b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0
  let s =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(a / 2), 2) +
          Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)
      )
    )
  s = s * 6378.137 // 地球半径;
  s = Math.round(s * 10000) / 10000
  return s
}
let geo = {
  bd2tx,
  tx2bd,
  bd2gd,
  gd2bd,
  getDistance,
  ENCODE_AUTO: ENCODE_AUTO,
  encode: encode,
  encode_uint64: encode_int,
  encode_int: encode_int,
  decode: decode,
  decode_int: decode_int,
  decode_uint64: decode_int,
  decode_bbox: decode_bbox,
  decode_bbox_uint64: decode_bbox_int,
  decode_bbox_int: decode_bbox_int,
  neighbor: neighbor,
  neighbor_int: neighbor_int,
  neighbors: neighbors,
  neighbors_int: neighbors_int,
  bboxes: bboxes,
  bboxes_int: bboxes_int
}

module.exports = geo
