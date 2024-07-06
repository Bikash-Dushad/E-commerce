const express = require('express');
const router = express.Router();
const cartController = require('../controllers/userCart_controller');

router.get('/addToCart', cartController.addToCart);
router.get('/cartPage', cartController.userCart)

module.exports = router;
