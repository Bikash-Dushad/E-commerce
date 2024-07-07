const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);

router.use('/users', require('./users'));
router.use('/cart', require('./userCart'))
router.use('/products', require('./product'))
router.use('/orders', require('./orders'))
router.use('/admin', require('./admin'))

module.exports = router;