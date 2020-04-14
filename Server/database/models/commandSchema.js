// @ts-check
let mongoose = require('mongoose');

let commandSchema = new mongoose.Schema({
    "enabled":{
        type: Boolean,
    },
    "commandName": {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    "userLevel": {
        type: String,
        lowercase: true,
    },
    "message": {
        type: String,
        required: true,
    },
    "gcd": {
        type: Number,
        required: true
    },
    "ucd": {
        type: Number,
        required: true
    },
    "users": [
        {
            "username": {
                type: String,

            },
            "useTime": {
                type: Date,

            }
        }
    ],
    "lastRedeemedTime": {
        type: Date,

    },
    
})

module.exports = mongoose.model('command' ,commandSchema)