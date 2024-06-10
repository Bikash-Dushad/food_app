const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    title: {type: String, required:[true, "Food title is required"]},
    description: {type: String, required:[true, "food Description is required"]},
    price: {type: Number, required: [true, "food price is required"]},
    imageUrl: {type: String, default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Fphotos%2Ffood&psig=AOvVaw0uHuMCFX7dPwMVEqRQ7i5R&ust=1718122731476000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPCq5Yy40YYDFQAAAAAdAAAAABAE"},
    foodTags: { type: String},
    Category: {type: String},
    code: {type: String},
    isAvailable: {type: Boolean, default: true},
    resturant: {type: mongoose.Schema.Types.ObjectId, ref: "Resturant"},
    rating:{ type: Number, default: 5, min:1, max:5},
    ratingCount: { type: String}
}, {
    timestamps: true
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
