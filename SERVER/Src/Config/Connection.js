const mongoose = require('mongoose');

const Connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Database Connected Successfully');
    } catch (error) {
        console.error('Error connecting to database:', error);
    }
}

module.exports = Connection;