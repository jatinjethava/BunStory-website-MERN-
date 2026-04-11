const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    items: [
        {
            burgerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "BURGER",
                required: true
            },
            name: String,
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            subtotal: {
                type: Number
            }
        }
    ],

    deliveryAddress: {
        fullName: String,
        phone: String,
        address: String,
        city: String,
        pincode: String
    },

    totalAmount: {
        type: Number,
        required: true
    },

    deliveryCharge: {
        type: Number,
        default: 0
    },

    taxAmount: {
        type: Number,
        default: 0
    },

    finalAmount: {
        type: Number
    },

    orderStatus: {
        type: String,
        enum: ["PLACED", "CONFIRMED", "PREPARING", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED"],
        default: "PLACED"
    }

}, {
    timestamps: true
});


const ORDER = mongoose.model("Order", orderSchema);
module.exports = ORDER