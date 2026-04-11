const BURGER = require("../Models/burger");
const CART = require("../Models/cart");

const addTocart = async (req, res) => {
    try {
        const userId = req.user;
        const { burgerId, quantity = 1 } = req.body;

        if (!burgerId) {
            return res.status(400).json({
                success: false,
                message: "burgerId Is Required"
            })
        }

        const burger = await BURGER.findById(burgerId);

        if (!burger) {
            return res.status(404).json({
                success: false,
                message: "Burger Not Found"
            })
        }

        const price = burger.price;
        // console.log(price)
        let cart = await CART.findOne({ userId });

        if (!cart) {
            cart = new CART({
                userId,
                items: [
                    {
                        burgerId,
                        price,
                        quantity
                    }
                ]
            });
        } else {
            const index = cart.items.findIndex(
                item => item.burgerId.toString() === burgerId
            );

            if (index > -1) {
                cart.items[index].quantity += quantity;
                cart.items[index].price = price;
            } else {
                cart.items.push({
                    burgerId,
                    quantity,
                    price
                });
            }
        }

        await cart.save();

        res.status(200).json({
            message: "Item added to cart",
            cart
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server have't mood" });
    }
}

const getCart = async (req, res) => {
    try {
        const userId = req.user;

        const cart = await CART.findOne({ userId });

        if (!cart) {
            return res.json({ items: [], total: 0 });
        }

        let total = 0;

        cart.items.forEach(item => {
            total += item.price * item.quantity;
        });

        res.json({
            cart,
            total
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateCartItem = async (req, res) => {
    try {
        const { burgerId, quantity } = req.body;
        const userId = req.user;

        if (!burgerId) {
            return res.status(400).json({
                success: false,
                message: "burgerId Is Required"
            })
        }

        const cart = await CART.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const item = cart.items.find(
            item => item.burgerId.toString() === burgerId
        );

        if (!item) {
            return res.status(404).json({ message: "Item not in cart" });
        }

        item.quantity = quantity;

        await cart.save();

        res.json({ message: "Cart updated", cart });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removeCartItem = async (req, res) => {
    try {
        const { burgerId } = req.params;
        const userId = req.user;

        const cart = await CART.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = cart.items.filter(
            item => item.burgerId.toString() !== burgerId
        );

        await cart.save();

        res.json({ message: "Item removed", cart });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const clearCart = async (req, res) => {
    try {
        const userId = req.user;

        await CART.findOneAndDelete({ userId });

        res.json({ message: "Cart cleared" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addTocart,
    getCart,
    updateCartItem,
    removeCartItem,
    clearCart,
}