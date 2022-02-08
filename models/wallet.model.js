const mongoose = require('mongoose');
const { Schema } = mongoose;

const Wallet = new Schema({
    name: String,
    img: String,
    website: String,
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Wallet', Wallet);