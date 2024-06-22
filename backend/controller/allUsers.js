const userModel = require("../models/userModel");

async function allUsers(req,res){
    try {
        
        const allUsers = await userModel.find()


        res.json({
            message:'All user',
            data:allUsers,
            error:false,
            success:true
        })
    } catch (err) {
        res.status(400).json({
            mesaage:err.message || err,
            error:true,
            success:false
        })
    }
}

module.exports = allUsers