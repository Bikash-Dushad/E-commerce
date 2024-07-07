const express = require('express')
const router = express.Router();
const orderController = require('../controllers/order_controller');

router.get('/orderpage',orderController.orderPage)
router.post('/placeOrder', orderController.createOrder)

module.exports = router;