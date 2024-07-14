const SellOrder = require('../modules/SellOrder');

const getAllSellOrders = async (req, res, next) => {
  try {
    const sellOrdersList = await SellOrder.find({}).sort({ orderDate: -1 });

    res.status(200).json(sellOrdersList);
    //console.log(sellOrdersList);
  } catch (err) {
    console.error('Error fetching sellOrders:', err);
    res.status(500).send('Error fetching sellOrders');
  }
}//getAllSellOrders

const getSellOrderById = async (req, res, next) => {
  try {
    const sellOrderById = await SellOrder.findById(req.params.id);

    if (!sellOrderById) {
      // If no sellOrder is found, send a 404 status and error message
      console.log("Error 404 detected");
      return res.status(404).json({ error: 'SellOrder not found' });
    }

    res.status(200).json(sellOrderById);
    //console.log(sellOrderById);
  } catch (err) {
    console.error('Error fetching sellOrder by ID:', err);
    res.status(500).send('Error fetching sellOrder by ID');
  }
}

const createSellOrder = async (req, res) => {

  try {// Create a new document
    const newSellOrder = new SellOrder(req.body);
    // Save the document
    const savedSellOrder = await newSellOrder.save();

    res.status(201).send('SellOrder name saved successfully');
  } catch (err) {
    console.error('Error saving document:', err);
    res.status(500).send('Error saving document');
  }
}

const updateSellOrder = async function (req, res, next) {
  try {
    const { id } = req.params;

    const sellOrderToupdate = await SellOrder.findByIdAndUpdate(id, req.body);
    if (!sellOrderToupdate) {
      res.status(404).send('Document not found by ID');
    }

    const updatedSellOrder = await SellOrder.findById(id);
    //res.status(200).send('SellOrder updated... I guess?');
    res.status(200).send(updatedSellOrder);

  } catch (err) {
    console.error('Error updating document:', err);
    res.status(500).send('Error updating document');
  }
}

const deleteSellOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSellOrder = await SellOrder.findByIdAndDelete(id);

    if (!deletedSellOrder) {
      return res.status(404).send('SellOrder not found');
    }

    res.send(`SellOrder with ID ${id} has been deleted`);
  } catch (err) {
    console.error('Error deleting sellOrder:', err);
    res.status(500).send('Error deleting sellOrder');
  }
}

module.exports = {
  getAllSellOrders, getSellOrderById, createSellOrder, updateSellOrder, deleteSellOrder
}
