const User = require('../models/user');
const Product = require('../models/product');


// this function takes user to home
module.exports.home = async function(req, res) {
    if(req.user){
        let products = await Product.find({}); 
        
        return res.render('home', {
            title : "Home",
            products : products,
        })
    }else{
        return res.render('home', {
            title: "Home"
        });
    }
}


module.exports.notFound = async function(req, res) {
    return res.render('404', {
        title :'Not Found!'
    });
}