const { addBlogBanner, getBlogBanner, deleteBlogBanner, addFeature, getMaxFeature, getAllFeature, updateFeature, deleteFeature } = require("../Controller/blog.controller");
const authMiddleware = require("../Middleware/adminAuth");
const { BlogUpload } = require("../Middleware/multer");

const express = require("express");
const router = express.Router();

router.post('/addBlogBanner', BlogUpload.single('image'), authMiddleware, addBlogBanner);
router.get('/getBlogBanner', authMiddleware, getBlogBanner);
router.delete('/delBlogBanner/:id', authMiddleware, deleteBlogBanner);

router.post('/addfeature', BlogUpload.single('image'), authMiddleware, addFeature);
router.get('/getfeature', authMiddleware, getMaxFeature);
router.get('/getAllFeature', authMiddleware, getAllFeature);
router.put('/updateFeature/:id', BlogUpload.single('image'), authMiddleware, updateFeature);
router.delete('/deleteFeature/:id', authMiddleware, deleteFeature);

module.exports = router;