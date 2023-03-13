class BuildObject{
   buildErrObject = (status = '', message = '') => {
    return {
      status,
      message
    }
  }
   buildSuccObject = (message = '') => {
    return {
      msg: message
    }
  }

   handleError = (res = {}, err = {}) => {
    // Sends error to user
    res.status(err.code).json({
      errors: {
        msg: err.message
      }
    })
  }
}
  module.exports = new BuildObject