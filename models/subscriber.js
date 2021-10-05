//é em models que o node conversa com o mongo, será armanezado em Bison 

const mongoose = require('mongoose')

const subscriberSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userChannel: {
        type: String,
        required: true
    },
    userData: {
        type: Date,
        required: true,
        default: Date.now
    }
})


module.exports = mongoose.model('Subscriber', subscriberSchema)