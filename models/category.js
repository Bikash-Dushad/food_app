const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: {type: String, required: [true, "category title is required"]},
    imageUrl: {type: String, default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Fphotos%2Ffood&psig=AOvVaw0uHuMCFX7dPwMVEqRQ7i5R&ust=1718122731476000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPCq5Yy40YYDFQAAAAAdAAAAABAE"}
}, {
    timestamps: true
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
