const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    phone: { type: String},
    address: { type: String},
    role: { type: Number, default:0},
},
{
    timestamps: true
});
const User = mongoose.model('User', userSchema);

module.exports = User;