'use strict'
// @ts-check
/**
 * @namespace RequireDir_prototype
 */

const fs = require('fs')
function identity (val) {
  return val
}

module.exports = function requireAll (options) {
  /**
   * @memberof RequireDir_prototype#
   * @param {Object} options - 目录名称或目录结构体
   * @description 递归读取制定目录下所有文件
   * @function requireAll
   * @return {Object}
   * @example
   * requireAll({ dirname: path.join(__dirname, '.', 'lib', 'tools')})
   * // {"index":{"utf8":{},"lzw":{}}}
   */

  const dirname = typeof options === 'string' ? options : options.dirname
  const filter = options.filter || /^([^\\.].*)\.js(on)?$/
  const modules = {}
  const resolve = options.resolve || identity
  const map = options.map || identity

  function filterFile (filename) {
    if (typeof filter === 'function') {
      return filter(filename)
    }

    const match = filename.match(filter)
    if (!match) {
      return 0
    }

    return match[1] || match[0]
  }

  const files = fs.readdirSync(dirname)

  files.forEach(function (file) {
    const filepath = dirname + '/' + file
    if (fs.statSync(filepath).isDirectory()) {
      const subModules = requireAll({
        dirname: filepath,
        filter: filter,
        map: map,
        resolve: resolve
      })

      if (Object.keys(subModules).length === 0) {
        return 0
      }

      modules[map(file, filepath)] = subModules
    } else {
      const name = filterFile(file)
      if (!name) {
        return 0
      }

      modules[map(name, filepath)] = resolve(require(filepath))
    }
  })

  return modules
}
