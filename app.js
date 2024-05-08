const express = require("express");
const app = express();
const db = require('./models/db');
const productRouter = require('./router/productRouter');
const categoryRouter = require('./router/categoryRouter');
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

app.use("/product", productRouter);
app.use("/category", categoryRouter )



app.listen(3000,()=>{
    console.log( `Server running on PORT 3000`);
});
