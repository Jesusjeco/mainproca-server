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
  description: {
    type: String,
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
