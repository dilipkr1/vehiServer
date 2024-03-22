const WalletTransaction = require("../models/walletTransaModel")

const post_wallet = async (req, res) => {
    try {
        const { customerId, amount, paymentType } = req.body;
        const newTransaction = new WalletTransaction({
            customer: customerId,
            amount: parseFloat(amount),
            paymentType,
        });
        await newTransaction.save();
        res.status(201).json({ message: 'Wallet transaction added successfully' });
    } catch (error) {
        console.error('Error adding wallet transaction:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const get_wallet = async (req, res) => {
    try {
        const trasactionHistory = await WalletTransaction.find();
        if (trasactionHistory) {
            res.status(200).json(trasactionHistory);
        } else {
            res.status(500).json({ success: false, message: "Sorry, there is no any trasnsaction" })
        }
    } catch (error) {
        res.status(404).json({ success: false, message: "Internal Server Error" })
    }
}

module.exports = { post_wallet, get_wallet }