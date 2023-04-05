const express = require('express');
const router = express.Router();
const departmentController = require('../app/controllers/DepartmentController');

const isAuth = require('../app/middleware/auth');

router.get('/getAll', isAuth.isAuth, isAuth.isAuthorize(['Department.VIEW']), departmentController.listDepartment);
router.post('/create', isAuth.isAuth, isAuth.isAuthorize(['Department.CREATE']), departmentController.createDepartment);
router.delete('/:id/delete', isAuth.isAuth, isAuth.isAuthorize(['Department.DELETE']), departmentController.deleteDepartment);
router.put('/:id/update', isAuth.isAuth, isAuth.isAuthorize(['Department.UPDATE']), departmentController.updateDepartment);
router.get('/:id/employee', isAuth.isAuth, isAuth.isAuthorize(['Department.VIEW']), departmentController.employeeDepartment);

module.exports = router;
