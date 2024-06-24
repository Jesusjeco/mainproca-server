var express = require('express');
var router = express.Router();
const { getAllClients, getClientById, createClient, updateClient, deleteClient } = require('../controllers/clients.controller');

/* ******************
 * Get routes
 * ******************/
router.get('/', getAllClients);
router.get('/:id', getClientById);

/* ******************
 * Post routes
 * ******************/
router.post('/', createClient);

/* ******************
 * Put routes
 * ******************/
router.put('/:id', updateClient);

/* ******************
 * Delete routes
 * ******************/
router.delete('/:id', deleteClient);

module.exports = router;