const userService = require('../Services/userServices')
const userValidation = require('../validator/UserValidator')
const token = require('../middleware/token')
const User = require('../models/User')
const userServices = require('../Services/userServices')
class AuthController{

    index = async (req, res) => {
        //const id = '641166dd2e85b9b13ad74ee5';
        const user = await User.
        findById('641166dd2e85b9b13ad74ee5').
        populate({
            path : "roles",
            select : "name"
        }).
        then(res =>{
            return res;
        });
        res.status(200).json(user)
    }

    register = async (req,res) =>{
        try{
            res.status(201).json(
                await userService.registerUser(req),
            );
            // const doesEmailExists = await userValidation.emailExists(formUser.email)
            // if(doesEmailExists){
            //     res.status(201).json(
            //         await userService.registerUser(req),
            //     );
            // }
        }
        catch(error){
            res.status(error.status).json(err.message)
        }
    }
    login = async(req,res) =>{
        try{
            const formUser = req.body;
            const doesEmailExists = await userValidation.checkUserExists(formUser.email)
            const checkLoginbyUser = await userValidation.checkLogin(formUser.email,formUser.password)
            if(doesEmailExists && checkLoginbyUser){
                const user =  await userServices.getRoleByEmail(formUser.email)
                console.log('Check data : ',user);
                res.status(200).json(
                    {
                        token : await token.generateToken(user),
                        refreshtoken : await token.generateRefreshToken(user)
                    }
                );
            }
            else{
                res.status(200).json('Không có chi')
            }
        }
        catch(error){
            console.log(error);
            res.status(error.status).json({message : error.message})
        }
    }

    refreshToken = async(req,res) => {
        try{
            const refreshToken = req.headers.authorization;
            console.log(refreshToken)
            const data = await token.verifyToken(refreshToken); // get Email
            console.log(data);
            if(data){
                const user =  await userServices.getRoleByEmail(formUser.email)
                res.status(200).json({
                    token : await token.generateToken(user),
                    refreshtoken : await token.generateRefreshToken(user)
                })
            }
        }
        catch(error){
            console.log(error);
            //res.status(error.status).json({message : error.message})
        }
    }

}
module.exports = new AuthController