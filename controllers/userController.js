const User = require("../models/user")

module.exports.getUserController =async (req, res)=>{
    //find user
    try {
        const user = await User.findById({_id: req.body.id})
        if(!user){
            return res.status(404).send({success: false, message: "User not found"})
        }
        //if user is founded, hide the password
        user.password = undefined;
        res.status(200).send({success: true, message: "User get successfully", user})
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, message: "Error in user api", error});
    }
}