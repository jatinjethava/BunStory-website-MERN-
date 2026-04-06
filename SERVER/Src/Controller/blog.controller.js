const { BLOG, FEATURE } = require("../Models/blog");

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

const addFeature = async (req, res) => {
    try {
        const { feature, name, rate, description, date } = req.body;
        const image = req.file ? req.file.filename : null;

        if (!feature || !name || !rate || !description || !date) {
            return res.status(401).json({
                success: false,
                message: "All Fields Are Required"
            })
        }

        const newFeature = new FEATURE({
            feature,
            name,
            rate,
            description,
            date,
            image
        })
        const addfeature = await newFeature.save();

        if (!addfeature) {
            return res.status(401).json({
                success: false,
                message: "Not Added Ant Feature"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Feature Added Successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Have't Mood"
        })
    }
}

const getMaxFeature = async (req, res) => {
    try {
        const fetchFeature = await FEATURE.find();

        if (!fetchFeature) {
            return res.status(404).json({
                success: false,
                message: "Not Found"
            })
        }

        const getMaxRate = (data) => {
            if (!Array.isArray(data) || data.length === 0) return null;

            return data.reduce((max, item) =>
                Number(item.rate) > Number(max.rate) ? item : max
            );
        };

        const MaxRate = getMaxRate(fetchFeature);

        if (!MaxRate || MaxRate == null) {
            return res.status(404).json({
                success: false,
                message: "Data Not Fetch"
            })
        }

        res.status(200).json({
            success: true,
            message: "Data Fetch Successfully",
            data: MaxRate
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Have't Mood"
        })
    }
}

const getAllFeature = async (req, res) => {
    try {
        const fetchFeature = await FEATURE.find();

        if (!fetchFeature) {
            return res.status(404).json({
                success: false,
                message: "Not Found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Data Fetch Successfully",
            data: fetchFeature
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Have't Mood"
        })
    }
}

const updateFeature = async (req, res) => {
    try {

        const { id } = req.params;
        const { feature, name, rate, description, date } = req.body;
        const image = req.file ? req.file.filename : null;

        if (!feature || !name || !rate || !description || !date) {
            return res.status(401).json({
                success: false,
                message: "All Fields Are Required Fill This"
            })
        }

        if (!image) {
            return res.status(401).json({
                success: false,
                message: "Image Is Required"
            })
        }

        const UpdateFeature = await FEATURE.findByIdAndUpdate(id, {
            feature,
            name,
            rate,
            description,
            date,
            image
        }, { returnDocument: "after", runValidators: true });

        if (!UpdateFeature) {
            return res.status(400).json({
                success: false,
                message: "Sorry Can't Updated"
            })
        }

        res.status(200).json({
            success: true,
            message: "Feature Is Updated"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Have Not Mood"
        })
    }
}

const deleteFeature = async (req, res) => {
    try {
        const { id } = req.params;

        const Delete = await FEATURE.findByIdAndDelete(id);

        if (!Delete) {
            return res.status(404).json({
                success: false,
                message: "Data Not Found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Delete Data Successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server's Mood Off"
        })
    }
}

module.exports = {
    addBlogBanner,
    getBlogBanner,
    deleteBlogBanner,
    addFeature,
    getMaxFeature,
    getAllFeature,
    updateFeature,
    deleteFeature
}