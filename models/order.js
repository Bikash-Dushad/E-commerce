const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    status: { type: String, default: 'Pending' }
},
{
    timestamps: true
});

const Order = mongoose.model('Order', OrderSchema)
module.exports = Order;