
const express = require('express');
const router = express.Router();

const { post_message } = require('../controllers/messageController')


router.post('/send-message', post_message)

module.exports = router;