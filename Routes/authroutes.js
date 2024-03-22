
const express = require('express');
const router = express.Router();
const { Login, verifyToken, Register, getUser, sendOtp, verifyOtpAndStore } = require("../controllers/userController");

router.post("/register", Register)
router.post("/login", Login);
router.get("/users", verifyToken, getUser)
router.post('/sendOtp', sendOtp);
router.post('/verify-otp', verifyOtpAndStore);
 

module.exports = router;