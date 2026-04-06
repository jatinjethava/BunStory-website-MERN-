const { BLOG } = require("../Models/blog");

const addBlogBanner = async (req, res) => {
    try {
        const { heading, paragraph } = req.body;
        const image = req.file ? req.file.filename : null;

        if (!heading || !paragraph) {
            return res.status(401).json({
                success: false,
                message: "Please Insert All Data"
            })
        }

        if (!image) {
            return res.status(401).json({
                success: false,
                message: "Please Add Image"
            })
        }

        const existBanner = await BLOG.find();

        if (existBanner.length >= 1) {
            return res.status(400).json({
                success: false,
                message: "No More Banner Added"
            })
        }

        const newBlogBanner = new BLOG({
            heading,
            paragraph,
            image
        })
        const addedBlogBanner = await newBlogBanner.save();

        if (!addedBlogBanner) {
            return res.status(400).json({
                success: false,
                message: "Blog Banner Not Added"
            })
        }

        res.status(201).json({
            success: true,
            message: "Blog Banner Added Successfully"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server Have't Mood"
        })
    }
}

const getBlogBanner = async (req, res) => {
    try {
        const fetchBlogBanner = await BLOG.find();

        if (!fetchBlogBanner) {
            return res.status(404).json({
                success: false,
                message: "Not Any Blog Banner Found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Data fetched",
            data: fetchBlogBanner
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server Have't Mood"
        })
    }
}

const deleteBlogBanner = async (req, res) => {
    try {
        const { id } = req.params;

        const findBanner = await BLOG.findById(id);

        if (!findBanner) {
            return res.status(404).json({
                success: false,
                message: "Not Banner Founds"
            })
        }

        const delBlogBanner = await BLOG.findByIdAndDelete(id);

        if (!delBlogBanner) {
            return res.status(400).json({
                success: false,
                message: "Can't Deleted Blog Banner"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Blog Banner Deleted Successfully"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server Have't Mood"
        })
    }
}

module.exports = {
    addBlogBanner,
    getBlogBanner,
    deleteBlogBanner
}