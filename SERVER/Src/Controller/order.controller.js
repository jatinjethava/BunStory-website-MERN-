const ORDER = require("../Models/order");
const CART = require("../Models/cart");

const createOrder = async (req, res) => {
    try {
        const userId = req.user;

        const cart = await CART.findOne({ userId });
        // console.log(cart)
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ success: false, message: "Cart is empty" });
        }

        let totalAmount = 0;

        const orderItems = cart.items.map(item => {
            const subtotal = item.price * item.quantity;
            totalAmount += subtotal;
            return {
                burgerId: item.burgerId,
                quantity: item.quantity,
                price: item.price,
                subtotal,
            };
        });

        const deliveryCharge = totalAmount > 499 ? 0 : 40;
        const taxAmount = Math.round(totalAmount * 0.05);
        const finalAmount = totalAmount + deliveryCharge + taxAmount;

        const deliveryAddress = req.body;
        const order = await ORDER.create({
            user: userId,
            items: orderItems,
            deliveryAddress,
            totalAmount,
            deliveryCharge,
            taxAmount,
            finalAmount,
        });

        await CART.findOneAndDelete({ userId });

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            order,
        });

    } catch (error) {
        console.error("Create Order Error:", error);
        res.status(500).json({ success: false, message: "Server error while creating order" });
    }
};

const getOrders = async (req, res) => {
    try {
        const userId = req.user;

        const orders = await ORDER.find({ user: userId }).sort({ createdAt: -1 });

        res.status(200).json({ success: true, orders });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user;

        const order = await ORDER.findOne({ _id: id, user: userId });

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.status(200).json({ success: true, order });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await ORDER.find({}).populate('user', 'name email').populate('items.burgerId', 'name price').sort({ createdAt: -1 });
        res.status(200).json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const validStatuses = ["PLACED", "CONFIRMED", "PREPARING", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status" });
        }
        const order = await ORDER.findByIdAndUpdate(id, { orderStatus: status }, { new: true }).populate('user', 'name email').populate('items.burgerId', 'name price');
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        res.status(200).json({ success: true, order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { createOrder, getOrders, getOrderById, getAllOrders, updateOrderStatus };
