const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const categoryController = require('../controllers/categoryController')

router.post('/create', authMiddleware, categoryController.createCatController)
router.get('/getAll', categoryController.getAllCatController)
router.put('/update/:id', authMiddleware, categoryController.updateCatController)
router.delete('/deleteCat/:id', authMiddleware, categoryController.deleteCatController)
module.exports = router;
