var express = require('express');
var router = express.Router();
const { getAllSellOrders, getSellOrderById, createSellOrder, updateSellOrder,
  deleteSellOrder, getSellOrderByProductId, getSellOrderByClientId } = require('../controllers/sellOrder.controller');

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

/********************
 * Get sell order based on the product Id 
 ********************/
router.get('/product/:productId', getSellOrderByProductId);

/********************
 * Get sell order based on the client Id 
 ********************/
router.get('/client/:clientId', getSellOrderByClientId);

module.exports = router;