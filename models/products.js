const mongoose = require('mongoose');

const productModel = mongoose.Schema(
	{
		name: String,
        size: String,
        Category: String,
        image : {
            type : Object,
            default: {
                URL:"https://images.unsplash.com/photo-1551893478-d726eaf0442c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
        } 
	},
	{ timestamps: true }
);



const product = mongoose.model('product', productModel);
module.exports = product;