const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/getUser', authMiddleware, userController.getUserController);
router.put('/updateUser', authMiddleware, userController.updateUserController)
router.post('/updatePassword', authMiddleware, userController.updatePasswordController)
router.post('/resetPassword', authMiddleware, userController.resetPasswordController)
router.delete('/deleteUser/:id', authMiddleware, userController.deleteProfileController)

module.exports = router;
