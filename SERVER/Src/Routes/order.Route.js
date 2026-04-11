const { createOrder, getOrders, getOrderById, getAllOrders, updateOrderStatus } = require("../Controller/order.controller");
const authMiddleware = require("../Middleware/auth");
const adminAuth = require("../Middleware/adminAuth");

const express = require("express");
const router = express.Router();

router.post('/createOrder', authMiddleware, createOrder);
router.get('/myorders', authMiddleware, getOrders);
router.get('/myorders/:id', authMiddleware, getOrderById);
router.get('/allorders', adminAuth, getAllOrders);
router.put('/updatestatus/:id', adminAuth, updateOrderStatus);

module.exports = router;
