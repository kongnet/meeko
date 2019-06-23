/**
 * @class
 */
class Spinner {
  // 构造函数
  constructor (type = 'bouncingBar') {
    this.frames = require('./spinner/spinner.js')[type]
    this.index = 0
    this.timer = {}
    this.showTxt = ''
  }

  /**
  * @memberof Spinner#
  * @param {string} s - 文字内容
  * @description 设置动画显示文字
  * @method setShowTxt
  * @example
  * setShowTxt('test')
  */
  // 设置动画显示文字
  setShowTxt (s) {
    this.showTxt = s
  }

  /**
   * 启动
  * @memberof Spinner#
  * @param {string} s - 文字内容
  * @description 启动
  * @method start
  * @example
  * start('test')
  */
  start (s) {
    this.showTxt = s
    this.timer = setInterval(() => {
      this.index = ++this.index % this.frames.length
      // process.stdout.clearLine() //输出闪动
      process.stdout.write(`\r ${this.frames[this.index]} ${this.showTxt || 'Waiting...'}`)
      // process.stdout.cursorTo(colum, row)
    }, 100)
  }

  /**
   * 停止
  * @memberof Spinner#
  * @description 停止
  * @method stop
  * @example
  * stop('test')
  */
  stop () {
    clearInterval(this.timer)
    process.stdout.cursorTo(0)
    process.stdout.clearLine()
  }
}
module.exports = Spinner
