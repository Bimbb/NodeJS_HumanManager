
const jwt = require("jsonwebtoken");
const buildObject = require("../utils/buildObject");

class Token{
    generateToken = async (user = {}) =>{
        const expiration =
        Math.floor(Date.now() / 1000) + 60 * process.env.JWT_EXPIRATION_IN_MINUTES;
        console.log('Check User',user)
        return new Promise((resolve, reject) => {
          if(user){
            const token = jwt.sign(
              { user_id: user._id,email : user.email },
              process.env.JWT_SECRET,
              {
                expiresIn: expiration,
              }
            );
            resolve(token)
          }
          else{
            console.log('Test lỗi'+err.message)
            reject(buildObject.buildErrObject(404,'User Not Found'))
          }
        });
      }
    verifyToken = async (token = '' ) => {
      try {
        await jwt.verify(token,process.env.JWT_SECRET, function(err) {
         if(err){
          console.log(err);
           return false;
         }
         return true;
       }) 
        } catch (error) {
          reject(error.message);
          }

    }

}


module.exports = new Token



