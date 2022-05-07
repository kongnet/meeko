'use strict'
// @ts-check
/**
 * @class
 */

const crypto = require('crypto')
class CryptoUtil {
  constructor (opt) {
    //this.tag = Buffer.alloc(0)
    this.opt = Object.assign(
      {
        key: crypto.randomBytes(32), // 32位的共享密钥
        iv: crypto.randomBytes(16), // 初始向量，16 字节
        algorithm: 'aes-256-gcm', // 加密算法和操作模式 aes-256-ecb等
        clearEncoding: 'utf8',
        cipherEncoding: 'base64',
        tag: Buffer.alloc(0)
      },
      opt
    )
    this.easyAES = {
      encrypt: function (data, key, iv, algorithm = 'aes-256-cfb', cipherEncoding = 'hex', clearEncoding = 'utf-8') {
        //If the next line is uncommented, the final cleartext is wrong.
        /*
          默认是使用的 PKCS7 填充模式（所以我们未指定填充模式也可以等到跟 Java 相同的加密结果）
        */
        const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, cipherEncoding), Buffer.from(iv, cipherEncoding))
        let str = cipher.update(data, clearEncoding, cipherEncoding)
        str += cipher.final(cipherEncoding)
        return str
      },
      decrypt: function (data, key, iv, algorithm = 'aes-256-cfb', cipherEncoding = 'hex', clearEncoding = 'utf-8') {
        const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, cipherEncoding), Buffer.from(iv, cipherEncoding))
        let str = decipher.update(data, cipherEncoding, clearEncoding)
        str += decipher.final(clearEncoding)
        return str
      }
    }
  }
  /**
   * 解密
   * @return {string}
   */

  decrypt (data, key, vi, tag) {
    // 初始化解密算法
    const decipher = crypto.createDecipheriv(this.opt.algorithm, key ?? this.opt.key, vi ?? this.opt.iv)
    // 传入验证标签，验证密文的来源
    decipher.setAuthTag(tag || this.opt.tag)
    decipher.setAutoPadding(true)
    let decrypted = decipher.update(data, this.opt.cipherEncoding, this.opt.clearEncoding)
    decrypted += decipher.final(this.opt.clearEncoding)
    return { r: decrypted }
  }

  /**
   * 加密
   */
  encrypt (data, key, vi) {
    // 初始化加密算法
    const cipher = crypto.createCipheriv(this.opt.algorithm, key ?? this.opt.key, vi ?? this.opt.iv)
    cipher.setAutoPadding(true)
    let encrypted = cipher.update(data, this.opt.clearEncoding, this.opt.cipherEncoding)
    encrypted += cipher.final(this.opt.cipherEncoding)
    // 使用GCM，CCM和OCB时需要AuthTag
    return { r: encrypted, tag: cipher.getAuthTag() }
  }
}

module.exports = CryptoUtil
/* 要加密的数据
const text = '0x85ED806fF4C249EA89c9f3D8566CbD1031193952'
const cryptoGCM = new CryptoUtil()
const str = cryptoGCM.encrypt(text)
console.log(str)
console.log(cryptoGCM.decrypt(str))
*/

/*
let data = 'aabbccddeeffgg0123zzz你好'
let key = 'e43ee68382dc550fbd1d329486febdd4e43ee68382dc550fbd1d329486febdd5'
let iv = '6e9bbca876f8ddffc44a93503156abb3'
const cryptoObj = new CryptoUtil()
let oriStr = 'aabbccddeeffgg0123zzz你好'
let rst = cryptoObj.easyAES.encrypt(oriStr, key, iv)
console.log(oriStr, '加密后', rst)
rst = cryptoObj.easyAES.decrypt(rst, key, iv)
console.log('解密后', rst)
*/
