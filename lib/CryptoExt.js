'use strict'
// @ts-check
/**
 * @class
 */

const crypto = require('crypto')
class CryptoUtil {
  /**
   * 解密
   * @param data {string}
   * @param key {string}
   * @param iv {string}
   * @return {string}
   */

  decrypt (data, key, ag = 'aes-128-ecb', iv = '') {
    const cipherChunks = []
    const decipher = crypto.createDecipheriv(ag, key, iv)
    decipher.setAutoPadding(true)
    cipherChunks.push(decipher.update(data, 'hex', 'utf8'))
    cipherChunks.push(decipher['final']('utf8'))
    return cipherChunks.join('')
  }

  /**
   * 加密 java ecb模式默认不需要iv
   * @param data {string}
   * @param key {string}
   * @param iv {string}
   * @return {string}
   */

  encrypt (data, key, ag = 'aes-128-ecb', iv = '') {
    let cipherChunks
    cipherChunks = []
    const cipher = crypto.createCipheriv(ag, key, iv)
    cipher.setAutoPadding(true)
    cipherChunks.push(cipher.update(data, 'utf8', 'hex'))
    cipherChunks.push(cipher['final']('hex'))
    return cipherChunks.join('')
  }
}

module.exports = CryptoUtil
