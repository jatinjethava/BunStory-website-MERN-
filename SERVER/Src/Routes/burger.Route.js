const { createBurger, getAllBurger, getBurgerById, updateBurger, deleteBurger } = require('../Controller/burger.controller');
const authMiddleware = require('../Middleware/auth');
const { upload } = require("../Middleware/multer");

const express = require('express');
const router = express.Router();

// Multer MUST be applied BEFORE auth to parse FormData
router.post('/create', upload.single('image'), authMiddleware, createBurger);
router.get('/get_burger', authMiddleware, getAllBurger);
router.get('/getone_burger/:id', authMiddleware, getBurgerById);
router.put('/update_burger/:id', upload.single('image'), authMiddleware, updateBurger)
router.delete('/deleteBurger/:id', authMiddleware, deleteBurger);
router.delete('/deleteBurger/:id', authMiddleware, deleteBurger);

module.exports = router;

