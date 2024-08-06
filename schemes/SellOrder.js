const mongoose = require('mongoose');
const OrderCounter = require('./orderCounter');

const sellOrderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true
  },
  client_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  address: {
    type: String,
    required: true,
  },
  products: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      price: {
        type: Number,
        required: true,
        min: [0.01, 'Price cannot be less than 0']
      },
      quantity: {
        type: Number,
        required: true,
        min: [0, 'Quantity cannot be less than 1']
      }
    }
  ],
  orderDate: {
    type: Date,
    default: Date.now
  },
  subTotal: {
    type: Number,
    required: true,
    min: [0, 'Sub total cannot be less than 0']
  },
  total: {
    type: Number,
    required: true,
    min: [0, 'Total amount cannot be less than 0']
  }
});

sellOrderSchema.pre('save', async function (next) {
  const order = this;
  const currentDate = new Date();
  const dateString = `${String(currentDate.getDate()).padStart(2, '0')}${String(currentDate.getMonth() + 1).padStart(2, '0')}${String(currentDate.getFullYear()).slice(-2)}`;

  try {
    // Find and update the order counter for the current date
    const counter = await OrderCounter.findOneAndUpdate(
      { date: dateString },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const orderNumber = `${dateString}-${counter.seq}`;
    order.orderNumber = orderNumber;
    next();
  } catch (error) {
    next(error);
  }
});

const SellOrder = mongoose.model('SellOrder', sellOrderSchema);

module.exports = SellOrder;
