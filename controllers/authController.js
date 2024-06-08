const User = require('../models/user')

module.exports.register = async (req,res)=>{
    try {
        const {name, email, password, phone, address} = req.body;
        const user = await User.findOne({email})
    
        if(user){
            console.log("user already exists");
            res.status(500).send({success:false, message:'Email already exists'});
            // return res.redirect('back')
        }
        const newUser = await User.create({name,email,password,address,phone});
        console.log("new user created");
        res.status(201).send({success: true, message: "Registered Successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, message: "Error in register api", error});
    }
}