const { createBurger, getAllBurgers, getBurgerById, updateBurger, deleteBurger } = require('../Controller/burger.controller');
const authMiddleware = require('../Middleware/auth');

const express = require('express');
const router = express.Router();

router.post('/create', authMiddleware, createBurger);

module.exports = router;

