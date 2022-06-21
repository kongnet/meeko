/* istanbul ignore file */

/**
 * @class
 */

class Snowflake {
  constructor (_workerId, _dataCenterId, _sequence) {
    this.twepoch = 1288834974657n
    // this.twepoch = 0n
    this.workerIdBits = 5n
    this.dataCenterIdBits = 5n
    this.maxWrokerId = -1n ^ (-1n << this.workerIdBits) // 值为：31
    this.maxDataCenterId = -1n ^ (-1n << this.dataCenterIdBits) // 值为：31
    this.sequenceBits = 12n
    this.workerIdShift = this.sequenceBits // 值为：12
    this.dataCenterIdShift = this.sequenceBits + this.workerIdBits // 值为：17
    this.timestampLeftShift = this.sequenceBits + this.workerIdBits + this.dataCenterIdBits // 值为：22
    this.sequenceMask = -1n ^ (-1n << this.sequenceBits) // 值为：4095
    this.lastTimestamp = -1n
    // 设置默认值,从环境变量取
    this.workerId = BigInt(_workerId) || 1n
    this.dataCenterId = BigInt(_dataCenterId) || 1n
    this.sequence = BigInt(_sequence) || 0n

    if (this.workerId > this.maxWrokerId || this.workerId < 0) {
      throw new Error('0 < _workerId < maxWrokerId-[' + this.maxWrokerId + ']')
    }
    if (this.dataCenterId > this.maxDataCenterId || this.dataCenterId < 0) {
      throw new Error('0 < _dataCenterId < maxDataCenterId-[' + this.maxDataCenterId + ']')
    }
  }

  tilNextMillis (lastTimestamp) {
    /**
     * @memberof Snowflake#
     * @param {BigInt} a - 数组
     * @description 获取bigInt类型时间戳
     * @method tilNextMillis
     * @return {BigInt}
     * @example
     * tilNextMillis(1560393215020)
     * // 1560393270246
     */

    let timestamp = this.timeGen()
    while (timestamp <= lastTimestamp) {
      timestamp = this.timeGen()
    }
    return BigInt(timestamp)
  }

  timeGen () {
    /**
     * @memberof Snowflake#
     * @description 获取BigInt时间戳
     * @method timeGen
     * @return {BigInt}
     * @example
     * timeGen()
     * // 1560393270246
     */

    return BigInt(Date.now())
  }

  nextId () {
    /**
     * @memberof Snowflake#
     * @description 雪花算法获取唯一随机数
     * @method nextId
     * @return {BigInt}
     * @example
     * nextId()
     * // 1138999382948057088
     */

    let timestamp = this.timeGen()
    if (timestamp < this.lastTimestamp) {
      console.error('时钟倒退了，无法产生id ' + (this.lastTimestamp - timestamp))
      return -1 // 调用端要判断是否为-1
    }
    if (this.lastTimestamp === timestamp) {
      this.sequence = (this.sequence + 1n) & this.sequenceMask
      if (this.sequence === 0n) {
        timestamp = this.tilNextMillis(this.lastTimestamp)
      }
    } else {
      this.sequence = 0n
    }
    this.lastTimestamp = timestamp
    return ((timestamp - this.twepoch) << this.timestampLeftShift) | (this.dataCenterId << this.dataCenterIdShift) | (this.workerId << this.workerIdShift) | this.sequence
  }
}
module.exports = Snowflake
