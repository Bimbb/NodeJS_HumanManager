const userService = require('../Services/userServices')
const roleService = require('../Services/roleServices')
const userValidation = require('../validator/UserValidator')
const token = require('../middleware/token')
const User = require('../models/User')
const auth = require('../middleware/auth')
class AuthController{

    getByEmail = async (req, res) => {
        //const id = '641166dd2e85b9b13ad74ee5';
        const user = await userService.getRoleByEmail('nht.it19@gmail.com')
        res.status(200).json(user)
    }
    getCurrentUser = async (req, res) => {
        //const id = '641166dd2e85b9b13ad74ee5';
        const token = req.headers.authorization;
        const data = await userService.getCurrentUser(token);

        res.status(200).json(data)
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
                const user =  await userService.getRoleByEmail(formUser.email)
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
                const user =  await userService.getRoleByEmail(data.email)
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
    checkAuth = async (req,res) => {
        res.status(200).json('Cục chỉ nhỏ');
    }

    addRolestoUser = async (req,res) => {
        let dataUser = await userService.addRolestoUser(req.body.id,req.body.roles);
        let dataRole = await roleService.UpdateRoleByUser(req.body.id,req.body.roles);
        
        res.status(200).json({
            User : dataUser,
            Role : dataRole
        });
    }
}
module.exports = new AuthController