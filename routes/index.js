const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);
router.get('/404', homeController.notFound)

router.use('/users', require('./users'));
router.use('/products', require('./product'))


module.exports = router;