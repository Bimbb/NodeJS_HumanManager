const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userService = require('../Services/userServices')
const buildObject = require('../utils/buildObject')
const UserValidation = require('../validator/UserValidator')
const User = require('../models/User')
class AuthController{

    index(req, res) {
        res.json({
            name: 'test Site'
        });
    }

     register = async (req,res) =>{
        try{
            console.log(req);
            const doesEmailExists = await UserValidation.emailExists(req.body.email)
            if(doesEmailExists){
                res.status(201).json(
                    await userService.registerUser(req),
                );
            }
        }
        catch(error){
            res.status(422).json(error.message)
        }
    }
    login = async(req,res) =>{
        try{
            const formUser = req.body;
            const checkUserExists = await userService.findUser(req.body.email);
            const user = await User.findOne({email : formUser.email});
            console.log("Test User",user.email ,user._id)
            if(checkUserExists){
                res.status(200).json(
                    {
                        user : await userService.login(req),
                        token : await userService.generateToken(user)
                    }
                );
            }
            else{
                res.status(200).json('Không có chi')

            }
        }
        catch(error){
            res.status(422).json(error.message)
        }
    }

}
module.exports = new AuthController