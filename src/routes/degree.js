const express = require('express');
const router = express.Router();
const degreeController = require('../app/controllers/DegreeController');

const isAuth = require('../app/middleware/auth');

router.get('/getAll', degreeController.listDegree);
router.post('/create', degreeController.createDegree);
router.delete('/:id/delete', degreeController.deleteDegree);
router.put('/:id/update', degreeController.updateDegree);

module.exports = router;
