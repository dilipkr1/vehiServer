
const express = require('express');
const router = express.Router();

const { get_user_orders, get_checkout, post_checkout, update_status } = require('../controllers/OrderController');
const { verifyToken } = require('../controllers/userController')


router.get('/get-details', get_checkout)
router.post("/place-order", post_checkout)
router.get('/user-orders', verifyToken, get_user_orders);
router.put("/update-status/:id", update_status);


module.exports = router;