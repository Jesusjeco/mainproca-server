const Product = require('../schemes/Product');
const SellOrder = require('../schemes/SellOrder');

const getAllSellOrders = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const sellOrdersList = await SellOrder.find({})
      .sort({ orderDate: -1 })
      .skip(skip)
      .limit(limit);

    const totalSellOrders = await SellOrder.countDocuments({});
    const totalPages = Math.ceil(totalSellOrders / limit);

    res.status(200).json({
      sellOrders: sellOrdersList,
      totalPages,
      currentPage: page
    });
  } catch (err) {
    console.error('Error fetching sellOrders:', err);
    res.status(500).send('Error fetching sellOrders');
  }
};


const getSellOrderById = async (req, res, next) => {
  try {
    const sellOrderById = await SellOrder.findById(req.params.id);

    if (!sellOrderById) {
      return res.status(404).json({ error: 'SellOrder not found' });
    }

    res.status(200).json(sellOrderById);
  } catch (err) {
    console.error('Error fetching sellOrder by ID:', err);
    res.status(500).send('Error fetching sellOrder by ID');
  }
}//getSellOrderById

const createSellOrder = async (req, res) => {
  const { client_id, orderDate, address, products, subTotal, total } = req.body;

  try {
    // Validate product quantities
    for (const { product_id, quantity } of products) {
      const product = await Product.findById(product_id);
      if (!product) {
        return res.status(400).json({ error: 'Product not found using productID: ' + product_id });
      }
    }

    // Create sell order
    const newSellOrder = new SellOrder({ client_id, orderDate, address, products, subTotal, total });
    const savedSellOrder = await newSellOrder.save();

    // Update product quantities
    for (const { product_id, quantity } of products) {
      await Product.findByIdAndUpdate(product_id, { $inc: { quantity: -quantity } });
    }

    res.status(201).send(savedSellOrder);
  } catch (err) {
    console.error('Error saving document:', err);
    res.status(500).send('Error saving document');
  }
}//createSellOrder

const updateSellOrder = async (req, res) => {
  const { id } = req.params;
  const { client_id, orderDate, address, products, subTotal, total } = req.body;

  try {
    // Fetch the existing sell order
    const existingOrder = await SellOrder.findById(id);
    if (!existingOrder) {
      return res.status(404).json({ error: 'SellOrder not found' });
    }

    // Calculate the difference in product quantities
    const productDifferences = {};

    // Reduce quantities based on existing order
    for (const { product_id, quantity } of existingOrder.products) {
      if (!productDifferences[product_id]) {
        productDifferences[product_id] = 0;
      }
      productDifferences[product_id] -= quantity;
    }

    // Add quantities based on updated order
    for (const { product_id, quantity } of products) {
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
      await Product.findByIdAndUpdate(product_id, { $inc: { quantity: -difference } });
    }

    // Update the sell order
    const updatedOrder = await SellOrder.findByIdAndUpdate(id, { client_id, orderDate, address, products, subTotal, total }, { new: true });

    res.status(200).send(updatedOrder);
  } catch (err) {
    console.error('Error updating sell order:', err);
    res.status(500).send('Error updating sell order');
  }
}//updateSellOrder

const deleteSellOrder = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the existing sell order
    const existingOrder = await SellOrder.findById(id);
    if (!existingOrder) {
      return res.status(404).json({ error: 'SellOrder not found' });
    }

    // Restore the product quantities
    for (const { product_id, quantity } of existingOrder.products) {
      await Product.findByIdAndUpdate(product_id, { $inc: { quantity: quantity } });
    }

    // Delete the sell order
    const deletedSellOrder = await SellOrder.findByIdAndDelete(id);

    if (!deletedSellOrder) {
      return res.status(404).send('SellOrder not found');
    }

    res.send(deletedSellOrder);
  } catch (err) {
    console.error('Error deleting sellOrder:', err);
    res.status(500).send('Error deleting sellOrder');
  }
}//deleteSellOrder

// Function to get SellOrders by product ID
const getSellOrderByProductId = async (req, res) => {
  const { productId } = req.params;

  try {
    const sellOrdersList = await SellOrder.find({ 'products.product_id': productId })
      .sort({ orderDate: -1 })
      .limit(5);

    res.status(200).json(sellOrdersList);
  } catch (err) {
    console.error('Error fetching sell orders by product ID:', err);
    res.status(500).send('Error fetching sell orders by product ID');
  }
};

// Function to get SellOrders by client ID
const getSellOrderByClientId = async (req, res) => {
  const { clientId } = req.params;
  
  try {
    const sellOrdersList = await SellOrder.find({ 'client_id': clientId })
      .sort({ orderDate: -1 })
      .limit(5);

    res.status(200).json(sellOrdersList);
  } catch (err) {
    console.error('Error fetching sell orders by product ID:', err);
    res.status(500).send('Error fetching sell orders by product ID');
  }
};
 
module.exports = {
  getAllSellOrders,
  getSellOrderById,
  createSellOrder,
  updateSellOrder,
  deleteSellOrder,
  getSellOrderByProductId,
  getSellOrderByClientId
};