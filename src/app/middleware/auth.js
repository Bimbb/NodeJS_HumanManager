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
}

module.exports = new Auth