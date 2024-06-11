const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const foodController = require('../controllers/foodController')
const adminMiddleware = require('../middleware/adminMiddleware')

router.post('/create', authMiddleware, foodController.createFoodController)
router.get('/getAll', foodController.getAllFoodController);
router.get('/get/:id',foodController.getSingleFoodController)
router.get("/getByResturant/:id", foodController.getFoodByResturantController)
router.put('/update/:id', authMiddleware, foodController.updateFoodController)
router.delete('/delete/:id', authMiddleware, foodController.deleteFoodController);

//place order
router.post('/placeOrder', authMiddleware, foodController.placeOrderController)

router.post("/orderStatus/:id",authMiddleware,adminMiddleware, foodController.orderStatusController);
module.exports = router;
