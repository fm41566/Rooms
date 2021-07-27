const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://mern:fjalkalimi.1@cluster0.ghlyh.mongodb.net/mern-rooms'

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true })

var connection = mongoose.connection

connection.on('error', () => {
    console.log('Mongo DB Connection failed')
})

connection.on('connected', () => {
    console.log('Mongo DB Connection Successful')
})

module.exports = mongoose