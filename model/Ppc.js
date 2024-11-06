const mongoose = require("mongoose")

const Ppc = new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    userLeadId:{
        type:String,
        required:[true, "field is require"]
    },
    mod:{
        type:String,
        required:[true, "field is require"]
    },
    source:{
        type:String,
        required:[true, "field is require"]
    },
    agentName:{
        type:String,
        required:[true, "field is require"]
    },
    teamleader:{
        type:String,
        required:[true, "field is require"]
    },
    greetings:{
        type:String
    },
    accuracy:{
        type:String
    },
    building:{
        type:String
    },
    presenting:{
        type:String
    },
    concern:{
        type:String
    },
    closing:{
        type:String
    },
    numberOfFollow:{
        type:String,
    },
    leadQuality:{
        type:String
    },
    QcCategory:{
        type:String
    },
    summary:{
        type:String
    },
    ppcfile:{
        type:String,
        default:''
    }
})

module.exports = mongoose.model('Ppc',Ppc)
