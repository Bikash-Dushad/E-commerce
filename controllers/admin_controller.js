const User = require('../models/user')
const Product = require('../models/product')
const Order = require('../models/order');

module.exports.adminPage = async function(req, res){
try {
    let products = await Product.find({}); 
    return res.render('adminPage', {
        title : "adminPage",
        products : products,
    })
} catch (error) {
    console.log("error in admin page", error)
    return res.render("adminPage",{
        title : "adminPage"
    })
}
}


module.exports.viewOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('products user');
        res.render('admin_orders', {
            title: 'Admin Orders',
            orders: orders
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};

module.exports.updateOrderStatus = async (req, res) => {
    const orderId = req.body.orderId;
    const newStatus = req.body.status;

    try {
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        order.status = newStatus;
        await order.save();

        res.redirect('/admin/orders');
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ error: 'Failed to update order status' });
    }
};


// module.exports.adminLogin = async (req, res)=>{
// const user = {
//     id:123,
//     username: "admin",
//     email: "admin@gmail.com",
//     password: 1234
// }
// const token = JWT.sign({id:user._id}, process.env.JWT_SECRET,{
//     expiresIn:'7d'
// })
// console.log(token)
// return res.redirect('/admin/adminPage')
// }