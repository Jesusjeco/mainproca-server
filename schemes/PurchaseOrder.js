const mongoose = require('mongoose');

const purchaseOrderSchema = new mongoose.Schema({
  orderNumber: {
    type: String
  },
  client_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  productsOrder: [
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
  description: {
    type: String,
  }
}, { timestamps: true });

const PurchaseOrder = mongoose.model('PurchaseOrder', purchaseOrderSchema);

module.exports = PurchaseOrder;
