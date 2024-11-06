const mongoose = require('mongoose')

const evaluationRating = new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    evaluatedRating: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Evaluation"
        }
    ],
    rating:{
        type:Number
    }
})

module.exports = mongoose.model('Rating',evaluationRating)

