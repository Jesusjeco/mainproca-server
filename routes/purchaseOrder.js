var express = require('express');
var router = express.Router();
const { getAllPurchaseOrders, getPurchaseOrderById, createPurchaseOrder,
  updatePurchaseOrder, deletePurchaseOrder, getPurchaseOrderByProductId, getPurchaseOrderByClientId } = require('../controllers/purchaseOrder.controller');

/* ******************
 * Get routes
 * ******************/
router.get('/', getAllPurchaseOrders);
router.get('/:id', getPurchaseOrderById);

/* ******************
 * Post routes
 * ******************/
router.post('/', createPurchaseOrder);

/* ******************
 * Put routes
 * ******************/
router.put('/:id', updatePurchaseOrder);

/* ******************
 * Delete routes
 * ******************/
router.delete('/:id', deletePurchaseOrder);

/********************
 * Get sell order based on the product Id 
 ********************/
router.get('/product/:productId', getPurchaseOrderByProductId);

/********************
 * Get sell order based on the client Id 
 ********************/
router.get('/client/:clientId', getPurchaseOrderByClientId);

module.exports = router;