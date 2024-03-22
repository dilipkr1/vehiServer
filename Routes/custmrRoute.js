
const express = require('express');
const router = express.Router();
const { postCustomer_Deatils, getCustomer_Datails, updateCustomer_Details, deleteCustomer_Details } = require("../controllers/customerController")
const { verifyToken } = require("../controllers/userController")

router.post("/details", postCustomer_Deatils)
router.get('/details', getCustomer_Datails)
router.delete("/delete-customer/:id", deleteCustomer_Details)
router.put("/update/:id",updateCustomer_Details)

module.exports = router;