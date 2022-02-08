const mongoose = require('mongoose');
const { Schema } = mongoose;

const Chart = new Schema({
    idProject: String,
    name: String,
    price: Number,
    date: Date,
    time: Date,
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Chart', Chart);