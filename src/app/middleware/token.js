
const jwt = require("jsonwebtoken");
const buildObject = require("../utils/buildObject");

class Token{
    generateToken = async (user = {}) =>{
        const expiration =
        new Date().getTime() + 10 * 60 * process.env.JWT_EXPIRATION_IN_MINUTES
        return new Promise((resolve, reject) => {
          if(user){
            const token = jwt.sign(
              { user_id: user._id,email : user.email,roles : user.roles.map(p => p.name) },
              process.env.JWT_SECRET,
              {
                expiresIn: 120,
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
    generateRefreshToken = async (user = {}) =>{
        const expiration =
        new Date().getTime() + 10 * 60 * process.env.JWT_EXPIRATION_IN_MINUTES
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
          return new Promise (async (resolve,reject) => {
            await jwt.verify(token.replace('Bearer ', ''),process.env.JWT_SECRET, function(err,decoded) {
              if(err){
                return reject(false);
              }
              return resolve(decoded);
            }) 
          })

        } catch (error) {
          console.log(error.message);
        }

    }

}


module.exports = new Token



