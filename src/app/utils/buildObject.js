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
}
  module.exports = new BuildObject