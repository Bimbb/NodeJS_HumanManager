const express = require('express');
const router = express.Router();
const isAuth = require('../app/middleware/auth');

const salaryController = require('../app/controllers/SalaryController');

router.get('/getAll', isAuth.isAuth, isAuth.isAuthorize(['Salary.VIEW']), salaryController.listSalary);
router.post('/create', isAuth.isAuth, isAuth.isAuthorize(['Salary.CREATE']), salaryController.createSalary);
router.delete('/:id/delete', isAuth.isAuth, isAuth.isAuthorize(['Salary.DELETE']), salaryController.deleteSalary);
router.put('/:id/update', isAuth.isAuth, isAuth.isAuthorize(['Salary.UPDATE']), salaryController.updateSalary);
router.get('/search', isAuth.isAuth, isAuth.isAuthorize(['Salary.VIEW']), salaryController.search);

module.exports = router;
