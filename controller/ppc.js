const ppc = require('../model/Ppc') 
const userModel = require("../model/user")

exports.ppc = async(req,res) => {
    try{
        const data = {
            owner:req.user._id,
            userLeadId:req.body.leadId,
            mod:req.body.mod,
            source:req.body.source,
            agentName:req.body.agentName,
            teamleader:req.body.teamleader,
            greetings:req.body.greetings,
            accuracy:req.body.accuracy,
            building:req.body.building,
            presenting:req.body.presenting,
            concern:req.body.concern,
            closing:req.body.closing,
            numberOfFollow:req.body.numberOfFollow,
            leadQuality:req.body.leadQuality,
            QcCategory:req.body.QcCategory,
            summary:req.body.summary,
        }
        const ppcResponse = new ppc(data)
        await ppcResponse.save()

        await userModel.findByIdAndUpdate(req.user._id, {
            $push: { ppc: ppcResponse._id }
        });

        res.status(202).json({ppcResponse,message:"created!",success:true})

    }catch(error){
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
