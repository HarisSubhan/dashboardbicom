const mongoose = require("mongoose")

const evaluation = new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    useremail:{
        type:String,
        required:[true, "field is require"]
    },
    leadID:{
        type:String,
        required:[true, "field is require"]
    },
    agentName:{
        type:String,
        required:[true, "field is require"]
    },
    mod:{
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
    closing:{
        type:String
    },
    bonus:{
        type:String
    },
    evaluationsummary:{
        type:String
    }
},
{timestamps:true}
)
module.exports = mongoose.model('Evaluation',evaluation)

// greetings:[{
//     greet:{
//         type:String,
//         required: true
//     }
// }],
// accuracy:[{
//     acc:{
//         type:String,
//         required: true
//     }
// }],
// building:[{
//     build:{
//         type:String,
//         required: true
//     }
// }],
// presenting:[{
//     present:{
//         type:String,
//         required: true
//     }
// }],
// closing:[{
//     close:{
//         type:String,
//         required: true
//     }
// }],
// bonus:[{
//     bonuss:{
//         type:String,
//         required: true
//     }
// }],
// evaluationsummary:[{
//     summary:{
//         type:String,
//         required: true
//     }
// }],