const PurchaseOrder = require('../modules/PurchaseOrder');

const getAllPurchaseOrders = async (req, res, next) => {
  try {
    const purchaseOrdersList = await PurchaseOrder.find({}).sort({ name: 1 });

    res.status(200).json(purchaseOrdersList);
    //console.log(purchaseOrdersList);
  } catch (err) {
    console.error('Error fetching purchaseOrders:', err);
    res.status(500).send('Error fetching purchaseOrders');
  }
}//getAllPurchaseOrders

const getPurchaseOrderById = async (req, res, next) => {
  try {
    const purchaseOrderById = await PurchaseOrder.findById(req.params.id);

    if (!purchaseOrderById) {
      // If no purchaseOrder is found, send a 404 status and error message
      console.log("Error 404 detected");
      return res.status(404).json({ error: 'PurchaseOrder not found' });
    }

    res.status(200).json(purchaseOrderById);
    //console.log(purchaseOrderById);
  } catch (err) {
    console.error('Error fetching purchaseOrder by ID:', err);
    res.status(500).send('Error fetching purchaseOrder by ID');
  }
}

const createPurchaseOrder = async (req, res) => {
  console.log("createPurchaseOrder Route");

  const { clientId, products, totalAmount } = req.body;
  console.log('clientId:', clientId);

  try {// Create a new document
    //const newPurchaseOrder = new PurchaseOrder({ name: "Another Weesley333" });
    const newPurchaseOrder = new PurchaseOrder(req.body);
    // Save the document
    const savedPurchaseOrder = await newPurchaseOrder.save();

    res.status(201).send('Test purchaseOrder name saved successfully');
  } catch (err) {
    console.error('Error saving document:', err);
    res.status(500).send('Error saving document');
  }
}

const updatePurchaseOrder = async function (req, res, next) {
  try {
    const { id } = req.params;

    const purchaseOrderToupdate = await PurchaseOrder.findByIdAndUpdate(id, req.body);
    if (!purchaseOrderToupdate) {
      res.status(404).send('Document not found by ID');
    }

    const updatedPurchaseOrder = await PurchaseOrder.findById(id);
    //res.status(200).send('PurchaseOrder updated... I guess?');
    res.status(200).send(updatedPurchaseOrder);

  } catch (err) {
    console.error('Error updating document:', err);
    res.status(500).send('Error updating document');
  }
}

const deletePurchaseOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPurchaseOrder = await PurchaseOrder.findByIdAndDelete(id);

    if (!deletedPurchaseOrder) {
      return res.status(404).send('PurchaseOrder not found');
    }

    res.send(`PurchaseOrder with ID ${id} has been deleted`);
  } catch (err) {
    console.error('Error deleting purchaseOrder:', err);
    res.status(500).send('Error deleting purchaseOrder');
  }
}

module.exports = {
  getAllPurchaseOrders, getPurchaseOrderById, createPurchaseOrder, updatePurchaseOrder, deletePurchaseOrder
}
