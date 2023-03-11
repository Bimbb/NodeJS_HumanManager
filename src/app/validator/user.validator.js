const User = require('../models/user')
const { buildErrObject } = require('../../middleware/utils')

const emailExists = (email = '') => {
    return new Promise((resolve, reject) => {
      User.findOne(
        {
          email
        },
        (err, item) => {
          if (err) {
            return reject(buildErrObject(422, err.message))
          }
          if (item) {
            return reject(buildErrObject(422, 'Email is already exists'))
          }
          resolve(true) // return true if pass validate
        }
      )
    })
  }

  module.exports = { emailExists }