const mongoose = require("mongoose")
const teamlead = mongoose.Schema({
    leadName: {
        type: String,
        required: [true, "Please provide an name"],
    }
})

module.exports = mongoose.model('teamlead',teamlead)