const mongoose = require('mongoose');
const { Schema } = mongoose;

const News = new Schema({
    name: String,
    content: String,
    status: Array,
    thumbnail: String,
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('News', News);