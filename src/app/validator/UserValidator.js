const User = require('../models/User')
const buildObject = require('../utils/buildObject')
const bcrypt = require("bcryptjs");

class UserValidation{
  
    emailExists = (email = '') => {
    return new Promise((resolve, reject) => {
      User.findOne(
        {
          email : email
        },
        (err, item) => {
          if (err) {
            return reject(buildObject.buildErrObject(422, err.message))
          }
          if (item) {
            return reject(buildObject.buildErrObject(422, 'Email is already exists'))
          }
          resolve(true) // return true if pass validate
        }
      )
    })
  }

    checkUserExists = (email = '') =>{
      return new Promise((resolve, reject) => {
        User.findOne(
          {
            email
          },
          (err, item) => {
            if (err) {
              return reject(buildObject.buildErrObject(422, err.message))
            }
            if (item) {
              return reject(buildObject.buildErrObject(422, 'Email is already exists'))
            }
            resolve(true) // return true if pass validate
          }
        )
      })
    }
    checkLogin = async (email = '',password = '') =>{
      return new Promise((resolve, reject) => {
        User.findOne(
          {
            email : email,
          },
          async (err, item) => {
            if (err) {
              return reject(buildObject.buildErrObject(422, err.message))
            }
            if(await bcrypt.compare(password, user.password)){
              resolve(true) // return true if pass validate
            }
          }
        )
      })
    }
}

  module.exports = new UserValidation