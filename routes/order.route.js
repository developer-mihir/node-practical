const express = require('express');
const router = express.Router();
const {isAdmin} = require('../helper.js');
const orderController = require('../controller/order.controller.js');

// Admin routes
router.get('/admin', isAdmin, orderController.getAllByAdmin);
router.get('/admin/:id', isAdmin, orderController.getOneByAdmin);

// User routes
router.get('/', orderController.getAllByUser);
router.get('/:id', orderController.getOneByUser);
router.post('/', orderController.createOrder);
module.exports = router;