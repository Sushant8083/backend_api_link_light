const express = require("express");
const app = express();
const db = require('./models/db');
const Product = require('./models/products');
const loggger = require('morgan');
app.use(loggger('tiny'));


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));


db.databaseConnect();

const cors = require('cors');

const allowedOrigins = [
	'http://localhost:5173'
];

app.use(cors({
	origin: allowedOrigins,
	credentials: true,
	optionsSuccessStatus: 200 
}));


app.get('/', function(req,res){
    res.send("sushant")
})

app.get('/insertData', async (req, res) => {
    var products = [
        {
            name: "Wooden Floor Tiles",
            size: "12x12 inches",
            Category: "wooden",
            image: {
                URL: "https://plus.unsplash.com/premium_photo-1676823547757-f00b51e17eff?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
        },
        {
            name: "Wooden Flooring 2",
            size: "wooden",
            Category: "Flooring",
            image: {
                URL: "https://images.unsplash.com/photo-1569152811536-fb47aced8409?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
        },
        {
            name: "Check tile",
            size: "Standard",
            Category: "Tile",
            image: {
                URL: "https://images.unsplash.com/photo-1523350165414-082d792c4bcc?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
        },
        {
            name: "Ceramic Floor Tiles",
            size: "16x16 inches",
            Category: "Tile",
            image: {
                URL: "https://images.unsplash.com/photo-1534503442463-e0ddba45cf4c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
        },
        {
            name: "Bamboo Flooring",
            size: "Various",
            Category: "Vinyl",
            image: {
                URL: "https://images.unsplash.com/photo-1546940084-6333670a0666?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
        },
        {
            name: "Carpet Tiles",
            size: "12x12 inches",
            Category: "Vinyl",
            image: {
                URL: "https://images.unsplash.com/photo-1604410880766-737427d11b70?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
        },
        {
            name: "Laminate Flooring",
            size: "Standard",
            Category: "Luxury Vinyl",
            image: {
                URL: "https://images.unsplash.com/photo-1550895030-823330fc2551?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
        },
        {
            name: "Concrete Floor Finish",
            size: "Custom",
            Category: "Luxury Vinyl",
            image: {
                URL: "https://images.unsplash.com/photo-1528827816431-d3f46a4427f7?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
        },
        {
            name: "Rubber Floor Tiles",
            size: "Various",
            Category: "Laminate",
            image: {
                URL: "https://plus.unsplash.com/premium_photo-1683129627035-e5a145c3d705?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
        },
        {
            name: "Terrazzo Flooring",
            size: "Custom",
            Category: "Laminate",
            image: {
                URL: "https://images.unsplash.com/photo-1519393890420-f28727375fa5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
        }
    ]
    
    
    try {
        await Product.insertMany(products);
        res.send('Sample data inserted successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error inserting sample data');
    }
});

app.post('/products', async (req, res) => {
    console.log(req.body)
    let categories = req.body.checkedItems || null;
    console.log(categories) 
    console.log(typeof categories);
    try {
        let filteredProducts = [];
        // categories = JSON.parse(categories);
        if (!categories || categories.length === 0) {
            filteredProducts = await Product.find({});
        } else {
            for (const category of categories) {
                console.log(category)
                const products = await Product.find({ Category: category });
                console.log(products)
                filteredProducts = filteredProducts.concat(products);
            }
        }
        res.json(filteredProducts);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error filtering products by categories');
    }
});


app.listen(3000,()=>{
    console.log( `Server running on PORT 3000`);
});
