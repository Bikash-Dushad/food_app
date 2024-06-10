const User = require("../models/user")
const bcrypt = require('bcrypt')

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


// update user
module.exports.updateUserController = async (req, res)=>{
    try {
        const user = await User.findById({_id:req.body.id});
        if(!user){
            return res.status(404).send({success: false, message: "user not found"})
        }
        //getting values from frontend to update
        const {name, address, phone } = req.body;
        if(name) user.name = name;
        if(address) user.address = address
        if(phone) user.phone = phone
        
        //save the user
        await user.save();
        res.status(200).send({success: true, message: "user updated successfully"})

    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, message: "Error in update user api", error});
    }
}

//update user password
module.exports.updatePasswordController = async (req, res)=>{
    try {
        const user = await User.findById({_id:req.body.id})
        if(!user){
            return res.status(404).send({success:false, message: "user not found"})
        }

        //get data from user
        const {oldPassword, newPassword} = req.body;
        if(!oldPassword || !newPassword){
            return res.status(500).send({success: false, message: "provide new or old password"})
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password)
        if(!isMatch){
            return res.status(500).send({success: false, message: "Invalid old password"})
        }

        var salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save()
        res.status(200).send({success: true, message: "password updated"})
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, message: "Error in update password api", error});
    }
}

//reset password
module.exports.resetPasswordController = async (req, res)=>{
    try {
        const {email, newPassword, answer} = req.body;
        if(!email || !newPassword || !answer){
            return res.status(500).send({success:false, message: "please provide all fields"})
        }

        const user = await User.findOne({email, answer})
        if(!user){
            return res.status(500).send({success:false, message: "user not found"})
        }

        var salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save()
        res.status(200).send({success: true, message: "password reset successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, message: "Error in password reset api", error});
    }
}

module.exports.deleteProfileController = async (req, res)=>{
    try {
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).send({success:true, message: "Your account has been deleted successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, message: "Error in delete profile api", error});
    }
}