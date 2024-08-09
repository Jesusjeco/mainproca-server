var express = require('express');
var router = express.Router();
const { getAllPurchaseOrders, getPurchaseOrderById, createPurchaseOrder, updatePurchaseOrder, deletePurchaseOrder } = require('../controllers/purchaseOrder.controller');

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

module.exports = router;