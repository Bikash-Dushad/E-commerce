const User = require('../models/user');
const Product = require('../models/product');


// this function takes user to home
module.exports.home = async function(req, res) {
    let product = await Product.find({});
    let user = req.user; // Assuming you are using Passport.js for authentication

    return res.render('home', {
        title: "Home",
        product: product,
        user: user
    });
}