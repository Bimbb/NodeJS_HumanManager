const buildObject = require('../utils/buildObject');
const token = require('./token')
class Auth{
  isAuth = async (req,res,next) => {
    const accessToken = req.headers.authorization;
    if (!accessToken){
      return res.status(401).send('Token không hợp lệ!');
    }
    const verified = await token.verifyToken(accessToken.replace('Bearer ', ''))
                .then((data) => {
                  return data; // return true
    }).catch((err) => {
        return err; // return false
    })
    if(!verified){
      return res.status(401).send('Token không hợp lệ!');
    }
    console.log(verified);
    req.data = verified
    next()
  }

  isAuthorize = (roles = []) => async (req,res,next) => {
    try {
      const accessToken = req.headers.authorization;
      const verified = await token.verifyToken(accessToken.replace('Bearer ', ''))
                .then((data) => {
                  return data; // return true
    }).catch((err) => {
        return err; // return false
    })
    if(!verified){
      return res.status(401).send('Token không hợp lệ!');
    }
    console.log(verified.roles);
      if(verified.roles.find(role => roles.includes(role))){
        next()
      }
    } catch (error) {
        buildObject.buildErrObject(res,error)
    }
  }
}

module.exports = new Auth