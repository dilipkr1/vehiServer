const mongoose = require('mongoose')


const settingBusinessSchema = new mongoose.Schema({
    businessName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        // unique: true,
        required: true
    },
    phone: {
        type: String,
        // unique: true,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    businessImage:{
        type: String,
        required: false
    }
    
})



module.exports = mongoose.model('BusinessDetails', settingBusinessSchema)