const express = require('express');
const router = express.Router();
const { post_wallet, get_wallet } = require("../controllers/walletController")


router.post("/add-money", post_wallet)
router.get("/transactions", get_wallet)

module.exports =  router 