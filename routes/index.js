const express = require('express');
const router = express.Router();
const orderRoute = require('./order.route.js');
const productRoute = require('./product.route.js');

router.use('/order', orderRoute);
router.use('/product', productRoute);

module.exports = router;