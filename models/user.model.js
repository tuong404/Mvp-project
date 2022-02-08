const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema({
    username: String,
    password: String,
    email: String,
    role: String,
    fullname: String,
    age: Number,
    phone: String,
    address: String,
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', User);