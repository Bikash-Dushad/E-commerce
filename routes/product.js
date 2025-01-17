const express = require('express');
const router = express.Router();
const productController = require('../controllers/product_controller');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

router.get('/addProductPage', productController.addProductPage);
router.post('/addProduct', upload.single('image'), productController.addProducts);
router.get('/getAllProduct', productController.getAllProducts);
router.get('/singleProductDetails/:id', productController.getSingleProductDetails);
router.get("/updateProductPage/:id", productController.updateProductPage);
router.post('/updateProduct/:id', upload.single('image'), productController.updateProduct);
router.get('/deleteProduct/:id', productController.deleteProduct);

module.exports = router;
