const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(process.env.DB_HOST);
        console.log('Connect Successfull!!');
    } catch (err) {
        console.log('Connect Fail!!');
    }
};

module.exports = { connect };