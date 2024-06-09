const User = require('../models/user')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
//creating the user
module.exports.register = async (req,res)=>{
    try {
        const {name, email, password, phone, address} = req.body;
        const user = await User.findOne({email})
    
        if(user){
            console.log("user already exists");
            res.status(500).send({success:false, message:'Email already exists'});
            // return res.redirect('back')
        }

        //encrypting the password
        var salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            address,
            phone
        });

        console.log("new user created");
        res.status(201).send({success: true, message: "Registered Successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, message: "Error in register api", error});
    }
}

//login controller

module.exports.login = async (req,res)=>{
    try {
        const {email, password} = req.body;
        //checking email and password
        if(!email || !password){
            return res.status(500).send({success: false, message: "please provide email and password"})
        }
    
        //checking user exists or not
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(404).send({ success:false, message: "user not found"})
        }
        
        //checking body password and database password
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(500).send({success: false, message: "Invalid credentials"})
        }
    
        //creating the token
        const token = JWT.sign({id:user._id}, process.env.JWT_SECRET,{
            expiresIn:'7d'
        })
    
        user.password = undefined
        res.status(200).send({success: true, message: "Login successfully", token,user})
    } catch (error) {
        console.log(error);
        res.status(500).send({success: false, message: "error in login api", error})
    }
}