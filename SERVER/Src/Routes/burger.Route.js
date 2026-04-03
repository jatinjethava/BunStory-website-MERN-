const { createBurger, getAllBurger, getBurgerById, updateBurger, deleteBurger } = require('../Controller/burger.controller');
const authMiddleware = require('../Middleware/auth');

const express = require('express');
const router = express.Router();

router.post('/create', authMiddleware, createBurger);
router.get('/get_burger', authMiddleware, getAllBurger);
router.get('/getone_burger/:id', authMiddleware, getBurgerById);
router.put('/update_burger/:id', authMiddleware, updateBurger)
router.delete('/deleteBurger/:id', authMiddleware, deleteBurger);

module.exports = router;

