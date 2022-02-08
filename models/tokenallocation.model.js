const mongoose = require('mongoose');
const { Schema } = mongoose;

const Tokenallocation = new Schema({
    nameAllocation: String,
    total: Number,
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Tokenallocation', Tokenallocation);