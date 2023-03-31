
const roleService = require('../Services/roleServices')
const roleValidator = require('../validator/RoleValidator')
const permissionService = require('../Services/permissionServices')
const lstPermission = (name,roleId) => [
    {name:`${name}`, display : `${name}`,roles: roleId},
    {name:`${name}.View`,display : 'Giao diện',roles: roleId},
    {name:`${name}.Create`,display : 'Thêm',roles: roleId},
    {name:`${name}.Update`,display : 'Sửa',roles: roleId},
    {name:`${name}.Delete`,display : 'Xóa',roles: roleId},
]
class RoleController{

    
    createRole = async (req,res) => {
        try {
        const formRole = req.body;
        const doesNameRole = await roleValidator.RoleNameExists(formRole.name)
        if(doesNameRole){
            const RoleId =  await roleService.create(req); // Create Role
            const lstPermisionId = await permissionService.create(lstPermission(formRole.name,RoleId)); // Create Permission
            await roleService.UpdatePermission(RoleId,lstPermisionId)
            const data = await roleService.getPermissionByRole(RoleId);

            res.status(201).json(data);
            // req.body.permissions = lstPermission(formRole.name)
            // res.status(201).json(
            //     await roleService.create(req)
            // );
        }
        } catch (error) {
            res.status(400).json(error.message)
        }
    }

    edit = async (req,res) => {

    }

    delete = async (req,res) => {
        await roleService.delete();
        res.status(200).json('Delete All');
    }

    getRolesbyUser = async (req,res) => {

    }

    details = async (req,res) => {
        let data = await roleService.getPermissionByRole(req.body.id);
        res.status(200).json(data);
    }

    addPermissionstoRole = async(req,res) => {
        let dataRole = await roleService.addPermissionstoRole(req.body.id,req.body.permissions);
        let dataPermission = await roleService.UpdateRoleByPermission(req.body.id,req.body.permissions);

        console.log('Check data',dataRoles);
        res.status(200).json({
            Role : dataRole,
            Pemissions : dataPermission
        });
    }
    
    
}

module.exports = new RoleController
