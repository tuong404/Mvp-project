const mongoose = require('mongoose');
const { Schema } = mongoose;

const Tokecirculation = new Schema({
    nameCirculation: String,
    total: Number,
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Tokecirculation', Tokecirculation);