// @ts-check
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

  // 设置动画显示文字
  setShowTxt (s) {
    /**
     * @memberof Spinner#
     * @param {string} s - 文字内容
     * @description 设置动画显示文字
     * @method setShowTxt
     * @example
     * setShowTxt('test')
     */

    this.showTxt = s
  }

  start (s) {
    /**
     * 启动
     * @memberof Spinner#
     * @param {string} s - 文字内容
     * @description 启动
     * @method start
     * @example
     * start('test')
     */

    this.showTxt = s ?? this.showTxt
    this.timer = setInterval(() => {
      this.index = ++this.index % this.frames.length
      // process.stdout.clearLine() //输出闪动
      process.stdout.write(`\r ${this.frames[this.index]} ${this.showTxt || 'Waiting...'}`)
      // process.stdout.cursorTo(colum, row)
    }, 100)
  }

  stop () {
    /**
     * 停止
     * @memberof Spinner#
     * @description 停止
     * @method stop
     * @example
     * stop('test')
     */

    clearInterval(+this.timer)
    try {
      process.stdout.cursorTo(0)
      process.stdout.clearLine(0)
    } catch (e) {
      /* do nothing */
    }
  }
}
module.exports = Spinner
