const mongoose = require('mongoose');

const burgerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    description: {
        type: String,
        required: true,
    },

    patty: {
        type: String,
        required: true,
    },

    bun: {
        type: String,
        required: true,
    },

    size: {
        type: String,
        enum: ["Single", "Double", "Triple"],
        default: "Single",
    },

    spice: {
        type: String,
        enum: ["Mild", "Medium", "Hot"],
        default: "Mild",
    },

    toppings: [
        {
            type: String,
        },
    ],

    sauces: [
        {
            type: String,
        },
    ],

    price: {
        type: Number,
        required: true,
    },

    calories: {
        type: Number,
    },

    available: {
        type: Boolean,
        default: true,
    },

    featured: {
        type: Boolean,
        default: false,
    }
},
    { timestamps: true }
);

const BURGER = mongoose.model('BURGER', burgerSchema);
module.exports = BURGER;