const express = require('express');
const router = express.Router();
const cartController = require('../controllers/userCart_controller');
const passport = require('passport')

router.get('/addToCart', passport.checkAuthentication, cartController.addToCart);
router.get('/cartPage', passport.checkAuthentication, cartController.getCart)
router.get('/deleteFromCart', passport.checkAuthentication, cartController.deleteFromCart);

module.exports = router;
