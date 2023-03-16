const buildObject = require('../utils/buildObject');
const token = require('./token')
class Auth{
  isAuth = async (req,res,next) => {
    const accessToken = req.headers.authorization;
    console.log(accessToken);
    if (!accessToken){
      return res.status(401).send('Token không hợp lệ!');
    }
    const verified = await token.verifyToken(accessToken)
    if (!verified) {
      return res
        .status(401)
        .send('Bạn không có quyền truy cập vào tính năng này!');
    }
    return next();
  }

  isAuthorize = (roles) => async (req,res,next) => {
    try {
      const data = {
        id : req.user._id,
        roles
      }
      
    } catch (error) {
        buildObject.buildErrObject(res,error)
    }
  }
}

module.exports = new Auth