const Food = require("../models/food");
const Order = require("../models/order")
//create food
module.exports.createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      resturant,
      rating,
    } = req.body;
    if (!title || !description || !price || !resturant) {
      return res
        .status(404)
        .send({ success: false, message: "please provide all fields" });
    }

    const newFood = await Food.create({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      resturant,
      rating,
    });
    await newFood.save();
    res
      .status(200)
      .send({ success: true, message: "new food created", newFood });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in create food api", error });
  }
};

module.exports.getAllFoodController = async (req, res) => {
  try {
    const foods = await Food.find({});
    if (!foods) {
      return res
        .status(404)
        .send({ success: false, message: "No food founded" });
    }
    res.status(200).send({ success: true, totalFoods: foods.length, foods });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in get all food api", error });
  }
};

//get food with id
module.exports.getSingleFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    const food = await Food.findById(foodId);
    if (!food) {
      return res.status(404).send({ success: false, message: "No food found" });
    }
    res.status(200).send({ success: true, food });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in get single food api", error });
  }
};

//get food by resturant
module.exports.getFoodByResturantController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    const food = await Food.find({ resturant: resturantId });
    if (!food) {
      return res.status(404).send({ success: false, message: "No food found" });
    }
    res
      .status(200)
      .send({ success: true, message: "food based on resturant", food });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({
        success: false,
        message: "Error in get food  by resturant api",
        error,
      });
  }
};

//update food
module.exports.updateFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res
        .status(404)
        .send({ success: true, message: "No food found y id" });
    }
    const food = await Food.findById(foodId);
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      resturant,
      rating,
    } = req.body;

    const updatedFood = await Food.findByIdAndUpdate(foodId, {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      resturant,
      rating,
    });
    await updatedFood.save();
    res
      .status(200)
      .send({
        success: true,
        message: "food updated Successfully",
        updatedFood,
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in update food by api", error });
  }
};

//delete food
module.exports.deleteFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res
        .status(404)
        .send({ success: false, message: "food doesnot exist with this id" });
    }
    await Food.findByIdAndDelete(foodId);
    res
      .status(200)
      .send({ success: true, message: "food deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in delete food by api", error });
  }
};

// place orders
module.exports.placeOrderController = async (req, res) => {
  try {
    const {cart} = req.body;
    if(!cart){
        return res.status(404).send({success: false, message: "please add food card or payment"})
    }
    let total = 0;
    cart.map((i)=>{
        total +=i.price;
    })
    const newOrder = await Order({food: cart, payment: total, buyer: req.body.id})
    await newOrder.save()
    res.status(200).send({success: true, message: "order placed successfully", newOrder})
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error in order food by api", error });
  }
};

//change order status
module.exports.orderStatusController = async (req, res) => {
    try {
      const orderId = req.params.id;
      if (!orderId) {
        return res.status(404).send({
          success: false,
          message: "Please Provide valid order id",
        });
      }
      const { status } = req.body;
      const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
      res.status(200).send({success: true, message: "Order Status Updated",});

    } catch (error) {
      console.log(error);
      res.status(500).send({success: false,message: "Error In Order Status API",error,});
    }
  };