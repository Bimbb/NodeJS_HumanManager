const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userService = require('../Services/userServices')
class AuthController{

    index(req, res) {
        res.json({
            name: 'test Site'
        });
    }
     register = async (req,res) =>{
        console.log(req);
         res.status(201).json(
            await userService.registerUser(req),
        );
    }
    

}
module.exports = new AuthController