const User = require('../models/user')
const Product = require('../models/product')

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