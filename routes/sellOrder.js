var express = require('express');
var router = express.Router();
const { getAllSellOrders, getSellOrderById, createSellOrder, updateSellOrder, deleteSellOrder } = require('../controllers/sellOrder.controller');

/* ******************
 * Get routes
 * ******************/
router.get('/', getAllSellOrders);
router.get('/:id', getSellOrderById);

/* ******************
 * Post routes
 * ******************/
router.post('/', createSellOrder);

/* ******************
 * Put routes
 * ******************/
router.put('/:id', updateSellOrder);

/* ******************
 * Delete routes
 * ******************/
router.delete('/:id', deleteSellOrder);

module.exports = router;