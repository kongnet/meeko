/* istanbul ignore file */
'use strict'
// @ts-check
/**
 * @namespace file
 */

const fs = require('fs')
const crypto = require('crypto')
const BUFFER_SIZE = 8192

function obj2Arr (o, isOrder = 0) {
  let keyList = Object.keys(o[0])
  keyList = isOrder ? keyList.sort() : keyList
  let a = [keyList]
  o.map((x, idx) => {
    a[idx + 1] = []
    keyList.map((it, idxIt) => {
      a[idx + 1][idxIt] = x[it]
    })
  })
  return a
}
function array2Csv (a) {
  let s = ''
  let len = a[0].length
  a.map(x => {
    x[len - 1] += '\n'
    s += x.join(',')
  })
  return s
}
const obj2Csv = (o, fileName, isOrder = 0) => {
  fs.writeFileSync(fileName, array2Csv(obj2Arr(o, isOrder)))
}
const arr2Csv = (a, fileName) => {
  fs.writeFileSync(fileName, array2Csv(a))
}
function getFileType (filePath) {
  const buffer = Buffer.alloc(8)
  const fd = fs.openSync(filePath, 'r')
  fs.readSync(fd, buffer, 0, 8, 0)
  const newBuf = buffer.slice(0, 4)
  fs.closeSync(fd)
  const typeCode = newBuf.toString('hex')
  let filetype = 'unknown'
  let mimetype = 'unknown'
  // console.log(typeCode)
  switch (typeCode.substring(0, 4)) {
    case '424d':
      filetype = 'bmp'
      mimetype = 'image/bmp'
      break
    case '504b':
      filetype = 'zip'
      mimetype = ['application/x-zip', 'application/zip', 'application/x-zip-compressed']
      break
  }
  switch (typeCode.substring(0, 6)) {
    case '474946':
      filetype = 'gif'
      mimetype = 'image/gif'
      break
  }
  switch (typeCode) {
    case 'ffd8ffe1': // 带有exif
      filetype = 'jpg'
      mimetype = ['image/jpeg', 'image/pjpeg']
      break
    case 'ffd8ffe0': // 老式相机采用JFIF格式
      filetype = 'jpg'
      mimetype = ['image/jpeg', 'image/pjpeg']
      break
    case '89504e47':
      filetype = 'png'
      mimetype = ['image/png', 'image/x-png']
      break
    case '25504446':
      filetype = 'pdf'
      mimetype = 'application/pdf'
      break
    case '49492a00':
      filetype = 'tif'
      mimetype = 'image/tiff'
      break
    case '4d4d002a':
      filetype = 'tif'
      mimetype = 'image/tiff'
      break
    case '38425053':
      filetype = 'psd'
      mimetype = 'image/vnd.adobe.photoshop'
      break
    default:
      break
  }
  return {
    fileType: filetype,
    mimeType: mimetype
  }
}
function checkImgComplete (filePath, type = 'jpg') {
  const f1 = fs.readFileSync(filePath)
  const pos = f1.slice(-4)
  if (type === 'jpg' || type === 'jpeg') {
    return pos[2] === 255 && pos[3] === 217
  }
  if (type === 'png') {
    return pos[0] === 174 && pos[1] === 66 && pos[2] === 96 && pos[3] === 130
  }
  if (type === 'gif') {
    return pos[2] === 0 && pos[3] === 59
  }
  return -1
}

function getFileMd5 (filename) {
  const fd = fs.openSync(filename, 'r')
  const hash = crypto.createHash('md5')
  const buffer = Buffer.alloc(BUFFER_SIZE)

  try {
    let bytesRead

    do {
      bytesRead = fs.readSync(fd, buffer, 0, BUFFER_SIZE)
      hash.update(buffer.slice(0, bytesRead))
    } while (bytesRead === BUFFER_SIZE)
  } finally {
    fs.closeSync(fd)
  }

  return hash.digest('hex')
}
const csv2Arr = (data, splitStr = ',', omitFirstRow = false, fn = it => it) =>
  data
    .slice(omitFirstRow ? data.indexOf('\n') + 1 : 0)
    .split('\n')
    .map(v => v.split(splitStr).map(x => fn(x)))

function deleteAll (path) {
  /**
   * @memberof file#
   * @param {String} path - 目录路径
   * @description 递归删除目录
   * @return {number}
   * @example
   * $.file.deleteAll('./temp')
   */

  let files = []
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path)
    files.forEach(function (file) {
      const curPath = path + '/' + file
      if (fs.statSync(curPath).isDirectory()) {
        // recurse
        deleteAll(curPath)
      } else {
        // delete file
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(path)
  }
}

/**
 *
 * @param {string} fileName 文件名
 * @param {*} sp 分隔符正则或者字符
 * @param {*} cbFunc 每次满足行的回调函数
 * @param {*} endFunc 读完的时候的回调函数
 */

function readBig (
  fileName,
  sp = /\r?\n/g,
  cbFunc = function () {
    /*nothing */
  },
  endFunc = function () {
    /*nothing */
  }
) {
  let buffer = ''
  let count = 0
  const rs = fs.createReadStream(fileName)
  const t = new Date()
  rs.on('data', function (chunk) {
    const lines = (buffer + chunk).split(sp)
    buffer = lines.pop()
    for (let i = 0; i < lines.length; ++i) {
      count++
      cbFunc(count, lines[i])
    }
  })
  rs.on('end', function () {
    // 最后一行 或 分割，或 是一个空行
    count++
    endFunc(buffer, { spendTime: new Date() - t, n: count })
  })
}
module.exports = {
  getFileType,
  checkImgComplete,
  getFileMd5,
  csv2Arr,
  obj2Csv,
  arr2Csv,
  obj2Arr,
  deleteAll,
  readBig
}
