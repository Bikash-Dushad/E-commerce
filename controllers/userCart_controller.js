const User = require('../models/user');
const Product = require('../models/product');
const userCart = require('../models/userCart');

module.exports.addToCart = async (req, res) => {
    const userId = req.query.user;
    const productId = req.query.id;

    try {
        // Find the user and product documents by their IDs
        const user = await User.findById(userId);
        const product = await Product.findById(productId);

        if (!user || !product) {
            console.log('User or Product not found')
            return res.redirect('back')
        }

        // Find the userCart document for the user
        let cart = await userCart.findOne({ user: userId }).populate('products');

        if (!cart) {
            // If cart doesn't exist, create a new cart
            cart = new userCart({
                user: userId,
                products: [productId]
            });
        } else {
            // If cart exists, add the new product to the existing products array
            cart.products.push(productId);
        }

        // Save the updated cart
        await cart.save();
        console.log("Product added to cart successfully")
        return res.redirect('back')

    } catch (error) {
        console.error('Error adding product to cart:', error);
        return res.redirect('back')
    }
};