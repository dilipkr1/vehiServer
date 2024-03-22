const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({

    orderId: {
        type: String,
        required: true,
        unique: true
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'package',
    },
    totalDiscount: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }, createdAt: {
        type: Date,
        default: Date.now
    },
    uid: {
        type: String,
        unique: true
    }

}
);



const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true,
    },
    cartItems: [cartItemSchema],
    subTotal: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Order Received', 'Order Dispatched', 'Order Delivered', 'Activated'],
        default: 'Order Received'
    }
    ,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);
