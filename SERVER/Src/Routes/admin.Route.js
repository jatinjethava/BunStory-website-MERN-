const adminLogin = require("../Controller/admin.controller");
const authMiddleware = require("../Middleware/auth");

const express = require("express");
const router = express.Router();

router.post('/admin/login', adminLogin);

module.exports = router;