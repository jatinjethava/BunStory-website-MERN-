require('dotenv').config()
const express = require('express');
const cors = require('cors');
const path = require('path');

const Connection = require('./Src/Config/Connection');
const userRoute = require('./Src/Routes/user.Route');
const burgerRoute = require('./Src/Routes/burger.Route');

const app = express()
const port = process.env.PORT || 3000

Connection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "Src/uploads")));
app.use('/api/users', userRoute);
app.use('/api/burgers', burgerRoute);

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () =>
    console.log(`Server Is Running On http://localhost:${port}!`)
);