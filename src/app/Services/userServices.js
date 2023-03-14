const User = require('../models/User')
const buildObject = require('../utils/buildObject')
const bcryptjs = require('bcryptjs')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const promisify = require('util').promisify;
// Đăng ký vào dữ liệu

class UserService{
  // Đăng ký
    registerUser = async (req = {}) => {
        const formUser = req.body;
        formUser.password = await bcryptjs.hash(formUser.password, 10);
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
    login = async (req = {}) =>{
      const formUser = req.body;
      const user =  User.findOne({
        email : formUser.email,
      })
      if(user){
        return new Promise((resolve, reject) => {
          // if(!user){
          //   reject(buildObject.buildErrObject(422,'Not Found user'))
          // }
          resolve(user);
      });
      }
    }
    findUser = (email = '') => {
      return new Promise((resolve, reject) => {
        User.findOne(
          {
            email : email
          },
          async (err, item) => {
            try {
              if(err){
                console.log('Test lỗi'+err.message)
                reject(buildObject.buildErrObject(404,'User Not Found'))
              }
              resolve(item)
            } catch (error) {
              reject(error)
            }
          }
        )
      })
    }
  // Generate Token
    

    edit = async(id='',user = {}) =>{

    }
}

  module.exports = new UserService