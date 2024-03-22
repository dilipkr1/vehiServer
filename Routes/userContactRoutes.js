
const express = require('express');
const router = express.Router();
const {  updateFamilyContact } = require("../controllers/userContactController");

 
router.put('/update-number', updateFamilyContact) 


module.exports = router;