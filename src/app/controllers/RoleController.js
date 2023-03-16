
const roleService = require('../Services/roleServices')
const roleValidator = require('../validator/RoleValidator')

class RoleController{

    
    create = async (req,res) => {
        try {
        const formRole = req.body;
        const doesNameRole = await roleValidator.RoleNameExists(formRole.name)
        if(doesNameRole){
            res.status(201).json(
                await roleService.create(req)
            );
        }
        } catch (error) {
            res.status(400).json(error.message)
        }
    }

    edit = async (req,res) => {

    }

    delete = async (req,res) => {

    }

    getRolesbyUser = async (req,res) => {

    }
}

module.exports = new RoleController
