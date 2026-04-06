const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true
    },

    paragraph: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    }
}, { timestamps: true });

const featureSchema = new mongoose.Schema({
    feature: {
        type: String,
        enum: [
            "classic",
            "bbq",
            "cheese",
            "spicy",
            "double-patty",
            "veg",
            "chicken",
            "premium",
            "loaded"
        ],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true });

const BLOG = mongoose.model('blogBanner', blogSchema);
const FEATURE = mongoose.model('featureburger', featureSchema);
module.exports = {
    BLOG,
    FEATURE
}