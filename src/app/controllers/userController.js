const registerUser = require('../Services')
const emailExists = require('../validator')
const buildErrObject = require('../middleware/utils')

const register = async (req, res) => {
    try {
      // Gets locale from header 'Accept-Language'
      //const locale = req.getLocale()
      req = matchedData(req)
      const doesEmailExists = await emailExists(req.email)
      if (!doesEmailExists) {
        const item = await registerUser(req) // Save User
        const response = await returnRegisterToken(item._id)
        //sendRegistrationEmailMessage(locale, item)
        return res.status(201).json({item,response});
      }
    } catch (error) {
        buildErrObject(res, error)
    }
  }
  module.exports = { register }