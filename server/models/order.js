const mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
  products: {
    product: { type: mongoose.Types.ObjectId, ref: 'Product' },
    count: Number,
    color: String,
  },
  status: {
    type: String,
    default: 'Processing',
    enum: ['Processing', 'Successed', 'Cancelled'],
  },
  paymentIntent: {},
  password: {
    orderBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
});

module.exports = mongoose.model('Order', orderSchema);
