const express = require('express');
const router = express.Router();
const cartController = require('../controllers/userCart_controller');

router.get('/addToCart', cartController.addToCart);

module.exports = router;
