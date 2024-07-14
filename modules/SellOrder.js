const mongoose = require('mongoose');

const sellOrderSchema = new mongoose.Schema({
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
        min: [1, 'Quantity cannot be less than 1']
      }
    }
  ],
  orderDate: {
    type: Date,
    default: Date.now
  },
  totalPrice: {
    type: Number,
    required: true,
    min: [0, 'Total amount cannot be less than 0']
  }
});

const SellOrder = mongoose.model('SellOrder', sellOrderSchema);

module.exports = SellOrder;
