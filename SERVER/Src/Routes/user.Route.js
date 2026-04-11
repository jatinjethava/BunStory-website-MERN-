const { createUser, LoginUser, getProfile, updateProfile, deleteUser } = require("../Controller/user.controller");
const authMiddleware = require("../Middleware/auth");

const express = require('express');
const router = express.Router();

router.post('/create', createUser);
router.post('/login', LoginUser);
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);
router.delete('/delete', authMiddleware, deleteUser);

module.exports = router;