const Category = require('../models/category')

//create category
module.exports.createCatController = async (req, res)=>{
    try {
        const {title, imageUrl} = req.body;
        if(!title){
            return res.status(404).send({success: false, message: " please upload category title or image"})
        }
        const newCategory = await Category.create({title, imageUrl})
        await newCategory.save()
        res.status(200).send({success:true, message: "New category created"});

    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, message: "Error in creating category api", error});
    }
}

//get all category
module.exports.getAllCatController = async (req, res)=>{
    try {
        const category = await Category.find({});
        if(!category){
            return res.status(404).send({success:false, message: "Category not found"})
        }
        res.status(200).send({success: true, totalCat: category.length, category})
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, message: "Error in getting all category api", error});
    }
}

//update category 
module.exports.updateCatController = async (req, res)=>{
    try {
        const categoryId = req.params.id
        const {title, imageUrl} = req.body
        const updatedCategory = await Category.findByIdAndUpdate(categoryId, {title, imageUrl})
    
        if(!updatedCategory ){
            return res.status(404).send({success:false, message: "Category not found"})
        }
        res.status(200).send({success: true, message: "category updatedsuccessfully"})
    } catch (error) {
        return res.status(500).send({success:false, message: "Error in update category api", error})
    }
}

//delete category
module.exports.deleteCatController = async (req, res)=>{
    try {
        const categoryId = req.params.id;
        await Category.findByIdAndDelete(categoryId)
        res.status(200).send({success: true, message: "category deleted successfully"})
    } catch (error) {
        return res.status(500).send({success:false, message: "Error in delete category api", error})

    }
}