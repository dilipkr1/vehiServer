const mongoose = require("mongoose");


const packageSchema = new mongoose.Schema({
    packageName: {
        type: String,
    },
    packageTitle: {
        type: String,
        unique: true,
    },
    packageDescription: {
        type: String
    },
    packageImg: {
        type: String,
    },
    packagePrice: {
        type: String
    },
    packageDiscount: {
        type: String
    }
})


module.exports = mongoose.model("package", packageSchema)