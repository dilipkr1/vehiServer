const mongoose = require('mongoose')
const WalletTransaction = require("../models/walletTransaModel")

const customerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    customerName: {
        type: String,
    },
    customerEmail: {
        type: String,
        unique: true
    },
    customerPhone: {
        type: Number,
    },
    customerAddress: {
        type: String,
    },
    phone1: {
        type: String,
        match: /^[0-9]{10}$/,
    },
    phone2: {
        type: String,
        // required: true,
        match: /^[0-9]{10}$/,
    },
    role: {
        type: String,
        default: 'user'
    }
},
    {
        timestamps: true
    })

customerSchema.pre('remove', async function (next) {
    try {
        await WalletTransaction.deleteMany({ customer: this._id });
        next();
    } catch (error) {
        next(error);
    }
});



module.exports = mongoose.model('Customer', customerSchema)