const mongoose = require('mongoose');
const { Schema } = mongoose;

const Cart = new Schema({
    name: String,
    img: String,
    color: Array,
    version: Array,
    number: Array,
    amount: Number,
    description: String,
    price: Number,
    discount: Number,
    isStatus: Boolean,
    shortName: String,
    isFavorite: Boolean,
    content: String,
    
},{timestamps:true});

module.exports = mongoose.model('Cart', Cart);