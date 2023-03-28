const mongoose = require('mongoose');

async function connect() {
    try {
        //mongodb://localhost:27017/
        //mongodb+srv://dacn:Mcndctbc2001@cluster0.1hoz6es.mongodb.net/node_QLNS
        await mongoose.connect('mongodb+srv://dacn:Mcndctbc2001@cluster0.1hoz6es.mongodb.net/node_QLNS');
        console.log('Connect successfully!!!');
    } catch (error) {
        console.log('Connect failure!!!');
    }
}

module.exports = { connect };


