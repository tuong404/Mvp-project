const mongoose = require('mongoose');
const { Schema } = mongoose;

const Submit = new Schema({
    title: String,
    Category: Array,
    sortIntroduction: { type: String, maxLength: 256 },
    detailDescription: String,
    logo: String,
    website: String,
    email: String,
    twiter: String,
    telegram: String,
    element: String,
    github: String,
    coinMaketCap: Number,
    coinGecko: Number,
    subsocial: String,
    officalToken: String,
    ParentChain: Array,
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Submit', Submit);