const Resturant = require('../models/resturant')

module.exports.createResturantController = async (req, res)=>{
    try {
        const {title, imageUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coords} = req.body;
        if(!title || !coords){
            return res.status(500).send({success: false, message: "Please provide title and address"})
        }
        const newResturant = await Resturant.create({
            title, 
            imageUrl, 
            foods, 
            time, 
            pickup, 
            delivery, 
            isOpen, logoUrl, 
            rating, 
            ratingCount, 
            code,
            coords
        })
        await newResturant.save()
        res.status(200).send({success:true, message: "New resturant created successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, message: "Error in create resturant api", error});
    }
}

//getting all resturant
module.exports.getAllResturantController = async (req, res)=>{
    try {
        const resturant = await Resturant.find({})
        if(!resturant){
            return res.send(404).send({success: false, message: "No resturant available"})
        }
        res.status(200).send({success: true, totalCount: resturant.length, resturant})
        
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, message: "Error in getting all resturant api", error});
    }
}

//get resturant by id
module.exports.getResturantByIdControlller = async (req, res)=>{
    try {
        const resturantId = req.params.id;
        const resturant = await Resturant.findById(resturantId)
        if(!resturant){
            return res.status(404).send({success:false, message: "no resturant found"})
        }
        res.status(200).send({success:true, resturant})
        
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, message: "Error in getting  resturant by id api", error});
    }
}

//delete resturant
module.exports.deleteResturantController = async (req, res)=>{
    try {
        const resturantId = req.params.id
        const resturant = await Resturant.findByIdAndDelete(resturantId)
        res.status(200).send({success:true, message: "Resturant deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, message: "Error in deleting resturant api", error});
    }
}