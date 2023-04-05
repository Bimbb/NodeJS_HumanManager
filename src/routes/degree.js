const express = require('express');
const router = express.Router();
const degreeController = require('../app/controllers/DegreeController');

const isAuth = require('../app/middleware/auth');
router.get('/getAll', isAuth.isAuth, isAuth.isAuthorize(['Degree.VIEW']), degreeController.listDegree);
router.post('/create', isAuth.isAuth, isAuth.isAuthorize(['Degree.CREATE']), degreeController.createDegree);
router.delete('/:id/delete', isAuth.isAuth, isAuth.isAuthorize(['Degree.DELETE']), degreeController.deleteDegree);
router.put('/:id/update', isAuth.isAuth, isAuth.isAuthorize(['Degree.UPDATE']), degreeController.updateDegree);

module.exports = router;
