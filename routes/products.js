var express = require('express');
var router = express.Router();
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getProductsIdsAndNames } = require('../controllers/products.controller');

/* ******************
 * Get routes
 * ******************/
router.get('/', getAllProducts);
router.get('/:id', getProductById);

/* ******************
 * Post routes
 * ******************/
router.post('/', createProduct);

/* ******************
 * Put routes
 * ******************/
router.put('/:id', updateProduct);

/* ******************
 * Delete routes
 * ******************/
router.delete('/:id', deleteProduct);

/********************
 * Custom routes
 ********************/
router.post('/IdsAndNames', getProductsIdsAndNames);

module.exports = router;