const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin_controller')
router.get('/adminPage', adminController.adminPage)
router.get('/orders', adminController.viewOrders);
router.post('/update-order-status', adminController.updateOrderStatus);

module.exports = router;