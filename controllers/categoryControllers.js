const Category = require('../models/categoryModel');

exports.createCategory = async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).send(category);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating category');
    }
};

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.send(categories);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching categories');
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).send({ message: 'Category not found' });
        }
        res.send(category);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching category');
    }
};

exports.updateCategoryById = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'products'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!category) {
            return res.status(404).send({ message: 'Category not found' });
        }
        res.send(category);
    } catch (error) {
        console.error(error);
        res.status(400).send('Error updating category');
    }
};

exports.deleteCategoryById = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).send({ message: 'Category not found' });
        }
        res.send(category);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting category');
    }
};
