const express = require("express")
const Package = require("../models/packageModel")


const post_package = async (req, res) => {
    try {
        const newPackage = new Package({
            ...req.body
        })
        if (newPackage) {
            await newPackage.save();
            res.status(200).json({ sucees: true, message: newPackage })
        }
    } catch (error) {
        res.status(404).json({ succes: false, message: "Oops:", error })
    }
}

const get_package = async (req, res) => {
    try {
        const packages = await Package.find()
        if (packages) {
            res.status(200).json(packages)
        } else {
            res.status(201).json({ succes: false, message: "Oops: ther is no any packags", })
        }
    } catch (error) {
        res.status(404).json({ success: false, message: "Internal Server Error" })
    }
}

const update_package = async (req, res) => {
    const packageId = req.params.id
    const updatedPackageData = req.body;
    try {
        const existingPackage = await Package.findById(packageId);
        if (!existingPackage) {
            res.status(400).json({ success: false, message: "Package not found" });
        }
        Object.assign(existingPackage, updatedPackageData);
        await existingPackage.save();
        res.status(200).json({ success: true, message: "Package updated successfully" });
    } catch (error) {
        console.error("Error updating package:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


const delete_package = async (req, res) => {
    try {
        const deleteReqPackage = await Package.deleteOne({ _id: req.params.id })
        if (deleteReqPackage.deletedCount === 0) {
            res.status(201).json({ success: false, message: "package not found" })
        } else {
            res.status(200).json({ success: true, message: "Package Deleted successfully" })
        }
    } catch (error) {
        res.status(404).json({ success: false, message: "Internal Server Error" })
    }
}
module.exports = { post_package, get_package, update_package, delete_package }