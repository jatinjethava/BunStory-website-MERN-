const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        items: [
            {
                burgerId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "BURGER",
                    required: true
                },
                price: {
                    type: Number,
                },
                quantity: { type: Number, default: 1 },
            }
        ],
        totalPrice: {
            type: Number
        }
    },
    { timestamps: true }
);

const CART = mongoose.model("Cart", CartSchema);
module.exports = CART;