'use strict'
/**
 * @namespace RequireDir_prototype
 */
let fs = require('fs')
function identity (val) {
  return val
}

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
module.exports = function requireAll (options) {
  let dirname = typeof options === 'string' ? options : options.dirname
  let filter = options.filter || /^([^\\.].*)\.js(on)?$/
  let modules = {}
  let resolve = options.resolve || identity
  let map = options.map || identity

  function filterFile (filename) {
    if (typeof filter === 'function') {
      return filter(filename)
    }

    let match = filename.match(filter)
    if (!match) return

    return match[1] || match[0]
  }

  let files = fs.readdirSync(dirname)

  files.forEach(function (file) {
    let filepath = dirname + '/' + file
    if (fs.statSync(filepath).isDirectory()) {
      let subModules = requireAll({
        dirname: filepath,
        filter: filter,
        map: map,
        resolve: resolve
      })

      if (Object.keys(subModules).length === 0) return

      modules[map(file, filepath)] = subModules
    } else {
      let name = filterFile(file)
      if (!name) return

      modules[map(name, filepath)] = resolve(require(filepath))
    }
  })

  return modules
}
