const mongoose = require("mongoose");

const HomeSchema = new mongoose.Schema({
    header: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    image: {
        type: String
    }
}, { timestamps: true });

const HOME = mongoose.model("Home_content", HomeSchema);
module.exports = HOME;