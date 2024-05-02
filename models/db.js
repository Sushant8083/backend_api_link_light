const mongoose = require("mongoose")

exports.databaseConnect = async () => {
	mongoose
		.connect("mongodb+srv://onkarsushant05:VMa3kKkDOAafanAp@cluster0.nti4run.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
		.then(() => console.log('Database connection successfully !'))
		.catch(err => (err.message));
};

