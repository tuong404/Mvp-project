const mongoose = require('mongoose');
const { Schema } = mongoose;

const Categories = new Schema({
    name: String,
    descriptions: String,
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Categories', Categories);