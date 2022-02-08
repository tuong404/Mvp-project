const mongoose = require('mongoose');
const { Schema } = mongoose;

const Project = new Schema({
    name: String,
    img: String,
    description: String,
    price: Number,
    priceChange: Number,
    category: Array,
    rating: Number,
    maketCap: Number,
    volume: Number,
    socialNetwork: Object,
    shortName: String,
    isFavorite: Boolean,
    content: String,
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Project', Project);