const User = require('../models/User')
const buildObject = require('../utils/buildObject')
// Đăng ký vào dữ liệu

class UserService{
  // Đăng ký
    registerUser = (req = {}) => {
        const formUser = req.body;
        const user = new User(formUser); 
        return new Promise((resolve, reject) => {
           user.save((err, item) =>{
            if(err){
              reject(buildObject.buildErrObject(422,err.message))
            }
            resolve(item);
          });
        });
        
  }
  // Generate Token

}

  module.exports = new UserService