/* istanbul ignore file */

/**
 * @namespace Geo
 */

const BASE32_CODES = '0123456789bcdefghjkmnpqrstuvwxyz'
const BASE32_CODES_DICT = {}
for (let i = 0; i < BASE32_CODES.length; i++) {
  BASE32_CODES_DICT[BASE32_CODES.charAt(i)] = i
}

const ENCODE_AUTO = 'auto'

const MIN_LAT = -90
const MAX_LAT = 90
const MIN_LON = -180
const MAX_LON = 180

//                        0  1  2  3  4   5   6   7   8   9  10
const SIGFIG_HASH_LENGTH = [0, 5, 7, 8, 11, 12, 13, 15, 16, 17, 18]

/**
 * Encode
 *
 * @param {Number|String} latitude
 * @param {Number|String} longitude
 * @param {Number} numberOfChars
 * @returns {String}
 */

const encode = function (latitude, longitude, numberOfChars) {
  if (numberOfChars === ENCODE_AUTO) {
    if (typeof latitude === 'number' || typeof longitude === 'number') {
      throw new Error('自动精度需要字符串')
    }
    const decSigFigsLat = latitude.split('.')[1].length
    const decSigFigsLong = longitude.split('.')[1].length
    const numberOfSigFigs = Math.max(decSigFigsLat, decSigFigsLong)
    numberOfChars = SIGFIG_HASH_LENGTH[numberOfSigFigs]
  } else if (numberOfChars === undefined) {
    numberOfChars = 9
  }

  const chars = []
  let bits = 0
  let bitsTotal = 0
  let hashValue = 0
  let maxLat = MAX_LAT
  let minLat = MIN_LAT
  let maxLon = MAX_LON
  let minLon = MIN_LON
  let mid
  while (chars.length < numberOfChars) {
    if (bitsTotal % 2 === 0) {
      mid = (maxLon + minLon) / 2
      if (longitude > mid) {
        hashValue = (hashValue << 1) + 1
        minLon = mid
      } else {
        hashValue = (hashValue << 1) + 0
        maxLon = mid
      }
    } else {
      mid = (maxLat + minLat) / 2
      if (latitude > mid) {
        hashValue = (hashValue << 1) + 1
        minLat = mid
      } else {
        hashValue = (hashValue << 1) + 0
        maxLat = mid
      }
    }

    bits++
    bitsTotal++
    if (bits === 5) {
      const code = BASE32_CODES[hashValue]
      chars.push(code)
      bits = 0
      hashValue = 0
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

const encode_int = function (latitude, longitude, bitDepth) {
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
 * @param {String} hashString
 * @returns {Array}
 */

const decode_bbox = function (hashString) {
  let isLon = true
  let maxLat = MAX_LAT
  let minLat = MIN_LAT
  let maxLon = MAX_LON
  let minLon = MIN_LON
  let mid

  let hashValue = 0
  for (let i = 0, l = hashString.length; i < l; i++) {
    const code = hashString[i].toLowerCase()
    hashValue = BASE32_CODES_DICT[code]

    for (let bits = 4; bits >= 0; bits--) {
      const bit = (hashValue >> bits) & 1
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

const decode_bbox_int = function (hashInt, bitDepth) {
  bitDepth = bitDepth || 52

  let maxLat = MAX_LAT
  let minLat = MIN_LAT
  let maxLon = MAX_LON
  let minLon = MIN_LON

  let latBit = 0
  let lonBit = 0
  const step = bitDepth / 2

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

const decode = function (hashString) {
  const bbox = decode_bbox(hashString)
  const lat = (bbox[0] + bbox[2]) / 2
  const lon = (bbox[1] + bbox[3]) / 2
  const latErr = bbox[2] - lat
  const lonErr = bbox[3] - lon
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

const decode_int = function (hash_int, bitDepth) {
  const bbox = decode_bbox_int(hash_int, bitDepth)
  const lat = (bbox[0] + bbox[2]) / 2
  const lon = (bbox[1] + bbox[3]) / 2
  const latErr = bbox[2] - lat
  const lonErr = bbox[3] - lon
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

const neighbor = function (hashString, direction) {
  const lonLat = decode(hashString)
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
 * @param {String} hashString
 * @returns {Array}
 */

const neighbor_int = function (hash_int, direction, bitDepth) {
  bitDepth = bitDepth || 52
  const lonlat = decode_int(hash_int, bitDepth)
  let neighbor_lat = lonlat.latitude + direction[0] * lonlat.error.latitude * 2
  let neighbor_lon = lonlat.longitude + direction[1] * lonlat.error.longitude * 2
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
 * @param {String} hashString
 * @returns {Array}
 */

const neighbors = function (hashString) {
  const hashstringLength = hashString.length

  const lonlat = decode(hashString)
  const lat = lonlat.latitude
  const lon = lonlat.longitude
  const latErr = lonlat.error.latitude * 2
  const lonErr = lonlat.error.longitude * 2

  let neighbor_lat, neighbor_lon

  const neighborHashList = [
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

const neighbors_int = function (hash_int, bitDepth) {
  bitDepth = bitDepth || 52

  const lonlat = decode_int(hash_int, bitDepth)
  const lat = lonlat.latitude
  const lon = lonlat.longitude
  const latErr = lonlat.error.latitude * 2
  const lonErr = lonlat.error.longitude * 2

  let neighbor_lat, neighbor_lon

  const neighborHashIntList = [
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

const bboxes = function (minLat, minLon, maxLat, maxLon, numberOfChars) {
  if (numberOfChars <= 0) {
    throw new Error('要正数形式')
  }
  numberOfChars = numberOfChars || 9

  const hashSouthWest = encode(minLat, minLon, numberOfChars)
  const hashNorthEast = encode(maxLat, maxLon, numberOfChars)

  const latLon = decode(hashSouthWest)

  const perLat = latLon.error.latitude * 2
  const perLon = latLon.error.longitude * 2

  const boxSouthWest = decode_bbox(hashSouthWest)
  const boxNorthEast = decode_bbox(hashNorthEast)

  const latStep = Math.round((boxNorthEast[0] - boxSouthWest[0]) / perLat)
  const lonStep = Math.round((boxNorthEast[1] - boxSouthWest[1]) / perLon)

  const hashList = []

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

const bboxes_int = function (minLat, minLon, maxLat, maxLon, bitDepth) {
  bitDepth = bitDepth || 52

  const hashSouthWest = encode_int(minLat, minLon, bitDepth)
  const hashNorthEast = encode_int(maxLat, maxLon, bitDepth)

  const latlon = decode_int(hashSouthWest, bitDepth)

  const perLat = latlon.error.latitude * 2
  const perLon = latlon.error.longitude * 2

  const boxSouthWest = decode_bbox_int(hashSouthWest, bitDepth)
  const boxNorthEast = decode_bbox_int(hashNorthEast, bitDepth)

  const latStep = Math.round((boxNorthEast[0] - boxSouthWest[0]) / perLat)
  const lonStep = Math.round((boxNorthEast[1] - boxSouthWest[1]) / perLon)

  const hashList = []

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
  const xPI = (Math.PI * 3000.0) / 180.0
  const x = lng - 0.0065
  const y = lat - 0.006
  const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * xPI)
  const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * xPI)
  const gd_lng = z * Math.cos(theta)
  const gd_lat = z * Math.sin(theta)
  return { lat: gd_lat, lng: gd_lng }
}

/** 高德坐标转百度（传入纬度,经度）
 * @memberof Geo#
 * @param {Number} lat
 * @param {Number} lng
 */

function gd2bd (lat, lng) {
  const X_PI = (Math.PI * 3000.0) / 180.0
  const x = lng
  const y = lat
  const z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI)
  const theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI)
  const bd_lng = z * Math.cos(theta) + 0.0065
  const bd_lat = z * Math.sin(theta) + 0.006
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
  if (lng == null || lng == '' || lat == null || lat == '') {
    return { lat, lng }
  }

  const x_pi = Math.PI
  const x = parseFloat(lng) - 0.0065
  const y = parseFloat(lat) - 0.006
  const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi)
  const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi)
  lng = (z * Math.cos(theta)).toFixed(7)
  lat = (z * Math.sin(theta)).toFixed(7)

  return { lat, lng }
}

/** 腾讯坐标转百度（传入纬度,经度）
 * @memberof Geo#
 * @param {Number} lat
 * @param {Number} lng
 */

function tx2bd (lat, lng) {
  if (lng == null || lng == '' || lat == null || lat == '') {
    return { lat, lng }
  }

  const x_pi = Math.PI
  const x = parseFloat(lng)
  const y = parseFloat(lat)
  const z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi)
  const theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi)
  lng = (z * Math.cos(theta) + 0.0065).toFixed(6)
  lat = (z * Math.sin(theta) + 0.006).toFixed(6)
  return { lat, lng }
}

/**
 * WGS84|CGCS2000 转 GCj02/谷歌、高德
 * @param lat
 * @param lng
 * @returns {{ lat: Number, lng: Number }}
 */
function wgs842gd (lat, lng) {
  const a = 6378245.0
  const ee = 0.00669342162296594323
  if (outsideChina(lat, lng)) {
    return { lat, lng }
  } else {
    let dlat = transformlat(lat - 35.0, lng - 105.0)
    let dlng = transformlng(lat - 35.0, lng - 105.0)
    const radlat = (lat / 180.0) * Math.PI
    let magic = Math.sin(radlat)
    magic = 1 - ee * magic * magic
    const sqrtmagic = Math.sqrt(magic)
    dlat = (dlat * 180.0) / (((a * (1 - ee)) / (magic * sqrtmagic)) * Math.PI)
    dlng = (dlng * 180.0) / ((a / sqrtmagic) * Math.cos(radlat) * Math.PI)
    const mglat = lat + dlat
    const mglng = lng + dlng
    return { lat: mglat, lng: mglng }
  }
}

/**
 * GCJ02/谷歌、高德 转换为 WGS84|CGCS2000
 * @param lat
 * @param lng
 * @returns {{lat:Number,lng:Number}}
 */
function gd2wgs84 (lat, lng) {
  const a = 6378245.0
  const ee = 0.00669342162296594323
  if (outsideChina(lat, lng)) {
    return { lat, lng }
  } else {
    let dlat = transformlat(lat - 35.0, lng - 105.0)
    let dlng = transformlng(lat - 35.0, lng - 105.0)
    const radlat = (lat / 180.0) * Math.PI
    let magic = Math.sin(radlat)
    magic = 1 - ee * magic * magic
    const sqrtmagic = Math.sqrt(magic)
    dlat = (dlat * 180.0) / (((a * (1 - ee)) / (magic * sqrtmagic)) * Math.PI)
    dlng = (dlng * 180.0) / ((a / sqrtmagic) * Math.cos(radlat) * Math.PI)
    const mglat = lat + dlat
    const mglng = lng + dlng
    return { lat: lat * 2 - mglat, lng: lng * 2 - mglng }
  }
}

function transformlat (lat, lng) {
  let ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng))
  ret += ((20.0 * Math.sin(6.0 * lng * Math.PI) + 20.0 * Math.sin(2.0 * lng * Math.PI)) * 2.0) / 3.0
  ret += ((20.0 * Math.sin(lat * Math.PI) + 40.0 * Math.sin((lat / 3.0) * Math.PI)) * 2.0) / 3.0
  ret += ((160.0 * Math.sin((lat / 12.0) * Math.PI) + 320 * Math.sin((lat * Math.PI) / 30.0)) * 2.0) / 3.0
  return ret
}

function transformlng (lat, lng) {
  let ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng))
  ret += ((20.0 * Math.sin(6.0 * lng * Math.PI) + 20.0 * Math.sin(2.0 * lng * Math.PI)) * 2.0) / 3.0
  ret += ((20.0 * Math.sin(lng * Math.PI) + 40.0 * Math.sin((lng / 3.0) * Math.PI)) * 2.0) / 3.0
  ret += ((150.0 * Math.sin((lng / 12.0) * Math.PI) + 300.0 * Math.sin((lng / 30.0) * Math.PI)) * 2.0) / 3.0
  return ret
}
/**
 * 判断是否在国内，不在国内则不做偏移
 * @param lng
 * @param lat
 * @returns {boolean}
 */
const outsideChina = function (lat, lng) {
  return lng < 72.004 || lng > 137.8347 || lat < 0.8293 || lat > 55.8271 || false
}

/** 两点之间距离
 * @memberof Geo#
 * @param {Number} lat1
 * @param {Number} lng1
 * @param {Number} lat2
 * @param {Number} lng2
 */
function getDistance (lat1, lng1, lat2, lng2) {
  const radLat1 = (lat1 * Math.PI) / 180.0
  const radLat2 = (lat2 * Math.PI) / 180.0
  const a = radLat1 - radLat2
  const b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0
  let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
  s = s * 6378.137 // 地球半径;
  s = Math.round(s * 10000) / 10000
  return s
}
const geo = {
  bd2tx,
  tx2bd,
  bd2gd,
  gd2bd,
  getDistance,
  wgs842gd,
  gd2wgs84,
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
