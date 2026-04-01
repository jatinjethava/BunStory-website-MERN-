require('dotenv').config()
const express = require('express');
const cors = require('cors');

const Connection = require('./Src/Config/Connection');
const userRoute = require('./Src/Routes/user.Route');

const app = express()
const port = process.env.PORT || 3000

Connection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', userRoute);

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () =>
    console.log(`Server Is Running On http://localhost:${port}!`)
);