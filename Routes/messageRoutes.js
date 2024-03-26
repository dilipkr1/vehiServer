
const express = require('express');
const router = express.Router();

const { post_message, post_call } = require('../controllers/messageController')


router.post('/send-message', post_message)
router.post('/send-call', post_call)


module.exports = router;