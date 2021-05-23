const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let UserSchema = Schema ({
    firstname: {
        type: String,
        required: true,
        max: 100
    },
    lastname: {
        type: String,
        max: 100
    },
    username: {
        type: String,
        required: true,
        min: 8,
        max: 20
    },
    id_type: {
        type: String,
        required: true,
    },
    _id: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    photo: {
        type: String,
        max: 500
    },
    active: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('User', UserSchema);