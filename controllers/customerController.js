
const express = require('express');
const Customer = require('../models/custmrModel')

const postCustomer_Deatils = async (req, res) => {
    try {
        const newCustomer = new Customer({
            customerName: req.body.customerName,
            customerPhone: req.body.customerPhone,
            customerEmail: req.body.customerEmail,
            customerAddress: req.body.customerAddress
        });
        const customer = await newCustomer.save();
        res.status(200).json(customer);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation error', error: error.message });
        }
        console.error('Error saving customer details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const getCustomer_Datails = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (error) {
        console.error('Error fetching customer data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteCustomer_Details = async (req, res) => {
    try {
        const deleteCustomer = await Customer.deleteOne({ _id: req.params.id })
        if (deleteCustomer.deletedCount === 0) {
            return res.status(400).json({ message: "Customer Not Found" })
        } else {
            res.status(200).json({ message: "Deleted successfully" })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const updateCustomer_Details = async (req, res) => {
    const userId = req.params.id;
    const updateCustomer = req.body;

    try {
        const existingCustomer = await Customer.findById(userId);

        if (!existingCustomer) {
            return res.status(400).json({ success: false, message: "Customer not found" });
        }

        Object.assign(existingCustomer, updateCustomer);
        await existingCustomer.save();

        return res.status(200).json({ success: true, message: "Customer details updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}




module.exports = { postCustomer_Deatils, getCustomer_Datails, updateCustomer_Details, deleteCustomer_Details };