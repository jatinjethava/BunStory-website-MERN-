const { add_Home, getHome } = require("../Controller/home.controller");
const adminAuth = require("../Middleware/adminAuth");
const { HomeUpload } = require("../Middleware/multer");

const express = require('express')
const router = express.Router();

router.post('/addHome', HomeUpload.single('image'), adminAuth, add_Home);
router.get('/gethome', adminAuth, getHome);

module.exports = router;    