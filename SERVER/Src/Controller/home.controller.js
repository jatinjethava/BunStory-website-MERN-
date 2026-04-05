const HOME = require("../Models/home");

const add_Home = async (req, res) => {
    try {
        const { header, content } = req.body;
        const image = req.file ? req.file.filename : null;

        if (!header) {
            return res.status(401).json({ success: false, message: "Heading Is Required" });
        }
        if (!content) {
            return res.status(401).json({ success: false, message: "Contents Is Required" });
        }

        if (!image) {
            return res.status(400).json({ message: "Image is required" });
        }

        const newData = new HOME({
            header,
            content,
            image
        })

        const addHome = await newData.save();
        if (!addHome) {
            return res.status(401).json({ success: false, message: "May Be Some Issuse For Adding Data" });
        }

        return res.status(201).json({ success: true, message: "Home Content Added Successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Something Went Wrong" });
    }
}

const getHome = async (req, res) => {
    try {

        const Home = await HOME.find();
        if (!Home) {
            return res.status(404).json({ success: false, message: "Not Any Data Found" });
        }

        res.status(200).json({
            success: true,
            message: "data fetch successfully",
            data: Home
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Something Went Wrong" });
    }
}

module.exports = {
    add_Home,
    getHome,
}