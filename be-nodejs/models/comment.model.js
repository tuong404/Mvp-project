const mongoose = require('mongoose');
const { Schema } = mongoose;

const Comment = new Schema({
    name: String,
    avatar: String,
    content: String,
},{timestamps:true});

module.exports = mongoose.model('Comment', Comment);