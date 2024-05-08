const express = require('express');
const router = express.Router();
const productController = require('../controllers/productConroller');


// router.get('/insertData', productController.insertData);
// router.post('/products', productController.filterProductsByCategories);

router.post('/', productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.patch('/:id', productController.updateProductById);
router.delete('/:id', productController.deleteProductById);

module.exports = router;
