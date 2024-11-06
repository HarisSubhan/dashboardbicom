const mongoose = require('mongoose')

const notification = new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    userName:{
        type:String,
        required:[true,"field is require"]
    },
    description:{
        type:String,
        required:[true,"field is required"]
    },
    lastActive: {
        type:Date,
        default:new Date()
    }
}) 

module.exports = mongoose.model('Notification',notification)