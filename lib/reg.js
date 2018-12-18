let reg = require('./reg/')

let gen = s => {
  return reg.Handler.gen(reg.Parser.parse(s))
}

console.log()
module.exports = {
  gen
}
