const Product = require('../models/product')
const fs = require("fs")

module.exports.addProducts = async (req, res) => {
    try {
        console.log('File:', req.file);
        console.log('Body:', req.body);
        let image_file = `${req.file.filename}`;
        const { name, desc, price, category, sizes } = req.body;
        // Construct the product data object
        let productData = {
            name,
            desc,
            price,
            image: image_file,
            category,
        };
         // Ensure sizes is stored only if selected
         if (sizes) {
            productData.sizes = Array.isArray(sizes) ? sizes : [sizes];
        }

        const product = await Product.create(productData);
        return res.redirect('back')
    } catch (error) {
        console.log(error);
        return res.redirect('back')
    }
};

// All product
module.exports.getAllProducts = async (req, res)=>{
    try {
        const allProducts = await Product.find({});
        if(!allProducts){
            console.log("No Product is there")
            return res.status(404).send({success: false, message: " product not found"});
        }
        console.log(allProducts)
        return res.status(200).send({success: true, data: allProducts});
    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false, message: "error in get all notes", error});
    }
}

module.exports.updateProductPage = async (req, res)=>{
    const product = await Product.findById(req.params.id); // Fetch the product by ID
    return res.render("update_product", {
        title: "Update product",
        product : product
    })
}

//update the product
module.exports.updateProduct = async (req, res)=>{
    try {
        const product = await Product.findById(req.params.id)
        if(!product){
            console.log("product not found")
            return res.redirect('back')
        }
        if(req.file){
            fs.unlink(`uploads/${product.image}`, (err) => {
                if (err) console.log(err);
            });
            product.image = `${req.file.filename}`;
        }
        const { name, desc, price, category, sizes } = req.body;

        product.name = name || product.name;
        product.desc = desc || product.desc;
        product.price = price || product.price;
        product.category = category || product.category;

        // Ensure sizes is stored only if selected
        if (sizes) {
            product.sizes = Array.isArray(sizes) ? sizes : [sizes];
        }

        await product.save();
        return res.redirect('/admin/adminPage')

    } catch (error) {
        console.log(error)
        return res.redirect('back')
    }
}




//remove product
module.exports.deleteProduct = async (req, res)=>{
    try {
        fs.unlink(`uploads/$(product.image)`, ()=>{})
        const product = await Product.findByIdAndDelete(req.params.id)
        if(!product){
            return res.status(404).send({success: false, message: " product not found"})
        }
        res.status(200).send({success: true, message: " product deleted successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).send({success: false, message: "Error in delete product api", error})
    }
}