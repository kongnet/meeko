'use strict'
// 日期原型扩展
function getFirstWeekBegDay (year) {
  var tempdate = new Date(year, 0, 1)
  var temp = tempdate.getDay()
  if (temp === 1) {
    return tempdate
  }
  temp = temp === 0 ? 7 : temp
  tempdate = tempdate.setDate(tempdate.getDate() + (8 - temp))
  return new Date(tempdate)
}

function getWeekIndex (dateobj) {
  var firstDay = getFirstWeekBegDay(dateobj.getFullYear())
  if (dateobj < firstDay) {
    firstDay = getFirstWeekBegDay(dateobj.getFullYear() - 1)
  }
  var d = Math.floor((dateobj.valueOf() - firstDay.valueOf()) / 86400000)
  return Math.floor(d / 7) + 1
}

module.exports = {
  getWeek () {
    return getWeekIndex(this)
  },
  date2Str () {
    let y = this.getFullYear()
    let mon = this.getMonth() + 1
    mon = mon < 10 ? '0' + mon : mon
    let date = this.getDate()
    date = date < 10 ? '0' + date : date
    let hour = this.getHours()
    hour = hour < 10 ? '0' + hour : hour
    let min = this.getMinutes()
    min = min < 10 ? '0' + min : min
    let sec = this.getSeconds()
    sec = sec < 10 ? '0' + sec : sec
    return y + '-' + mon + '-' + date + ' ' + hour + ':' + min + ':' + sec
  },
  date8 (s) {
    let m = this.getMonth() + 1
    let d = this.getDate()
    m = m <= 9 ? '0' + m : m
    d = d <= 9 ? '0' + d : d
    s = s || ''
    return [this.getFullYear(), m, d].join(s)
  },
  /* 得到日期年月日等加数字后的日期 */
  dateAdd (interval, number) {
    let d = this
    let k = {
      'y': 'FullYear',
      'q': 'Month',
      'm': 'Month',
      'w': 'Date',
      'd': 'Date',
      'h': 'Hours',
      'n': 'Minutes',
      's': 'Seconds',
      'ms': 'MilliSeconds'
    }
    let n = {
      'q': 3,
      'w': 7
    }
    d['set' + k[interval]](d['get' + k[interval]]() + (n[interval] || 1) * number)
    return d
  }
}
