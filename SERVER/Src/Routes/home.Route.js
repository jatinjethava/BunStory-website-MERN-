const { add_Home, getHome, deleteBurger } = require("../Controller/home.controller");
const adminAuth = require("../Middleware/adminAuth");
const { HomeUpload } = require("../Middleware/multer");

const express = require('express')
const app = express();
const router = express.Router();

router.post('/addHome', HomeUpload.single('image'), adminAuth, add_Home);
router.get('/gethome', adminAuth, getHome);
router.delete('/deleteHome/:id', adminAuth, deleteBurger);

module.exports = router;    