const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    mobileNumber: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '50m'
    }
});

const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;
