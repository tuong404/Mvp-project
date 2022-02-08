const mongoose = require('mongoose');
const { Schema } = mongoose;

const Metrics = new Schema({
    marketCap: Number,
    volumne: Number,
    timeHigh: Number,
    timeLow: Number,
    idProject: String,
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Metrics', Metrics);