const mongoose = require("mongoose")

const users = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: [true, "email already exists"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password!"],
        unique:false,
    },
    name:{
        type: String
    },
    role:{
        type: String
    },
    evaluationdetail: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Evaluation"
        }
    ],
    evaluationRating: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Rating"
        }
    ],
    escalationdetail: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Escalation"
        }
    ],
    ppc:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ppc"
        }
    ]
})

module.exports = mongoose.model('User',users)
