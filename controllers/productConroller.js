// const Product = require('../models/productsModel');

// exports.insertData = async (req, res) => {
//     try {
//         await Product.create(req.body);
//         res.send('Sample data inserted successfully!');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error inserting sample data');
//     }
// };

// exports.filterProductsByCategories = async (req, res) => {
//     try {
//         let categories = req.body.checkedItems || null;
//         let filteredProducts = [];

//         if (!categories || categories.length === 0) {
//             filteredProducts = await Product.find({});
//         } else {
//             for (const category of categories) {
//                 const products = await Product.find({ Category: category });
//                 filteredProducts = filteredProducts.concat(products);
//             }
//         }
//         res.json(filteredProducts);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error filtering products by categories');
//     }
// };


const Product = require('../models/productsModel');
const Category = require('../models/categoryModel');

exports.createProduct = async (req, res) => {
    try {
        const { name, size, category, image, Materialtype } = req.body;

        const existingCategory = await Category.findById(category);
        if (!existingCategory) {
            return res.status(400).send('Category does not exist');
        }

        const product = new Product({ name, size, category, image, Materialtype }); 
        await product.save();

        existingCategory.products.push(product._id);
        await existingCategory.save();

        res.status(201).send(product);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating product');
    }
};


exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.send(products);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching products');
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }
        res.send(product);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching product');
    }
};

exports.updateProductById = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'size', 'category', 'image', 'MaterialType'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }
        res.send(product);
    } catch (error) {
        console.error(error);
        res.status(400).send('Error updating product');
    }
};


exports.deleteProductById = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }
        res.send(product);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting product');
    }
};
