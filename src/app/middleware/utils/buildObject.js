const buildErrObject = (status = '', message = '') => {
    return {
      status,
      message
    }
  }
  const buildSuccObject = (message = '') => {
    return {
      msg: message
    }
  }
  module.exports = { buildErrObject,buildSuccObject }