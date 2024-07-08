const express = require('express')
const router = express.Router();
const orderController = require('../controllers/order_controller');
const passport = require('passport')

router.get('/orderpage', passport.checkAuthentication, orderController.orderPage)
router.post('/placeOrder', passport.checkAuthentication, orderController.createOrder)

module.exports = router;