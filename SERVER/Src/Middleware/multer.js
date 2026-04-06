const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const uploads = path.join(__dirname, "../uploads");
const homeImage = path.join(__dirname, "../HomeImage");
const blogImage = path.join(__dirname, "../BlogImage");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploads);
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
        if (allowed.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only images allowed"), false);
        }
    }

});

const HomeStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, homeImage);
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});

const HomeUpload = multer({
    storage: HomeStorage, // required
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
        if (allowed.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only images allowed"), false);
        }
    }

});

const BlogStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, blogImage);
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});

const BlogUpload = multer({
    storage: BlogStorage, // required
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
        if (allowed.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only images allowed"), false);
        }
    }

});

module.exports = {
    upload,
    HomeUpload,
    BlogUpload
};