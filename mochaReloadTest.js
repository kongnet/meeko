const $ = require('./index')
const { exec } = require('child_process')

try {
  exec('npm test', function (err, ...x) {
    if (err) {
      const isErrorStr = /\n(.+Error.+)\n/g.test(x[0])
      console.log(isErrorStr ? x[0].replace(RegExp.$1, $.c.r(RegExp.$1)) : x[0])
      return
    }
    console.log(x[0])
  })
} catch (e) {}
