const express = require('express');
const router = express.Router();
const resturantController = require('../controllers/resturantController')
const authMiddleware = require('../middleware/authMiddleware')

router.post("/create", authMiddleware, resturantController.createResturantController)
router.get("/getAll", resturantController.getAllResturantController)
router.get("/get/:id", resturantController.getResturantByIdControlller)
router.delete('/delete/:id', authMiddleware, resturantController.deleteResturantController)
module.exports = router;
