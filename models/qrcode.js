const mongoose = require('mongoose');


const qrCodeSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    customerNumbers: [{ type: String, required: true }]
});



module.exports = mongoose.model('QRCode', qrCodeSchema);
