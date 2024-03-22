const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    selectedReason: { type: String }
});



module.exports = mongoose.model('Message', messageSchema);

