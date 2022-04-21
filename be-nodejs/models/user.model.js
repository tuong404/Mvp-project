const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
// const uniqueValidator = require('mongoose-unique-validator');

const User  = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        // trim: true
    },
    password: {
        type: String,
        required: true,
        // minLength: 7
    },
    email: {
        type: String,
    },
    role: String,
    avatar: String,
    fullname: String,
    age: Number,
    phone: String,
    address: String,
    // tokens: [{
    //     token: {
    //         type: String,
    //         required: true
    //     }
    // }],
},{timestamps:true});

// User.plugin(uniqueValidator, { message: 'User already in use' });
module.exports = mongoose.model('User', User );