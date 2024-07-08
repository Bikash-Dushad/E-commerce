const User = require('../models/user');
const Product = require('../models/product');
const userCart = require('../models/userCart');
const Order = require('../models/order');

module.exports.orderPage = async (req, res) => {
    try {
        const userId = res.locals.user._id;
        const orders = await Order.find({ user: userId }).populate('products');
        return res.render('order_page', {
            title: "orders",
            orders: orders
        });
    } catch (error) {
        console.error('Error rendering order page:', error);
        res.status(500).json({ error: 'Failed to render order page' });
    }
}

module.exports.createOrder = async (req, res) => {
    const userId = res.locals.user._id; // Retrieve user ID from locals
    const totalPrice = parseFloat(req.body.totalPrice);  // Retrieve total price from form input

    try {
        // Find the user's cart
        const cart = await userCart.findOne({ user: userId }).populate('products');

        if (!cart || cart.products.length === 0) {
            console.log("cart is empty ")
            return res.redirect('back')
        }

        // Create a new order with the products from the cart
        const order = new Order({
            user: userId,
            products: cart.products.map(product => product._id),
            totalPrice: totalPrice,
            status: 'Pending'
        });

        // Save the order
        await order.save();

        // Clear the user's cart
        cart.products = [];
        await cart.save();

        // Redirect to the order confirmation page or display a success message
        res.redirect('/orders/orderpage');
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
};
