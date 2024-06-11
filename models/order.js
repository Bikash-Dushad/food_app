const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    food: [{type: mongoose.Schema.Types.ObjectId, ref: "Food"}],
    payment: {},
    buyer: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    status: {type: String, enum: ['preparing', 'prepare', 'on the way', 'delivered'], default: 'preparing'},
}, {
    timestamps: true
});

const Orders = mongoose.model('Orders', ordersSchema);

module.exports = Orders;
