const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 3},
    address: { type: Array },
    phone: { type: String, required: true },
    userType: { type: String, required: true, default: "client", enum: ["client", "admin", "vendor", "driver"] },
    profile: { type: String, default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fuser-profile&psig=AOvVaw0jz4d8N_udX9-D-1HS8TaS&ust=1717948762067000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKCrrIGwzIYDFQAAAAAdAAAAABAE" }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
