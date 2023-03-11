const User = require('../models/user')
const buildErrObject = require('../middleware/utils')
// Đăng ký vào dữ liệu


const registerUser = (req = {}) => {
    return new Promise((resolve, reject) => {
      const user = new User({
        email: req.email,
        password: req.password,
        username: req.username,
        birthDay: req.birthDay,
        phone: req.phone,
        fullname: req.fullname,
        address: req.address,
        avatar: req.avatar,
        departmentID : req.departmentID,
        degreeID : req.degreeID,
        salaryID : req.salaryID,
        verification: uuid.v4()
      })
      user.save((err, item) => {
        if (err) {
          reject(buildErrObject(422, err.message)) // Error
        }
        resolve(item._id) // trả về _id
      })
    })
  }
  const returnRegisterToken = (
    { _id = '' }
  ) => {
    return new Promise((resolve) => {
      const data = {
        token: generateToken(_id)
      }
      resolve(data)
    })
  }
  module.exports = { registerUser,returnRegisterToken }