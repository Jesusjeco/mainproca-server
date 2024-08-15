const Product = require('../schemes/Product');
const PurchaseOrder = require('../schemes/PurchaseOrder');

const getAllPurchaseOrders = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const purchaseOrdersList = await PurchaseOrder.find({})
      .sort({ orderDate: -1 })
      .skip(skip)
      .limit(limit);

    const totalPurchaseOrders = await PurchaseOrder.countDocuments({});
    const totalPages = Math.ceil(totalPurchaseOrders / limit);

    res.status(200).json({
      purchaseOrders: purchaseOrdersList,
      totalPages,
      currentPage: page
    });
  } catch (err) {
    console.error('Error fetching purchaseOrders:', err);
    res.status(500).send('Error fetching purchaseOrders');
  }
}

const getPurchaseOrderById = async (req, res, next) => {
  try {
    const purchaseOrderById = await PurchaseOrder.findById(req.params.id);

    if (!purchaseOrderById) {
      return res.status(404).json({ error: 'PurchaseOrder not found' });
    }

    res.status(200).json(purchaseOrderById);
  } catch (err) {
    console.error('Error fetching purchaseOrder by ID:', err);
    res.status(500).send('Error fetching purchaseOrder by ID');
  }
}//getPurchaseOrderById

const createPurchaseOrder = async (req, res) => {
  const { orderNumber, client_id, orderDate, productsOrder, description } = req.body;

  try {
    // Validate product exists
    for (const { product_id } of productsOrder) {
      const product = await Product.findById(product_id);
      if (!product) {
        return res.status(400).json({ error: 'Product not found using productID: ' + product_id });
      }
    }

    // Create purchase order
    const newPurchaseOrder = new PurchaseOrder({ orderNumber, client_id, orderDate, productsOrder, description });
    const savedPurchaseOrder = await newPurchaseOrder.save();

    // Update product quantities
    for (const { product_id, quantity } of productsOrder) {
      await Product.findByIdAndUpdate(product_id, { $inc: { quantity: quantity } });
    }

    res.status(201).send(savedPurchaseOrder);
  } catch (err) {
    console.error('Error saving document:', err);
    res.status(500).send('Error saving document');
  }
}//createPurchaseOrder

const updatePurchaseOrder = async (req, res) => {
  const { id } = req.params;
  const { orderNumber, client_id, orderDate, productsOrder, description } = req.body;

  try {
    // Fetch the existing purchase order
    const existingOrder = await PurchaseOrder.findById(id);
    if (!existingOrder) {
      return res.status(404).json({ error: 'PurchaseOrder not found' });
    }

    // Calculate the difference in product quantities
    const productDifferences = {};

    // Reduce quantities based on existing order
    for (const { product_id, quantity } of existingOrder.productsOrder) {
      if (!productDifferences[product_id]) {
        productDifferences[product_id] = 0;
      }
      productDifferences[product_id] -= quantity;
    }

    // Add quantities based on updated order
    for (const { product_id, quantity } of productsOrder) {
      if (!productDifferences[product_id]) {
        productDifferences[product_id] = 0;
      }
      productDifferences[product_id] += quantity;
    }

    // Update the inventory
    for (const product_id in productDifferences) {
      const difference = productDifferences[product_id];
      const product = await Product.findById(product_id);
      if (!product) {
        return res.status(400).json({ error: 'Product not found using productID: ' + product_id });
      }
      await Product.findByIdAndUpdate(product_id, { $inc: { quantity: difference } });
    }

    // Update the sell order
    const updatedOrder = await PurchaseOrder.findByIdAndUpdate(id, { orderNumber, client_id, orderDate, productsOrder, description }, { new: true });

    res.status(200).send(updatedOrder);
  } catch (err) {
    console.error('Error updating sell order:', err);
    res.status(500).send('Error updating sell order');
  }
}//updatePurchaseOrder

const deletePurchaseOrder = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the existing sell order
    const existingOrder = await PurchaseOrder.findById(id);
    if (!existingOrder) {
      return res.status(404).json({ error: 'PurchaseOrder not found' });
    }

    // Restore the product quantities
    for (const { product_id, quantity } of existingOrder.productsOrder) {
      await Product.findByIdAndUpdate(product_id, { $inc: { quantity: -quantity } });
    }

    // Delete the sell order
    const deletedPurchaseOrder = await PurchaseOrder.findByIdAndDelete(id);

    if (!deletedPurchaseOrder) {
      return res.status(404).send('PurchaseOrder not found');
    }

    res.send(deletedPurchaseOrder);
  } catch (err) {
    console.error('Error deleting purchaseOrder:', err);
    res.status(500).send('Error deleting purchaseOrder');
  }
}//deletePurchaseOrder

// Function to get PurchaseOrders by product ID
const getPurchaseOrderByProductId = async (req, res) => {
  const { productId } = req.params;

  try {
    const purchaseOrdersList = await PurchaseOrder.find({ 'productsOrder.product_id': productId })
      .sort({ orderDate: -1 })
      .limit(5);

    res.status(200).json(purchaseOrdersList);
  } catch (err) {
    console.error('Error fetching purchase order by product ID:', err);
    res.status(500).send('Error fetching purchase order by product ID');
  }
}

// Function to get PurchaseOrders by client ID
const getPurchaseOrderByClientId = async (req, res) => {
  const { clientId } = req.params;

  try {
    const purchaseOrdersList = await PurchaseOrder.find({ 'client_id': clientId })
      .sort({ orderDate: -1 })
      .limit(5);

    res.status(200).json(purchaseOrdersList);
  } catch (err) {
    console.error('Error fetching purchase order by product ID:', err);
    res.status(500).send('Error fetching purchase order by product ID');
  }
}

module.exports = {
  getAllPurchaseOrders,
  getPurchaseOrderById,
  createPurchaseOrder,
  updatePurchaseOrder,
  deletePurchaseOrder,
  getPurchaseOrderByProductId,
  getPurchaseOrderByClientId
};