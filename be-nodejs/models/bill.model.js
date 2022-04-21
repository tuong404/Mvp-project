const mongoose = require('mongoose');
const { Schema } = mongoose;

const Wallet = new Schema({
    name: String,
    img: String,
    website: String,
},{timestamps:true});


module.exports = mongoose.model('Wallet', Wallet);