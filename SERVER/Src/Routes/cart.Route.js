const { addTocart, getCart, updateCartItem, removeCartItem, clearCart } = require("../Controller/cart.controller");
const authMiddleware = require("../Middleware/auth");

const express = require("express");
const router = express.Router();

router.post('/addTocart', authMiddleware, addTocart);
router.get('/getcart', authMiddleware, getCart);
router.put('/updatecart', authMiddleware, updateCartItem);
router.delete('/deletecart/:burgerId', authMiddleware, removeCartItem);
router.delete('/clearcart', authMiddleware, clearCart);

module.exports = router;