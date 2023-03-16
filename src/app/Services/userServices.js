const User = require('../models/User')
const roleService = require('../Services/roleServices')
const buildObject = require('../utils/buildObject')
const bcryptjs = require('bcryptjs')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { default: mongoose } = require('mongoose');
// Đăng ký vào dữ liệu

class UserService{
  // Đăng ký
    registerUser = async (req = {}) => {
        const formUser = req.body;
        formUser.password = await bcryptjs.hash(formUser.password, 10);
        const user = new User(formUser); 
        user._id = mongoose.Types.ObjectId();
        return new Promise((resolve, reject) => {
           user.save(async (err, item) =>{
            if(err){
              reject(buildObject.buildErrObject(422,err.message))
            }
            const role = await roleService.findRoleByName('USER');
            console.log('Test Role Id',role._id)
            console.log('Test User Id',item._id)
            await User.findByIdAndUpdate(item._id,
            {
              $push : {roles : role._id}
            })
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
    findUserById = (id = '') => {
      return new Promise((resolve,reject) =>{
        User.findById(id, async (err,item) =>{
          try {
            
            if(!err){
              resolve(item);
            }
            reject(err);
          } catch (error) {
            reject(error);
          }
        })
      })
    }

    edit = async(id='',user = {}) =>{

    }
}

  module.exports = new UserService