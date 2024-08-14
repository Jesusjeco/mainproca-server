const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, 'Quantity cannot be less than 0'],
    default: 0 // Default value
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Quantity cannot be less than 0'],
    default: 0 // Default value
  },
  description: {
    type: String,
  }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
