const notificationModel = require('../model/notification')

exports.notification = async (items) => {
    try{
        const data = {
            owner:items.id,
            userName:items.username,
            description:items.description,
            lastActive: new Date()
        }

        const notificationData = new notificationModel(data)
        await notificationData.save()
        return notificationData
        // res.status(202).json({data:notificationData,success:true})

    }catch(error){
        // res.status(500).json({ message: 'Internal server error',success:false});
        console.log("error",error)
    }
}

exports.getNotification = async (req,res) => {
    try{
        const getData = await notificationModel.find().sort({lastActive:-1})
        return res.status(200).json({
            success:true,
            data:getData
        })
    }catch(error){
        res.status(500).json({ message: 'Internal server error' });
    }
}