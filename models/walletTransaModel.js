const mongoose = require('mongoose');

const walletTransactionSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentType: {
    type: String,
    enum: ["credit", "debit"]
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const WalletTransaction = mongoose.model('WalletTransaction', walletTransactionSchema);

module.exports = WalletTransaction;
