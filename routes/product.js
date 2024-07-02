const express = require('express')
const router = express.Router();
const productController = require('../controllers/product_controller');
const multer = require('multer');
const isAdmin = require('../middleware/adminMiddleware')

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

router.post('/addProduct',isAdmin, upload.single('image') , productController.addProducts)
router.post('/updateProduct/:id',isAdmin, upload.single('image'), productController.updateProduct)
router.post('/deleteProduct/:id',isAdmin, productController.deleteProduct)

module.exports = router;