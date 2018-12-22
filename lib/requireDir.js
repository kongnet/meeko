'use strict'
let fs = require('fs')
function identity (val) {
  return val
}

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
