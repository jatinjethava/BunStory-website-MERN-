const { adminLogin, getAllUsers, deleteUserByAdmin } = require("../Controller/admin.controller");
const adminAuth = require("../Middleware/adminAuth");

const express = require("express");
const router = express.Router();

router.post('/login', adminLogin);
router.get('/users', adminAuth, getAllUsers);
router.delete('/users/:id', adminAuth, deleteUserByAdmin);

module.exports = router;
