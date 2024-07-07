const User = require('../models/user');
const Product = require('../models/product');
const userCart = require('../models/userCart');

// Adding to cart
module.exports.addToCart = async (req, res) => {
    const userId = res.locals.user._id; // Use authenticated user's ID
    const productId = req.query.id;

    try {
        // Find the user and product documents by their IDs
        const product = await Product.findById(productId);

        if (!product) {
            console.log('Product not found');
            return res.redirect('back');
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
        console.log("Product added to cart successfully");
        return res.redirect('back');
    } catch (error) {
        console.error('Error adding product to cart:', error);
        return res.redirect('back');
    }
};

// Display product added to cart
module.exports.getCart = async (req, res) => {
    const userId = res.locals.user._id;

    try {
        // Find the userCart document for the user and populate the products field
        const cart = await userCart.findOne({ user: userId }).populate('products');

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        // Render a view to display cart details (you can customize this part based on your frontend setup)
        res.render('cart', {
            title: "Cart",
            cart: cart
        });
    } catch (error) {
        console.error('Error fetching cart details:', error);
        res.status(500).json({ error: 'Failed to fetch cart details' });
    }
};

// Deleting from cart
module.exports.deleteFromCart = async (req, res) => {
    const userId = req.query.userId;
    const productId = req.query.productId;

    try {
        let cart = await userCart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        // Find index of product to remove
        const indexToRemove = cart.products.findIndex(product => product.toString() === productId);
        if (indexToRemove === -1) {
            return res.status(404).json({ error: 'Product not found in cart' });
        }
        // Remove only the first occurrence of the product from the cart
        cart.products.splice(indexToRemove, 1);
        await cart.save();
        res.redirect('back');
    } catch (error) {
        console.error('Error deleting product from cart:', error);
        res.status(500).json({ error: 'Failed to delete product from cart' });
    }
};