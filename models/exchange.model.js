const mongoose = require('mongoose');
const { Schema } = mongoose;

const Exchange = new Schema({
    name: String,
    img: String,
    status: Array,
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Exchange', Exchange);