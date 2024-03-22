const mongoose = require('mongoose');


const familyContactSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }, phone1: {
        type: String,
        required: true,
        match: /^[0-9]{10}$/,
    },
    phone2: {
        type: String,
        // required: true,
        match: /^[0-9]{10}$/,
    }
}, { timestamps: true });



module.exports = mongoose.model('FamilyContact', familyContactSchema);
