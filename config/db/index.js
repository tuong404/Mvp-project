const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/mvp-project');
        console.log('Connect Successfull!!');
    } catch (err) {
        console.log('Connect Fail!!');
    }
};

module.exports = { connect };