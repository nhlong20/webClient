const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    products: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: [true, 'Order must contain a Product!'],
    }],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Order must belong to a User!']
    },
    totalPrice: {
        type: Number,
        require: [true, 'Order must have a price.']
    },
    orderDate: {
        type: Date,
        default: Date.now()
    },
    paid: {
        type: Boolean,
        default: true
    },
    status: {
        type: String,
        require: false
    }

}, {timestamps:true});

orderSchema.pre(/^find/, function(next) {
    this.populate({
      path: 'products',
    });
    next();
  });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;