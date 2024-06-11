const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const foodController = require('../controllers/foodController')

router.post('/create', authMiddleware, foodController.createFoodController)
router.get('/getAll', foodController.getAllFoodController);
router.get('/get/:id',foodController.getSingleFoodController)
router.get("/getByResturant/:id", foodController.getFoodByResturantController)
router.put('/update/:id', authMiddleware, foodController.updateFoodController)
router.delete('/delete/:id', authMiddleware, foodController.deleteFoodController);
module.exports = router;
