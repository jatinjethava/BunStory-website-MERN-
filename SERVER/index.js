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

const app = express()
const port = process.env.PORT || 3000

Connection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "Src/uploads")));
app.use('/HomeImage', express.static(path.join(__dirname, "Src/HomeImage")));

app.use('/api', adminRoute);
app.use('/api/users', userRoute);
app.use('/api/burgers', burgerRoute);
app.use('/api/home', homeRoute);

app.get('/images', (req, res) => {
    const dirPath = path.join(__dirname, "Src/HomeImage");

    fs.readdir(dirPath, (err, files) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Error reading images"
            });
        }

        const imageUrls = files.map(file =>
            `http://localhost:8100/HomeImage/${file}`
        );

        res.status(200).json({
            success: true,
            count: files.length,
            images: imageUrls
        });
    });
});

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () =>
    console.log(`Server Is Running On http://localhost:${port}!`)
);