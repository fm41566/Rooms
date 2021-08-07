const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://mern:fjalkalimi.1@cluster0.ghlyh.mongodb.net/mern-rooms'

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true })

var dbconnect = mongoose.connection

dbconnect.on('error', () => {
    console.log(`Mongo DB Connection Failed`);
})

dbconnect.on('connected', () => {
    console.log(`Mongo DB Connection Successfull`);
})

module.exports = mongoose