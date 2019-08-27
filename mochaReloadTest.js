const $ = require('./index')
const { execSync,exec } = require('child_process')


try{
  let r = exec('npm test', function (err, ...x) {
    if (err) {
      (/\n(.+Error.+)\n/g).test(x[0])
      console.log(x[0].replace(RegExp.$1,$.c.r(RegExp.$1)))
      return
    }
    console.log(x[0])
  })

}catch(e){

}
