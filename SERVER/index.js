require('dotenv').config()
const express = require('express');
const cors = require('cors');
const fs = require("fs");
const path = require('path');

const Connection = require('./Src/Config/Connection');
const adminRoute = require('./Src/Routes/admin.Route');
const userRoute = require('./Src/Routes/user.Route');
const burgerRoute = require('./Src/Routes/burger.Route');
const homeRoute = require("./Src/Routes/home.Route");
const blogRoute = require("./Src/Routes/blog.Route");
const cartRoute = require("./Src/Routes/cart.Route");
const orderRoute = require("./Src/Routes/order.Route");

const app = express()
const port = process.env.PORT || 3000

Connection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "Src/uploads")));
app.use('/HomeImage', express.static(path.join(__dirname, "Src/HomeImage")));
app.use('/BlogImage', express.static(path.join(__dirname, "Src/BlogImage")));

app.use('/api', adminRoute);
app.use('/api/users', userRoute);
app.use('/api/burgers', burgerRoute);
app.use('/api/home', homeRoute);
app.use('/api/blog', blogRoute);
app.use('/api/cart', cartRoute);
app.use('/api/order', orderRoute);

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () =>
    console.log(`Server Is Running On http://localhost:${port}!`)
);