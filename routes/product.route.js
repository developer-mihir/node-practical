const express = require('express');
const router = express.Router();
const productController = require('../controller/product.controller.js');
const {isAdmin} = require('../helper.js');

router.get('/', isAdmin, productController.getAll);
router.get('/:id', isAdmin, productController.getOne);
router.post('/', isAdmin, productController.create);
router.post('/:id', isAdmin, productController.update);

module.exports = router;