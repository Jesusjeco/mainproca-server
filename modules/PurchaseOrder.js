const mongoose = require('mongoose');

const purchaseOrderSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
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

const PurchaseOrder = mongoose.model('PurchaseOrder', purchaseOrderSchema);

module.exports = PurchaseOrder;
