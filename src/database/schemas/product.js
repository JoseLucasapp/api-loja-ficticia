const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: mongoose.Types.Decimal128
    },
    image_url: {
        type: String
    },
    category: {
        type: String
    },
    description: {
        type: String
    }
})

module.exports = mongoose.model('products', productSchema)