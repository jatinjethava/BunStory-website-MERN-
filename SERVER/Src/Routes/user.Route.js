const { createUser, LoginUser } = require("../Controller/user.controller");
const authMiddleware = require("../Middleware/auth");

const express = require('express');
const router = express.Router();

router.post('/create', createUser);
router.post('/login', LoginUser);

module.exports = router;