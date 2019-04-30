
class Spinner {
  // 构造函数
  constructor (type = 'bouncingBar') {
    this.frames = require('./spinner/spinner.js')[type].frames
    this.index = 0
    this.timer = {}
    this.showTxt = ''
  }
  // 设置动画显示文字
  setShowTxt (s) {
    this.showTxt = s
  }
  // 启动
  start (s) {
    this.showTxt = s
    this.timer = setInterval(() => {
      this.index = ++this.index % this.frames.length
      // process.stdout.clearLine() //输出闪动
      process.stdout.write(`\r ${this.frames[this.index]} ${this.showTxt || 'Waiting...'}`)
      // process.stdout.cursorTo(colum, row)
    }, 100)
  }
  // 停止
  stop () {
    clearInterval(this.timer)
    process.stdout.cursorTo(0)
    process.stdout.clearLine()
  }
}
module.exports = Spinner
