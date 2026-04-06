const { addBlogBanner, getBlogBanner, deleteBlogBanner } = require("../Controller/blog.controller");
const authMiddleware = require("../Middleware/auth");
const { BlogUpload } = require("../Middleware/multer");

const express = require("express");
const router = express.Router();

router.post('/addBlogBanner', BlogUpload.single('image'), authMiddleware, addBlogBanner);
router.get('/getBlogBanner', authMiddleware, getBlogBanner);
router.delete('/delBlogBanner/:id', authMiddleware, deleteBlogBanner);

module.exports = router;