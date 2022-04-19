'use strict'
// @ts-check
/**
 * @class
 */

const crypto = require('crypto')

class CryptoUtil {
  constructor (opt) {
    this.tag = Buffer.alloc(0)
    this.opt = Object.assign(
      {
        key: crypto.randomBytes(32), // 32位的共享密钥
        iv: crypto.randomBytes(16), // 初始向量，16 字节
        algorithm: 'aes-256-gcm', // 加密算法和操作模式 aes-256-ecb等
        clearEncoding: 'utf8',
        cipherEncoding: 'base64'
      },
      opt
    )
  }
  /**
   * 解密
   * @return {string}
   */

  decrypt (data) {
    // 初始化解密算法
    const decipher = crypto.createDecipheriv(this.opt.algorithm, this.opt.key, this.opt.iv)
    // 传入验证标签，验证密文的来源
    decipher.setAuthTag(this.tag)
    decipher.setAutoPadding(true)
    let decrypted = decipher.update(data, this.opt.cipherEncoding, this.opt.clearEncoding)
    decrypted += decipher.final(this.opt.clearEncoding)
    return decrypted
  }

  /**
   * 加密
   */
  encrypt (data) {
    // 初始化加密算法
    const cipher = crypto.createCipheriv(this.opt.algorithm, this.opt.key, this.opt.iv)
    cipher.setAutoPadding(true)
    let encrypted = cipher.update(data, this.opt.clearEncoding, this.opt.cipherEncoding)
    encrypted += cipher.final(this.opt.cipherEncoding)
    // 使用GCM，CCM和OCB时需要AuthTag
    this.tag = cipher.getAuthTag()
    return encrypted
  }
}

module.exports = CryptoUtil
/* 要加密的数据
const text = 'Sky AES GCM Test'
const cryptoGCM = new CryptoUtil()
const str = cryptoGCM.encrypt(text)
console.log(str)
console.log(cryptoGCM.decrypt(str))
*/
