const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {     // Changed from Location to location
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {     // Changed from Password to password
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('user', UserSchema)