const secret = process.env.JWT_SECRET
const algorithm = 'aes-256-cbc'
const key = crypto.scryptSync(secret, 'salt', 32)
const iv = Buffer.alloc(16, 0) // Initialization crypto vector


const decrypt = (text = '') => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv)
  try {
    let decrypted = decipher.update(text, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
  } catch (err) {
    return err
  }
}
const encrypt = (text = '') => {
    const cipher = crypto.createCipheriv(algorithm, key, iv)
  
    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex')
  
    return encrypted
  }
module.exports = { decrypt,encrypt }